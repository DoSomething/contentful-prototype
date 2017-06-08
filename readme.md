# Phoenix Next

This is __Phoenix Next__, the new campaign experience for [DoSomething.org](https://www.dosomething.org)! It's built using [Laravel 5.3](https://laravel.com/docs/5.3), [Contentful](https://www.contentful.com), [React](https://reactjs.com/), and [Redux](http://redux.js.org) and plays nicely with the rest of our team ([Northstar](https://github.com/DoSomething/northstar), [Rogue](https://github.com/DoSomething/rogue), and co.)

### Contributing

Fork and clone this repository, add to your local [DS Homestead](https://github.com/DoSomething/ds-homestead), and run set-up:

```sh
# Install dependencies:
$ composer install && npm install
    
# Copy the default environment variables:
$ cp .env.example .env

# Run database migrations:
$ php artisan migrate

# And finally, build the frontend assets:
$ npm start
```

You may run unit tests locally using Jest & PHPUnit:

    $ npm test
    $ vendor/bin/phpunit
    
We follow [Laravel's code style](http://laravel.com/docs/5.3/contributions#coding-style) and automatically
lint all pull requests with [StyleCI](https://styleci.io/repos/26884886). Be sure to configure
[EditorConfig](http://editorconfig.org) to ensure you have proper indentation settings.

Consider [writing a test case](http://laravel.com/docs/5.3/testing) when adding or changing a feature.
Most steps you would take when manually testing your code can be automated, which makes it easier for
yourself & others to review your code and ensures we don't accidentally break something later on!

### License
&copy;2017 DoSomething.org. Phoenix is free software, and may be redistributed under the terms specified
in the [LICENSE](https://github.com/DoSomething/phoenix/blob/dev/LICENSE) file. The name and logo for
DoSomething.org are trademarks of Do Something, Inc and may not be used without permission.
