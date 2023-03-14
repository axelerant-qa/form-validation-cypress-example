let baseUrl = "https://automationintesting.online"
describe('e2e-contact-form-test', () => {
  beforeEach(() => {
    cy.log('Checking if there are any messages for the test data:James Dean')
      .request('GET', `${baseUrl}/message/`)
      .then((response) => {
        // Filter the messages to get those for James Dean
        const jamesDeanMessages = response.body.messages.filter((message) => message.name === 'James Dean');
        // If there are any messages for James Dean, delete them
        if (jamesDeanMessages.length > 0) {
          cy.log('Logging in as admin')
            .request('POST', `${baseUrl}/auth/login`, {
              username: 'admin',
              password: 'password',
            })
            .then((response) => {
              cy.log('Verifying login success')
              expect(response.status).to.equal(200);
              cy.log(`Deleting ${jamesDeanMessages.length} messages for James Dean`);
              // Loop through the James Dean messages and delete them
              cy.wrap(jamesDeanMessages).each((message) => {
                cy.log(`Deleting message with id ${message.id}`);
                cy.request('DELETE', `${baseUrl}/message/${message.id}`)
                  .its('status')
                  .should('eq', 202);
              });
            });
        } else {
          cy.log('No messages for the test data: James Dean');
        }
      });
  });

  it('Submit the form via UI & Verify the entries through the backend API', () => {
    cy.log('Visiting the UI form').visit(`${baseUrl}`);
    cy.log('Filling out the contact form');
    cy.log("Type Valid Contact Name").get('[data-testid="ContactName"]').type("James Dean");
    cy.log("Type Valid Email").get('[data-testid="ContactEmail"]').type("testemail@admin.com");
    cy.log("Type Valid Phone").get('[data-testid="ContactPhone"]').type("+91123456789");
    cy.log("Type Valid Subject").get('[data-testid="ContactSubject"]').type("Booking enquiry");
    cy.log("Type Valid Description").get('[data-testid="ContactDescription"]').type("Test Contact Description");
    cy.log('Submitting the contact form');
    cy.log("Click submit button of the form").get('#submitContact').click();
    cy.log("Check the expected success message in UI").get('.row.contact h2').should('contain.text',"James Dean!");
    cy.log("Verify the feeded data via backend API").request(`${baseUrl}/message`).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('messages').that.is.an('array').with.lengthOf.at.least(1);
      const messages = response.body.messages;
      const filteredMessages = messages.filter(message => message.name === 'James Dean' && message.subject === 'Booking enquiry' && message.read === false);
      expect(filteredMessages).to.have.lengthOf.at.least(1);
      const message = filteredMessages[0];
      expect(message).to.have.property('id').that.is.a('number');
    });
  });
});

