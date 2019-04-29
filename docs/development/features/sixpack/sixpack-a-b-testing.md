# Sixpack A/B Testing

## Overview

The Phoenix platform has the capability of running a variety of A/B Test Experiments to gather insight on what small changes on the web experience between a set of variants perform better. The overall aim is to find what small changes lead to more conversions from our existing website visitor traffic.

{% hint style="info"%}
While the terms "test" and "experiment" are generally used interchangeably, within the Phoenix framework, we like to think of "experiment" as the encompassing name for a specific A/B test experiment, and "tests" as the alternative options or test variants within the experiment.
{% endhint %}

## Test Experiment Types

Depending on the context for the kind of test being performed, there are 2 test approaches that Phoenix supports, A/B Tests executed in code, or A/B Tests executed using our Contentful CMS.

### Code Tests

If a Sixpack A/B Test intends to experiment with layout changes, color variatons, or other design or feature variations, these experiments are best executed entirely in code and set up by one of the developers on the team.

The [Code Tests](sixpack-code-tests.md) section provides more information and instructions regarding these types of experiments.

### Contentful Tests

If a Sixpack A/B Test intends to experiment with content copy changes, content asset changes, or visual order of blocks on a page, these experiments are best executed within the Contentful CMS by a content editor, using the `SixpackExperiment` content type to help set the experiment up.

The [Contentful Tests](sixpack-contentful-tests.md) section provides more information and instructions regarding these types of experiments.

## Under The Hood

To perform all these A/B Test Experiments, we utilize an open-source, language-agnostic A/B testing framework called [Sixpack](https://github.com/sixpack/sixpack). Sixpack runs as an instance on a server that Phoenix communicates with to exchange data and also pass along information to Sixpack regarding successful conversions on different experiments.

To communicate with the Sixpack server, Phoenix has a `Sixpack` service class located in [`/resources/assets/services/Sixpack.js`](https://github.com/DoSomething/phoenix-next/blob/master/resources/assets/services/Sixpack.js). This class is only instantiated _once_ during the page request cycle and only if an experiment is initiated; it contains a key-value store of all the experiments running on the current page being viewed.

There is a convenient `sixpack()` helper function you should use as an alias, which creates a new instance, or retrieves an existing instance of the `Sixpack` service class, ensuring that only one instance of the `Sixpack` is ever called. This function can be found in [`/resources/assets/helpers/index.js`](https://github.com/DoSomething/phoenix-next/blob/master/resources/assets/helpers/index.js).

### Experiment Participation

Regardless of whether a Sixpack A/B Test Experiment is a code test or a Contentful test, in both cases the core component that initiates and participates the current user in the experiment within Phoenix is the `SixpackExperiment` React component.

{% hint style="info"%}
Within Sixpack and A/B testing in general, the term "participate" indicates that a user is about to take part in an A/B test experiment and will be assigned one of the test alternative variants for the duration of the experiment.
{% endhint %}

The `SixpackExperiment` component can be found in [`/resources/assets/components/utilities/SixpackExperiment/`](https://github.com/DoSomething/phoenix-next/tree/master/resources/assets/components/utilities/SixpackExperiment) directory, along with a corresponding `SixpackExperimentContainer.js`.

When a `SixpackExperiment` component is rendered on a page, upon mounting the following series of steps occur:

1. The component configures some settings to set the name for the experiment, and define what the alternative test options are to choose from.
2. It then calls the `participate()` method on the `Sixpack` class via the `sixpack()` helper function, which makes an API request to the Sixpack server, and participates the current user in the specified A/B test experiment.
3. The response from the Sixpack server returns with the name of the selected alternative test option that the current user has been participated in.
4. Within the `Sixpack` service class, this experiment along with the associated alternative test option that was selected for the user is added to the `experiments` object property on the class.
5. The `participate()` method resolves and returns the name of the selected alternative option for the user to the `SixpackExperiment` component, and assigns it to the `selectedAlternative` component state property.
6. When the `SixpackExperiment` component state changes with the name of the selected alternative test, it re-renders with the component specified by the selected alternative test name.
7. On the rendered page, the current user sees one of the various test alternatives; specifically the test alternative that they have been assigned by the Sixpack server.

### Experiment Conversion

Again, regardless of whether a Sixpack A/B Test Experiment is a code test or a Contentful test, in both cases a user is converted on a test alternative for an experiment when they take a particular action on a page that triggers the conversion. This action typically involves interacting with a user interface element, like a button, that can programmatically trigger Phoenix to count the conversion on a test.

{% hint style="info"%}
Within Sixpack and A/B testing in general, the term "convert" indicates that a user participating in an experiment successfully took action on the test alternative that was assigned to them. The conversion rate for a particular test alternative is based on the number of participants that convert on a test, divided by the total number of participants that experience the test.
{% endhint %}

Within Phoenix, conversions can be triggered by a variety of actions, like a _campaign signup_, a _reportback post_ or clicking a button on a _call to action_ block.

Thus, the following describes how a user is converted on a test in Phoenix within the context of a campaign signup action, but can be applied to other actions and their respective user interface element interaction.

While on a Campaign landing page, with a Sixpack A/B test experiment running, upon clicking the button to signup for the campaign, the following series of steps occur:

1. When clicked, the `SignupButton` component calls the `storeCampaignSignup()` function from [`/resources/assets/actions/signup.js`](https://github.com/DoSomething/phoenix-next/blob/master/resources/assets/actions/signup.js).
2. The `storeCampaignSignup()` function dispatches an action to store the signup, and within the payload for the action there is a `sixpackExperiments` property that specifies the `conversion` as `signup` to trigger converting Sixpack experiments on signup.
3. Next, the `sixpackExperimentMiddleware` catches the dispatched action and it checks for a `payload.meta.sixpackExperiment.conversion` property within the action payload. If it finds a conversion specified on the property, it proceeds to run the `convertOnAction()` method from the `Sixpack` service class.
4. The `convertOnAction()` method converts all available experiments within the `experiments` list of registered experiments for a page that match a specified convertable action. For example, this will convert all experiments on the page that specify conversion on a "signup" action.
5. After finding all matching experiments that should convert on the specified action, it calls the `convert()` method on the `Sixpack` service class, which makes an API request to the Sixpack server for each matching experiment, and coverts the current user on the specified test for a respective A/B experiment.

For other types of interface elements that trigger a conversion (other buttons, links, call to action, etc), they will need to ensure they also ultimately dispatch an action, similar to the `convertOnSignupAction()` method mentioned above, that can be caught by the `sixpackExperimentMiddleware` and finalize counting the conversion on the Sixpack server for a specific test alternative.

{% hint style="info"%}
If the user is anonymous and is prompted to login or register when signing up for a campaign, the test conversion happens regardless of whether the user continues with the signup process or not, since we count having simply clicked the button as a successful conversion.
{% endhint %}
