// Cypress uses MOCHA & CHAI under the hood
// the describe() method comes from the cypress program, so it does not need to be imported
// describe() takes the following arguments: 
// 1. a string that describes what our test is going to be.
// 2. a callback function that is going to be run.
describe("This is our test", () => {
    // write the actual test using the it() method.
    // takes the following arguments:
    // 1. string
    // 2. a callback function
    it("Should return true", () => {
        // use Chai Assertion library to write a test that that will return true.
        expect(true).to.equal(true);
    });
});

// write another test to test Form
describe("Testing our form inputs", () => {
    // https://mochajs.org/#hooks
    // beforeEach() code runs before each test in this block
    // reloads & refreshed the app so we get a fresh copy
    beforeEach(function() {
        cy.visit("http://localhost:3000");
    });

    it("Input Name into the Name Input", () => {
      // https://docs.cypress.io/api/api/table-of-contents.html
      // Tests in Cypress are asynchronous. But they are not promises, they just behave like it.
      // Three A's (Steps for every test we make):
      // 1. Arrange -> Gets the element. Copy & Paste from cypress selector
      //    .get() -> arrange
      // 2. Act -> Mimics User Interaction
      //    .type() -> act; allows us to mimic typing into something
      //    .act()
      // 3. Assert -> Tests/Verifies
      //    .should() -> assert
      //    we can also use Regex if we're looking for a piece of a string:
      //    ex: cy.contains(/^b\w+)
      cy.pause() // -> pauses cypress GIU and lets us see our tests one by one
      cy.get('[for="name"] > input') //-> we can also write our own element here
        .type("Melanie")
        .should("have.value", "Melanie")
        .type(" is awesome")
        .should("have.value", "Melanie is awesome")
        .clear();
      cy.contains("Name is a required field")

      cy.get('input[type="checkbox"]')
        .check()
        .should("be.checked")
    });
});

// Stop cypress GUI or stop test by typing: ctrl c
// To Write our test in the CLI (Video @1:35):
//         - In the test server: npx cypress run -> this tests runs everything in the folder
//         - If you want to run a certain test:
//         - npx cypress run --spec "cypress/integration/form_test.js"
// To clear terminal type: clear
// To open testing server: npx cypress open