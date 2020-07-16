UPER Problem Solving Framework

U - Understand the Problem
P - Plan how to solve the problem
E - Execute your plan
R - Reflect on your work, your results, and the process. What would you do differently?

Understand:
What would your final results look like?
    - A SPA that has a form to onboard a new user to a system. The SPA will have _at least_ the following pieces of information about the new user:

        - [√] Name 
        - [√] Email 
        - [ ] Password
        - [√] Terms of Service (checkbox)
        - [√] A Submit button to send our form data to the server. 

    - This app will render an array of objects to the page. Values are strings of user names, email, password, etc.

What does the project do/functionality?
    The following functionalities are required:
    [√] Using Yup, set up _at least_ two different validations along with custom error messages that will display on screen when validation fails.
    [√] Craft a `POST` request using `axios` that sends your form data to the following endpoint: _`https://reqres.in/api/users`_
    [ ] Verify using a `console.log()` that you are receiving a successful response back 
    [ ] Set up a state property called `users` that is initialized with an empty array
    [ ] Every time you make a `POST` request, and get that new user data back, update your `users` state with the new user added to the array
    [ ] Render `users` in your app. You can use the html pre tag and JSON.stringify() method to display your post request.

What’s the starting point?
    - CRA
    - Install dependencies

What type of constraints might you have?
    - Time, Skills, Project requirements

What might success look like?
    - A fully functional SPA with all requirements met and provides a pleasant UI experience.

What are your questions?
    - Where to place state?
        - Place Form state in Form component
    - Where to place props?
    - How to post a request?
    - What is YUP?
        - Validation Library
        - Validates email, password, etc.
    - JSON.stringify()
    - endpoint: _`https://reqres.in/api/users`_
    - How to submit form to a data server?
    - How to render this data to our page?

Plan:
Prepare a list of steps
    - CRA √
    - Install Yup, axios, styled components √
    - Create components folder √
    - Create Form.js file √
    - Import Form.js to App.js √
    - Place Form component in App √

Plan backwards?
If you still have questions, go back to “understand” phase.

Execute:
Follow Plan
It’s OK to adjust
Don’t be afraid to make mistakes
Create checkpoints, by using console.log

Reflect:
Successful?
What did you learn?
What would you do differently?
Where might you make improvements?
