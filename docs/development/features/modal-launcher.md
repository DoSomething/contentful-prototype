# Modal Launcher

This feature allows for a pop up / modal \(e.g. a survey, or some promotion\) that is presented to the user after a specified amount of time.

We use the ModalLauncher component to process the logic and set up the parameters for launching this component.

It will launch the specified modal type, after the specified amount of time, under these conditions:

* the user is logged in
* the user has not dismissed the modal in 30 days \(localstorage\)
* the user is not set to be hidden from the modal \(localstorage\)
* the ENV \(`.env`\) is toggled to enable this specific modal feature \(`[type in uppercase]_ENABLED=true`\)

## Usage Instructions

Let's use our Survey example.

If we only want to launch this FUN_SURVEY_MODAL modal type after 60 seconds:

```jsx
<ModalLauncher countdown={60} type="fun_survey" modalType="FUN_SURVEY_MODAL" />
```

And viola!

## Considerations

Please note, that you are in charge of setting up the localstorage to track user dismissal and whether to hide the specific modal feature. This should be set in the following format:

\(assuming use of the [`set`](https://git.io/vAhRx) storage helper\)

* `set('[user id]_dismissed_[modal feature name]', 'timestamp', Date.now())`
* `set('[user id]_hide_[modal feature name]', 'boolean', true)`

You can also have the 'hide' data stored automatically by redirecting the user to any page on PN with the following query parameter: `hide_[modal feature name]=1`
