# Sixpack A/B Testing

When implementing an A/B test using Sixpack in Phoenix-Next on the front-end, there are a few steps for successfully executing an experiment.

## Step 1

First, you need to edit the experiments JSON file located in the `/resources/assets` directory, and designate the relavant data for the experiment. The hierarchy is as follows:

* **Experiment Name**: the name of the experiment. e.g. "lede_banner_number_of_buttons"
* **Meta-data**:
  * **Pre-Test** \(`preTest`\): the condition or conditions that need to be met before an experiment can execute
* **Alternatives**: all of the alternatives for this AB test
* **Traffic Fraction** \(optional\): The amount of traffic you'd like to expose to this AB test \(The excluded traffic will receive the control alternative, but will not be counted as test participants.\)

```javascript
// Example experiments.json

{
  "lede_banner_number_of_buttons": {
    "meta": {
      "preTest": {
        "campaign.allowExperiments": true
      }
    },
    "alternatives": {
      "a": "one_button",
      "b": "two_buttons"
    },
    "trafficFraction": 0.1
  }
}
```

## Step 2

Next, we need to create versions of the component we want to display; one for each `alternative` designated in the JSON file.

For example, an AB test on the Lede Banner would consist of the original `<LedeBanner />` component \(which is considered the _control_\), which will be the `one_button` version, and a duplicate with the appropriate changes, so for example `<LedeBannerAltB>`, which will be the `two_buttons` version.

While it is often better to not repeat code throughout the code base, we saw that for different alternatives, sometimes the changes included adding classes to markup for different styles, modifying the markup, modifying behavior, changing text, etc. If all done in the same component file, the code got very unruly with lots of conditionals and was a waste of time to troubleshoot. Instead the key with this approach is to create duplicates of components and each duplicate just handles whatever alternative changes it needs to do. Nice and easy! 👌🏼

## Step 3

Wherever these components are supposed to output, you then wrap both of them within a `<ExperimentsContainer>...</ExperimentsContainer>` component:

```javascript
<ExperimentContainer name="lede_banner_number_of_buttons">
  <LedeBanner
    experiment="lede_banner_number_of_buttons"
    alternative="one_button"
    convert={props.convertExperiment}
    ... other props...
  />
  <LedeBannerAltB
    experiment="lede_banner_number_of_buttons"
    alternative="two_buttons"
    convert={props.convertExperiment}
    ... other props...
  />
<ExperimentsContainer />
```

The `<ExperimentsContainer>` will handle deciding which of the two children components to render out based on the selected alternative when a client is participated into an experiment.

Note the `props` passed to each alternative:

* `experiment`: name of experiment these components are a part of.
* `alternative`: which alternative the component represents.
* `convert`: method passed down from parent container to the `<Experiment />` component; comes from the `/actions`.

## Step 4

If the experiment you are running needs to execute based on a condition \(logged in, logged out, affiliated, unaffiliated, etc...\), then within the `/resources/assets/middleware/experiments.js` middleware, you will want to add a condition assertion to the `assertConditionPasses()` function. This basically returns a boolean indicating whether the condition passed.

_Important Note_: if a condition exists, and the condition does not pass, then the middleware chain of execution is terminated and any further actions suppressed; which just means the experiment does not run!

## Step 5

Lastly, to convert on an experiment on a user interaction, in each component alternative just call:

```javascript
convert(experiment);
```

Both `convert()` and `experiment` should have been passed as params as indicated earlier.

## Usage Tips

When testing to confirm that an experiment is set up properly, you can **force** a specific alternative by passing a URL parameter in the URL:

```text
http://example.com?sixpack-force-experiment_name=name_of_alternative_to_show
```

The forced alternative will not end up sending any data to Sixpack, so it will not affect the conversion!
