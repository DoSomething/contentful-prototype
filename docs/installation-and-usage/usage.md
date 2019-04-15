# Usage

### Access and Permissions

There are a couple of other applications and sites that you will want access to for development:

- The [Dosomething Team](https://dashboard.heroku.com/teams/dosomething/overview) on [Heroku](https://www.heroku.com/) \(To access Preview Apps, Phoenix deployments and more\).
- The [Dosomething Organization](https://app.wercker.com/dosomething) on [Wercker](https://app.wercker.com) \(To access and re-trigger auto builds for _Pull Requests_\).

## Tips and Tidbits 🍩

### Dev & QA Environments

Once a _Pull Request_ is merged, a deploy to our _Development_ and _QA (staging)_ environment is automatically triggered.

The Development environment can be accessed at [https://www-dev.dosomething.org](https://www-dev.dosomething.org).

The QA environment can be accessed at [https://qa.dosomething.org](https://qa.dosomething.org).

### Review Apps

When a Pull Request is submitted, a temporary deploy is made from the feature branch. Read more about this in the [Heroku documentation for Review Apps](https://github.com/DoSomething/phoenix-next/wiki/Review-apps).
