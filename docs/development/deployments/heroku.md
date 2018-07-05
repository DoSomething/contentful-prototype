# Heroku

Heroku is a platform that lets developers focus on building applications instead of orchestrating infastructure. We currently use Heroku for Review Applications, temporary apps that deploy for every pull request, and we're moving towards hosting Phoenix \(next\) entirely on Heroku.

## Heroku Resources

Pages useful for understanding and debugging Heroku.

* [12 Factor](https://12factor.net/)
* [Heroku Dev Center](https://devcenter.heroku.com/)
* [Heroku Laravel Buildpack](https://devcenter.heroku.com/articles/getting-started-with-laravel)
* [Heroku Javascript Buildpack](https://devcenter.heroku.com/articles/deploying-nodejs)
* [Heroku Review Apps Documentation](https://devcenter.heroku.com/articles/deploying-nodejs)

## Laravel + Heroku notes

Review apps are spun up everytime a pull request is made by using the [app.json](https://github.com/DoSomething/phoenix-next/blob/dev/app.json) as an instruction set for how to configure the dyno. Any secret environment variables that it pulls in come from the staging app within the Phoenix \(next\) Heroku pipeline.

Phoenix \(next\) Heroku apps also execute a [post-deploy script](https://github.com/DoSomething/phoenix-next/blob/dev/bootstrap/setup.sh) that we created, which handles running tasks such database migrations.

In order to make the MySql connection work in Heroku, we had to make some changes to how Laravel connects to MySql. [Here](https://github.com/DoSomething/phoenix-next/blob/dev/config/database.php#L3) is the code for how that works. We also had to change the [Trusted Proxy](https://github.com/DoSomething/phoenix-next/blob/dev/config/trustedproxy.php) in order for the app to work smoothly with Heroku's load balancer.

