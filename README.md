# Shazam API Test

# Shazam api test

![example workflow](https://github.com/dfernandos/Shazam-api-test/actions/workflows/main.yml/badge.svg)

The purpose of this assessment is to test a public api. It was choose the Shazam api to be tested. 

## Tools Used

- **Cypress**: Cypress is a fast, easy, and reliable testing for anything that runs in a browser.
- **Node.js**: The project was created using Node.js version 16.14.2.

## Prerequisites:

1. (version 16.14.2 or later)
2. Visual Studio code

## Getting Started

To get started with this project, make sure you have Node.js.

1. Clone this repository.

2. Install node dependencies: 

   ```

   npm install

   ```

## Run tests

In order to run the test you will need to run the following command:

```bash
npx cypress run
```

## Justification for choosing these scenarios

The objective of the tested endpoint is to get the top 10 songs of a specific artist. The scenarios mapped will ensure that the main objective of the endpoint are functioning. Based on this objective, it was decided to test the following scenarios:

```
Feature: Get Top Songs by artists from Shazam API

  Scenario: Verify the get top songs
    Given I hit the url for get top artists api endpoint
    When I pass the url in the request for the artist 567072
    Then I receive the response code as 200

  Scenario Outline: Verify the type attribute of the first object is returning as "Song"
    Given I hit the url for get top artists api endpoint
    When I pass the url in the request for the artist 567072
    Then I verify that the type of the first object is "Songs"

  Scenario Outline: Verify the artist name is Gorillaz
    Given I hit the url for get top artists api endpoint
    When I pass the url in the request for the artist 567072
    Then I verify that the artist name is Gorillaz

  Scenario: Verify the total of the songs are equal to 10
    Given I hit the url for get top artists api endpoint
    When I pass the url in the request for the artist 567072
    Then I verify the total of the songs are equal to 10

  Scenario: Verify a 404 status code is returned for an in valid artist
    Given I hit the url for get top artists api endpoint
    When I pass the url in the request for the artist 567072999
    Then I receive the response code as 404

  Scenario: Verify a 403 status code is returned for an invalid API key
    Given I hit the url for get top artists api endpoint
    When I pass the url in the request with an invalid API key
    Then I receive an error response code
```

## Continuous Integration

Every commit in this project is running a git action workflow that builds the node environment and run all tests. 

### Reporting

Once you run `npx cypress run`, the test report will be generated at the following path:

`cypress/reports/indext.html`
