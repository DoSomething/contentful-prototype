# Usage

Information regarding daily usage and typical services that will be used during development of the Phoenix platform.

## Testing

### PHPUnit

To run PHP tests locally, `ssh` into the Homestead Vagrant box, `cd` into the Phoenix repository location and use [PHPUnit](https://github.com/sebastianbergmann/phpunit), by running:

```bash
$ phpunit
```

{% hint style="info" %}
It is recommended that you run PHP Unit tests within the Homestead Vagrant box.
{% endhint %}

### Jest

To run JavaScript [Jest](https://github.com/facebook/jest) tests locally, run:

```bash
$ npm test
```

### Cypress

To run JavaScript [Cypress](https://www.cypress.io/) tests locally, run:

```bash
$ npm run cypress
```

New GraphQL types, fields, queries, and mutations should be reflected in the root `schema.json` file that is used by our Cypress test suite to mock GraphQL requests. The easiest way to update the schema is by using the [Apollo CLI](https://www.apollographql.com/docs/devtools/cli/):

```bash
$ apollo client:download-schema --endpoint=http://graphql-dev.dosomething.org/graphql schema.json
```

## Code Style

We use [Prettier](https://prettier.io/) to format our code & [ESLint](http://eslint.org/) to catch common mistakes.

They run in the following scenarios:

- When using the `npm start` command, your files will be "watched" for changes, and when a change is detected, the JS code will be linted and only compiled if it passes.
- Code will be automatically formatted when committing changes. You can also install an [editor plugin](https://prettier.io/docs/en/editors.html) to reformat code as you write it, or manually format the project with `npm run format`.
- You can manually lint code by running `npm run lint -s`. The `-s` option lets you suppress the verbose NPM warnings that follows when there are linting errors.
- Code linting also runs via [Wercker](http://www.wercker.com/), our continuous integration service, when a new pull request is made for the repository.

We use [StyleCI](https://styleci.io/repos/75642790) service to lint our PHP code when a new pull request is made for the respository.

## Services

There are a couple of other third-party services that you will want access to for development:

- The [Dosomething Team](https://dashboard.heroku.com/teams/dosomething/overview) on [Heroku](https://www.heroku.com/) to access the Phoenix Pipeline, which includes Review Apps, Dev, QA and Production Phoenix deployments.
- The [Dosomething Organization](https://app.wercker.com/dosomething) on [Wercker](https://app.wercker.com) to access and re-trigger auto builds for _pull requests_ in the Phoenix repository.

### Review Apps

When a pull request is submitted to the Phoenix repository, a temporary deploy is made from the feature branch to Heroku for reviewers to experience new changes to the site in a sample environment. Read more about this in the [Heroku documentation for Review Apps](https://github.com/DoSomething/phoenix-next/wiki/Review-apps).

### Dev & QA Environments

Once a _Pull Request_ is merged, a deploy to our _Development_ and _QA (staging)_ environment is automatically triggered on the Phoenix Pipeline in Heroku.

The Development environment can be accessed at [https://dev.dosomething.org](https://dev.dosomething.org).

The QA environment can be accessed at [https://qa.dosomething.org](https://qa.dosomething.org).
