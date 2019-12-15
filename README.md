# People lister

> An API implementing the instructions from
[this API](https://bpdts-test-app.herokuapp.com/instructions).

The instructions could (and probably should) have been interpreted a little
more literally than what this repo represents. An API with two endpoints, one
for London users and another for users within 50 miles of London would have
probably sufficed.
Having said that, after looking at the source API and the requested features I
thought I'd implement an API providing the capability I'd imagine would be
required from the API after several rounds of iteration. This approach isn't
always a good idea given the requirements for the additional functionality
might never materialise, however, I thought I'd take the opportunity to do it
for my own interest.
Therefore, this API has an endpoint that will return people for any given city,
as long as the city has results in the source API. The same endpoint also
allows a variable distance from which people should be returned from _any_
city, rather than just London.

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

[Node.js](https://nodejs.org/en/) needs to be installed in the environment
where the app will be run.  Dependencies are installed via `npm install`.
The app can be started by running `npm run start` after which the API will be
available at [http://localhost:3000](http://localhost:3000).

### Docker

If you have [Docker](https://www.docker.com/) installed, the app can be built
and run without any concern for the state of the local environment e.g. which
version of `Node.js` is installed, is `npm` up to date, etc.

In order to run the app with Docker, the [Dockerfile](Dockerfile) can be used
to build an image. This can be done by running `docker build . -t
people-lister` (this may take several minutes depending on network and machine
performance). Once the image is built it can be run with `docker run --init -p
3000:3000 -t people-lister`. This will start the application running on port
`3000` and will be available at [http://localhost:3000](http://localhost:3000).
If `3000` isn't suitable, change the first `3000` in the `docker run` command
to a suitable port e.g. `docker run --init -p 5000:3000 -t people-lister` would
expose the site on port `5000`.

## Using the API - information and instructions

The root route of the API provides a set of links which can be followed to see
the results of the requested functionality i.e. listing users living in London
and listing users located within 50 miles of London. There are additional
links, each with information about what the link provides.

## Environment Variables

The following environment variables are used within the application.

| Variable     | Description                                                                                                          | Default                                                                      |
| :-------     | :----------                                                                                                          | :------                                                                      |
| `API_SERVER` | [FQDN](https://en.wikipedia.org/wiki/Fully_qualified_domain_name) of the API server, including protocol              | [https://bpdts-test-app.herokuapp.com](https://bpdts-test-app.herokuapp.com) |
| `LOG_LEVEL`  | An integer representing the level of logging to do. See [Bunyan Levels](https://www.npmjs.com/package/bunyan#levels) | 30 (info)                                                                    |
| `PORT`       | The port the application is available on                                                                             | 3000                                                                         |

## Implementation notes

### Case sensitivity

The source API is case sensitive. I've decided not to enforce case sensitivity
on my API and I've assumed cities are capitalised on the first letter only -
should this not be the case, this API would return a `404` as no
results would be found on the source API. Assumptions are generally not a good
idea but in this case I'm unable to ask whether this is correct or not.
I've not enforced case sensitivity, even though there are several
[RFCs stating this should be the case](https://stackoverflow.com/a/26196170)
because I believe it is a more pragmatic approach, making the API easier to
use. The easier an API is to use, the more likely it is to be used whilst also
reducing the number of bugs - whether they are defects in the software or
understanding of how it works by users.
Case sensitivity feels like an unnecessary implementation detail that should
not be exposed to clients.

### Geocoding

In order to provide the ability for cities other than London to return results
with a given distance I've used [Geocode.xyz](https://geocode.xyz/). Geocode
provides a free API for geocoding. The API is rate limited to ~1 request per
second when no authentication is supplied as per the [usage
limits](https://geocode.xyz/api).
All cities expect for London are looked up. London's coordinates are hard coded
within the app to ensure it will work even if Geocode was to fail. Caching the
results of the lookup would be a good next step to take as the location of a
city is unlikely to change over the course of the application's runtime.

### Testing

Testing has been focused on outside in i.e. an integration test was created to
test a feature of the API. As a consequence and largely due to the simplicity
of the API, there are very few unit tests.
Code coverage stats show the test coverage is high.

### Tools and technologies

* Language - [Node.js](https://nodejs.org/en/)
* Package manager - [npm](https://docs.npmjs.com/)
* Web framework - [Express.js](https://expressjs.com/)
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
