# Delayed Element

This `DelayedElement` component allows for any element \(e.g. a survey modal, or some promotion CTA\) to be presented to the user after a specified amount of time.

## Usage Instructions

Let's use our survey example.

If we only want to expose this survey modal after 60 seconds:

```jsx
<DelayedElement delay={60}>
  <SurveyModal />
</DelayedElement>
```

And viola!
