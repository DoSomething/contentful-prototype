# Phoenix

This is __Phoenix__, the new web interface for [DoSomething.org](https://www.dosomething.org)! It's built using [Laravel 5.3](https://laravel.com/docs/5.3) and [Contentful](https://www.contentful.com), and plays nicely with the rest of our team ([Northstar](https://github.com/DoSomething/northstar), [Rogue](https://github.com/DoSomething/rogue), and co.)

### Contributing

Fork and clone this repository, add to your local [DS Homestead](https://github.com/DoSomething/ds-homestead), and run set-up:

```sh
# Install dependencies:
$ composer install && npm install
    
# Copy the default environment variables:
$ cp .env.example .env

# And finally, run database migrations:
$ php artisan migrate
```

You can seed the database with test data:

    $ php artisan db:seed

You may run unit tests locally using PHPUnit:

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
