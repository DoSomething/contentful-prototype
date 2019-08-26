# Feature Launcher

This Feature Launcher allows for any feature \(e.g. a survey modal, or some promotion\) to be presented to the user after a specified amount of time.

It will launch the specified feature, after the specified amount of time, under these conditions:

- the user has not dismissed the feature in 30 days \(localstorage\)
- the user is not set to be hidden from the feature \(localstorage\)
- the ENV \(`.env`\) is toggled to enable this specific feature \(`[type_in_uppercase]_ENABLED=true`\)

## Usage Instructions

Let's use our Survey example.

If we only want to launch this FUN_SURVEY_MODAL feature type after 60 seconds:

```jsx
<FeatureLauncher
  countdown={60}
  type="fun_survey"
  render={handleClose => <SurveyModal handleClose={handleClose} />}
/>
```

And viola!

Note that it is the features responsibility to invoke the provided `handleClose` method when the user dismisses the feature. The `FeatureLauncher` will then take care of updating localstorage that the user dismissed the feature at the current timestamp. It will hide the feature from the user immediately and for the next 30 days.

## Tips & Tricks

You can ensure that the feature is hidden for the user indefinitely (as long as localstorage persists the setting data) by redirecting the user to any page on site with the following query parameter: `hide_[feature_name]=1`. The FeatureLauncher will automatically update localstorage to hide the feature from the user.
