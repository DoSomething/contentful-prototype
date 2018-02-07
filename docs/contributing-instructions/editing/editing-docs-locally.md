# Editing Docs Locally
***

To help facilitate editing the documentation locally, you can install the `gitbook-cli` globally to auto-build and serve a sample version with your edits as you work.

Install the CLI by running:
```bash
$ npm install gitbook-cli -g
```

Next, make sure to install any of the plugins that were added to help GitBook add some useful features:
```bash
$ gitbook install
```

Then within the Phoenix project repository you can serve a local version of the book by running:
```bash
$ gitbook serve
```

You can view the local version by heading to `http://localhost:4000`.

Additional instructions can be found in the [GitBook setup instructions](https://toolchain.gitbook.com/setup.html).
