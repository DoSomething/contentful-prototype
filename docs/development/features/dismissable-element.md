# Dismissable Element

The DismissableElement utility component allows for any element \(e.g. a survey modal, or some promotion CTA\) to be exposed or hidden from the user based on certain "Hidden" or "Dismissed" rules using Local Storage for persistence on a user's browser.

It will render the specified element, by default provided that:

- the user has not dismissed the element in 30 days \(localstorage\)
- the user is not marked to be hidden from the element \(localstorage\)

## Usage Instructions

Let's use our survey modal example.

If we want to render this survey modal element, all we need to do is set up a `name` so that we can identify this specific element, and pass along the `handleClose` callback method provided via the `render` prop to our element:

```jsx
<DismissableElement
  name="fun_survey"
  render={handleClose => <SurveyModal handleClose={handleClose} />}
/>
```

It is the elements responsibility to invoke the provided `handleClose` method when the user dismisses the element (e.g. via an 'X' button which when clicked, invokes the callback). The `DismissableElement` component will then take care of updating localstorage that the user dismissed the element at the current timestamp. It will hide the element from the user immediately and for the next 30 days.

You can ensure that the element is hidden for the user indefinitely (or as long as localstorage persists the data) by directing the user to any page on site where the element is rendered via `DismissableElement`, with the following query parameter in the URL: `hide_[element_name]=1`. The DismissableElement will automatically update localstorage to hide the element from the user.

e.g. `https://dosomething.org/us/campaigns/teens-for-jeans?hide_fun_survey=1`.
