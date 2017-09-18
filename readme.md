# Phoenix Next

fdsfdsfkdsfjnkdsfijdsbhjfkdsigfdhbx

This is __Phoenix Next__, the new campaign experience for [DoSomething.org](https://www.dosomething.org)! It's built using [Laravel 5.3](https://laravel.com/docs/5.3), [Contentful](https://www.contentful.com), [React](https://reactjs.com/), and [Redux](http://redux.js.org) and plays nicely with the rest of our team ([Northstar](https://github.com/DoSomething/northstar), [Rogue](https://github.com/DoSomething/rogue), and co.)


## Installation

Fork and clone this repository to your computer, and then add to your local [Homestead](https://github.com/laravel/homestead) installation. Homestead provides a pre-packaged development environment to help get you up and running quickly! 

For help on getting Homestead setup on your computer, refer to the following [instructions](https://github.com/DoSomething/communal-docs/tree/master/Homestead).

### Step 1: Dependencies & Environment

```sh
# Install dependencies:
$ composer install && npm install
    
# Copy the default environment variables:
$ cp .env.example .env
```

### Step 2: Migrate Data

```sh
# Run database migrations:
$ php artisan migrate
```

### Step 3: Build Assets

```sh
# And finally, build the frontend assets:
$ npm start
```

### Step 4: Content Access

We use [Contentful](https://www.contentful.com/) as our content management platform. Please setup an account and request access to the _space_ used for this project. Once you have access, head to the **APIs** section for the space and then you can update your `.env` file with the correct API keys and Space ID for the project, allowing you to make requests to access the data from your local environment.


## Testing

### PHP

You may run PHP tests locally using [PHPUnit](https://github.com/sebastianbergmann/phpunit), by running:

```sh
$ vendor/bin/phpunit
```

_It would be easier to run the PHPUnit tests from within the Homestead Vagrant box._

### JavaScript

You may run JavaScript tests locally using [Jest](https://github.com/facebook/jest), by running:

```sh
$ npm test
```


## Linting

We use [ESLint](http://eslint.org/) to lint our front-end JavaScript code. It runs in the following scenarios:
- When using the `npm start` command, your files will be "watched" for changes, and when a change is detected, the JS code will be linted and only compiled if it passes.
- You can manually execute linting the code by running `npm run lint -s`. The `-s` option lets you suppress the verbose NPM warnings that follows when there are linting errors.
- Code linting also runs via [Wercker](http://www.wercker.com/) our continuous integration service when a new pull request is made for the repository.

We use [StyleCI](https://styleci.io/repos/75642790) service to lint our PHP code when a new pull request is made for the respository.


## License
&copy;2017 DoSomething.org. Phoenix is free software, and may be redistributed under the terms specified
in the [LICENSE](https://github.com/DoSomething/phoenix/blob/dev/LICENSE) file. The name and logo for
DoSomething.org are trademarks of Do Something, Inc and may not be used without permission.
