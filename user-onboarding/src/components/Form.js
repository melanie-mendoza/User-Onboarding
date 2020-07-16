import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

// validation schema, what the data should look like
const formSchema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Must include email address"),
  about: yup.string().required(),
  priority: yup.string().required(),
  terms: yup.boolean().oneOf([true], "Please agree to terms of use")
});

export default function Form() {
  // manage state to hold data for form inputs
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    about: "",
    priority: "",
    terms: ""
  });

  // state for whether the button should be disabled or not.
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // Disabled button if the formState is not fully verified (using useEffect)
  // Every time formState changes, check to see if it passes verification.
  // If it does, then enable the submit button, otherwise disable.
  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  // state to hold data of error messages
  const [errorState, setErrorState] = useState({
    name: "",
    email: "",
    about: "",
    priority: "",
    terms: ""
  });

  // state to set the POST request. Also, gives the ability to console.log and see it.
  const [post, setPost] = useState([]);

  // validation; validate event against the schema
  // reach() -> method in yup that allows us to reach into the schema and only test one piece of it
  // event.target.name -> validates as the user is done with each field which gives us a better UX
  const validateChange = (event) => {
    let value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;
    yup
      .reach(formSchema, event.target.name)
      .validate(value)
      .then(valid => {
        setErrorState({
          ...errorState,
          [event.target.name]: ""
        });
      })
      .catch( err => {
        // console.log(err.errors)
        setErrorState({
          ...errorState, 
          [event.target.name]: err.errors[0]
        });
      });
  };

  // onChange function; being passed to onChange event handler
  const inputChange = event => {
    event.persist() // .persist() allows us to tell React not to get rid of this event object so that we can use later on asynchronously.
    // console.log("input changed!", event.target.value, event.target.checked);
    validateChange(event)
    let value = 
      event.target.type === "checkbox" ? event.target.checked : event.target.value // Can be used in multiple checkboxes
    setFormState({ ...formState, [event.target.name]: value })
  };

   // onSubmit function
   // POSTs data to a server. Takes a second argument -> an object containing the data (formState)
   const formSubmit = (event) => {
    event.preventDefault();
    //console.log("form submitted!")
    axios
      .post('https://reqres.in/api/users', formState)
      .then(response => {
        setPost(response.data); // get just the form data from the REST api

        //reset form if successful
        setFormState({
          name: "",
          email: "",
          about: "",
          priority: "",
          terms: ""
        });
      })
      .catch(err => console.log(err.response));
  };
    
  // value={formState.name} & onChange={inputChange} -> makes it a controlled input
  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
       Name
      <input 
        type="text" 
        name="name" 
        id="name" 
        value={formState.name}
        onChange={inputChange}  
      />
      </label>
      {errorState.name.length > 0 ? (
        <p className="error">{errorState.name}</p>
       ) : null}
      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          id="email"
          value={formState.email}
          onChange={inputChange}
        />
      </label>
      {errorState.email.length > 0 ? (
        <p className="error">{errorState.email}</p>
       ) : null}
      <label htmlFor="about">
        Tell us about yourself.
        <textarea
          name="about"
          id="about"
          value={formState.about}
          onChange={inputChange}
        />
        {errorState.about.length > 0 ? (
          <p className="error">{errorState}</p>
        ) : null}
      </label>
      <label htmlFor="priority">
        What is your #1 priority?
        <select 
            value={formState.priority} 
            name="priority"
            id="priorities"
            onChange={inputChange}
        >
          <option value="Mindfulness">Mindfulness</option>
          <option value="Work-Life Balance">Work-Life Balance</option>
          <option value="Time Management">Time Management</option>
          <option value="Physical Activity">Physical Activity</option>
          <option value="Family and Relationships">Family and Relationships</option>
          <option value="Sleep">Sleep</option>
        </select>
        {errorState.priority.length > 0 ? (<p className="error">{errorState.position}</p>
          ) : null}
      </label>
      <label htmlFor="terms">
        <input 
          type="checkbox"
          id="terms"
          name="terms"
          checked={formState.terms} //checkbox takes this particular attribute
          onChange={inputChange}
          />
          Terms and Conditions
          {errorState.terms.length > 0 ? (
            <p className="error">{errorState.terms}</p>
          ) : null}
      </label>
      {/* display the POST request data; <pre> is an HTML element, preformatted code, lets you write code the way it appears. JSON.stringify takes a JS object and turns it into string.*/}
      <pre>{JSON.stringify(post, null, 2)}</pre> 
      <button disabled={buttonDisabled}>Submit</button>
    </form>
  )
}