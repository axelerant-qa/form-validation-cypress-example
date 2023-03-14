## Efficient End-to-End Form Validation Strategy using Cypress.io

Welcome to an example project that demonstrates an efficient end-to-end form validation strategy! In this project, we will be testing a web form located at https://automationintesting.online/.

![E2E Form Test](README_references/e2e_form_test.gif)

### Tech Stack
[Cypress.io](https://www.cypress.io/),Javascript web testing and component testing framework


### Test & Strategy

+ Test is added [here](cypress/e2e/e2e-contact-form-test.cy.js)

+ The strategy for this project is to:
    + Clean the backend if there are any existing data with our test data from backend API.
    + Submit the form via UI.
    + Verify the success message in UI.
    + Verify the form entries in Backend API.


### Installation
To install the necessary dependencies, run the following command:
```
npm install
```

### Execution
To execute the tests in headed mode, run the following command:
```
npm run test-headed
```

To execute the tests in headless mode, run the following command:
```
npm run test-headless
```

### Test Execution Evidence
+ Once the tests have finished running, you can find the test execution videos in the "cypress/videos" directory.

### Additional References
+ [How to perform database testing with cypress](https://testersdock.com/cypress-database-testing/)