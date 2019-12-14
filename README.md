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

### Directly

Node.js needs to be installed in the environment where the app will be run.
Dependencies are installed via `npm install`.
The app can be started by running `npm run start` after which the API will be
available at [http://localhost:3000](http://localhost:3000).

### Docker

If you have [Docker](https://www.docker.com/) installed, the app can be built
and run without any concern for the state of the local environment e.g. which
version of `Node.js` is installed, is `npm` up to date, etc.

In order to run the app with Docker, the [Dockerfile](Dockerfile) can be used
to build an image. This can be done by running `docker build . -t
people-lister` (this may take several minutes depending on network and machine
performance). Once the image is built it can be run with `docker run -d -p
3000:3000 -t people-lister`. This will start the application running on port
`3000` and will be available at [http://localhost:3000](http://localhost:3000).
If `3000` isn't suitable, change the first `3000` in the `docker run` command
to a suitable port e.g. `docker run -d -p 3003:3000 -t people-lister` would
expose the site on port `3003`.

## Using the API - information and instructions

The root page provides a set of links which can be followed to see the results
of the requested functionality i.e. listing users living in London and listing
users located within 50 miles of London. There are additional links with
information about what this provide.

## Environment Variables

| Variable     | Description                                                                                                          | Default                                                                      |
| :-------     | :----------                                                                                                          | :------                                                                      |
| `API_SERVER` | [FQDN](https://en.wikipedia.org/wiki/Fully_qualified_domain_name) of the API server, including protocol              | [https://bpdts-test-app.herokuapp.com](https://bpdts-test-app.herokuapp.com) |
| `LOG_LEVEL`  | An integer representing the level of logging to do. See [Bunyan Levels](https://www.npmjs.com/package/bunyan#levels) | 30 (info)                                                                    |
| `PORT`       | The port the application is available on                                                                             | 3000                                                                         |

### Implementation notes

The source API is case sensitive. I've decided not enforce case sensitivity on
my API and I presume the cities are capitalised on the first letter only
although this could very well be a mistake.  My reason for not following case
sensitivity, even though there are several [RFCs stating this should be the
case](https://stackoverflow.com/a/26196170) is because I believe it makes the
API easier to use. In turn, this is likely to attract more users and fewer
bugs. It is also means clients do not need detailed knowledge of the data (in
this case the city names) as it feels like this is implementation detail.

[Geocode.xyz](https://geocode.xyz/) provides a free API for forward geocoding.
It is rate limited to ~1 request per second when no authentication is supplied
as per the [usage limits](https://geocode.xyz/api). The lookup is only
performed for cities that are not London (London's coordinates are hard coded
within the app).

Testing was based around creating integration tests for API functions.
Consequently there are no unit tests as the functionality has been covered at
the higher level. This can be confirmed with the high code coverage
requirements being met.

### Tools and technologies

* Language - [Node.js](https://nodejs.org/en/)
* Web framework - ([Express.js](https://expressjs.com/))
* HTTP request library -
  [request-promise-native](https://www.npmjs.com/package/request-promise-native).
* Geocoding uses the [geocode.xyz](https://geocode.xyz/) API
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
