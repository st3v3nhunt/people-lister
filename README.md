# People lister

> An API implementing the instructions from
[this API](https://bpdts-test-app.herokuapp.com/instructions).


# API definition

This API has been documented using
[OpenAPI 3.0 Specification](https://swagger.io/docs/specification/about/).
The file is available within the repo - [swagger.yml](./swagger.yml).

To view the file in an online editor, click this
[link](https://editor.swagger.io?url=https://raw.githubusercontent.com/st3v3nhunt/people-lister/master/swagger.yml).

_Note: there is no link between the editor and the repository. Any changes made
in the editor will not be saved back to the repository._

## Running the app

Node.js needs to be installed in the environment where the app will be run.
Dependencies are installed via `npm install`.
The app can be started by running `npm run start` after which the API will be
available at [http://localhost:3000](http://localhost:3000).
 

## Environment Variables

| Variable     | Description                                                                                             | Default                                |
| :-------     | :----------                                                                                             | :------                                |
| `API_SERVER` | [FQDN](https://en.wikipedia.org/wiki/Fully_qualified_domain_name) of the API server, including protocol | `https://bpdts-test-app.herokuapp.com` |
| `PORT`       | The port the application is available on                                                                | 3000                                   |

### Implementation notes

...

### Tools and technologies

* Language - [Node.js](https://nodejs.org/en/)
* Web framework - ([Express.js](https://expressjs.com/))
* HTTP request library -
  [request-promise-native](https://www.npmjs.com/package/request-promise-native).
* Logging - [bunyan](https://www.npmjs.com/package/bunyan)
* [nodemon](https://www.npmjs.com/package/nodemon) for auto-reloading of the app
* [husky](https://www.npmjs.com/package/husky) for
  [githooks](https://git-scm.com/docs/githooks)
* Test framework - [Mocha](https://mochajs.org/)
* Assertion library - [Chai assertions](https://www.chaijs.com/) and
  [Chai HTTP](https://www.npmjs.com/package/chai-http) for integration testing
* API response mocking - [nock](https://www.npmjs.com/package/nock)
* Code coverage - [nyc](https://www.npmjs.com/package/nyc)
* Linting - [ESLint](https://eslint.org/) with
  [eslint-config-nhsuk](https://www.npmjs.com/package/eslint-config-nhsuk)
