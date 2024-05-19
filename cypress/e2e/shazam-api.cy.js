import 'cypress-mochawesome-reporter/register';

describe('Test /artist/get-top-songs from Shazam', () => {
  const BASEURL = Cypress.env('url');
  const apiKey = Cypress.env('apiKey');
  const host = Cypress.env('host');

  const headers = {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': host
  };
  const qsValidId = {
    id: 567072,
    l: "en-US",
  };
  const qsInvalidId = {
    id: 5670729990000,
    l: "en-US",
  };

  it('Verify the get top songs endpoint returns 200', () => {
    cy.request({
      method: 'GET',
      url: BASEURL,
      qs: qsValidId,
      headers: headers
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it('Verify the get top songs endpoint returns 10 songs', () => {
    cy.request({
      method: 'GET',
      url: BASEURL,
      qs: qsValidId,
      headers: headers
    }).then((response) => {
      expect(response.status).to.equal(200);

      const songs = response.body.data;
      expect(songs).to.be.an('array').that.has.lengthOf(10);
    });
  });

  it('Verify a 404 status code is returned when the artistId is invalid', () => {
    cy.request({
      method: 'GET',
      url: BASEURL,
      qs: qsInvalidId,
      headers: headers,
      failOnStatusCode: false // Permitimos continuar mesmo com status 404
    }).should((response) => {
      const errors = response.body.errors;
      expect(errors).to.be.an('array').that.is.not.empty;
      expect(errors[0].status).to.equal("404");
    });
  });

  it('Verify the get top songs endpoint returns 403 when the API key is invalid', () => {
    const invalidHeaders = {
      ...headers,
      'X-RapidAPI-Key': 'c6cfae4770mshfa1364e50bc1a23p11c49bjsn88f8e97d46c0sdsds'
    };

    cy.request({
      method: 'GET',
      url: BASEURL,
      qs: qsValidId,
      headers: invalidHeaders,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(403);
      expect(response.body.message).to.equal("You are not subscribed to this API.");
    });
  });

  it('Verify the type attribute of the first object is returning as "Song"', () => {
    cy.request({
      method: 'GET',
      url: BASEURL,
      qs: qsValidId,
      headers: headers
    }).then((response) => {
      expect(response.status).to.equal(200);

      const songs = response.body.data;
      expect(songs).to.be.an('array').that.has.lengthOf(10);

      songs.forEach(song => {
        expect(song.type).to.equal("songs");
      });
    });
  });

  it('Verify the artist name is Gorillaz', () => {
    cy.request({
      method: 'GET',
      url: BASEURL,
      qs: qsValidId,
      headers: headers
    }).then((response) => {
      expect(response.status).to.equal(200);

      const songs = response.body.data;
      expect(songs).to.be.an('array').that.has.lengthOf(10);

      songs.forEach(song => {
        expect(song.attributes.artistName).to.equal("Gorillaz");
      });
    });
  });

  it.only('Verify the response when no query parameters are provided', () => {
    cy.request({
      method: 'GET',
      url: BASEURL,
      headers: headers,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(204);
    });
  });
  
});