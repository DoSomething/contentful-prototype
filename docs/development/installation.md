# Installation

Fork and clone this repository to your computer, and then [add to your local Homestead](https://github.com/DoSomething/communal-docs/tree/master/Homestead) installation. Homestead provides a pre-packaged development environment to help get you up and running quickly!

We use [Contentful](https://www.contentful.com/) as our content management platform. Please setup an account and request access to the _space_ used for this project.

```bash
# Install dependencies:
$ composer install && npm install

# Configure application & run migrations:
$ php artisan phoenix:setup

# And finally, build the frontend assets:
$ npm start
```

## Testing

### PHP

You may run PHP tests locally using [PHPUnit](https://github.com/sebastianbergmann/phpunit), by running:

```bash
$ vendor/bin/phpunit
```

_It would be easier to run the PHPUnit tests from within the Homestead Vagrant box._

### JavaScript

You may run JavaScript tests locally using [Jest](https://github.com/facebook/jest), by running:

```bash
$ npm test
```

## Linting

We use [ESLint](http://eslint.org/) to lint our front-end JavaScript code. It runs in the following scenarios:

* When using the `npm start` command, your files will be "watched" for changes, and when a change is detected, the JS code will be linted and only compiled if it passes.
* You can manually execute linting the code by running `npm run lint -s`. The `-s` option lets you suppress the verbose NPM warnings that follows when there are linting errors.
* Code linting also runs via [Wercker](http://www.wercker.com/) our continuous integration service when a new pull request is made for the repository.

We use [StyleCI](https://styleci.io/repos/75642790) service to lint our PHP code when a new pull request is made for the respository.
