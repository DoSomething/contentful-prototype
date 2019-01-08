# Heroku

Heroku is a platform that lets developers focus on building applications instead of orchestrating infastructure. We currently use Heroku for Review Applications, temporary apps that deploy for every pull request, and we're moving towards hosting Phoenix entirely on Heroku.

## Heroku Resources

Pages useful for understanding and debugging Heroku.

- [12 Factor](https://12factor.net/)
- [Heroku Dev Center](https://devcenter.heroku.com/)
- [Heroku Laravel Buildpack](https://devcenter.heroku.com/articles/getting-started-with-laravel)
- [Heroku Javascript Buildpack](https://devcenter.heroku.com/articles/deploying-nodejs)
- [Heroku Review Apps Documentation](https://devcenter.heroku.com/articles/deploying-nodejs)

## Laravel + Heroku notes

Review apps are spun up everytime a pull request is made by using the [app.json](https://github.com/DoSomething/phoenix-next/blob/dev/app.json) as an instruction set for how to configure the dyno. Any secret environment variables that it pulls in come from the QA (staging) app within the Phoenix Heroku pipeline.

Heroku apps contain a _Procfile_ that declares what command should be executed to start an app. Phoenix's Procfile declares that a single `web` process type should be run; this process will be attached to the HTTP rounting stack of Heroku and receive web traffic when deployed. The command that is executed to start the app will run a composer command that helps with Phoenix setup, start up the Nginx server and serve the app from the `public/` directory. It will also run the initial database migrations for the app.

Something to note is that we had to change the [Trusted Proxy](https://github.com/DoSomething/phoenix-next/blob/dev/config/trustedproxy.php) settings in order for the app to work smoothly with Heroku's load balancer.
