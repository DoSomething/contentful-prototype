# Installation

Fork and clone the [Phoenix repository](https://github.com/DoSomething/phoenix-next) to your computer, and then [add it to your local Homestead](requrements.md) installation.

Once you have access to Contentful, `ssh` into the Homestead Vagrant box, `cd` into the Phoenix repository location and run:

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

To run PHP tests locally, `ssh` into the Homestead Vagrant box, `cd` into the Phoenix repository location and use [PHPUnit](https://github.com/sebastianbergmann/phpunit), by running:

```bash
$ vendor/bin/phpunit
```

_It would be easier to run the PHPUnit tests from within the Homestead Vagrant box._

### JavaScript

You may run JavaScript tests locally using [Jest](https://github.com/facebook/jest), by running:

```bash
$ npm test
```

## Code Style

We use [Prettier](https://prettier.io/) to format our code & [ESLint](http://eslint.org/) to catch common mistakes. They run in the following scenarios:

- When using the `npm start` command, your files will be "watched" for changes, and when a change is detected, the JS code will be linted and only compiled if it passes.
- Code will be automatically formatted when committing changes. You can also install an [editor plugin](https://prettier.io/docs/en/editors.html) to reformat code as you write it, or manually format the project with `npm run format`.
- You can manually lint code by running `npm run lint -s`. The `-s` option lets you suppress the verbose NPM warnings that follows when there are linting errors.
- Code linting also runs via [Wercker](http://www.wercker.com/), our continuous integration service, when a new pull request is made for the repository.

We use [StyleCI](https://styleci.io/repos/75642790) service to lint our PHP code when a new pull request is made for the respository.
