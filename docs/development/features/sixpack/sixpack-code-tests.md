# Sixpack Code Tests

To create a Sixpack A/B Test Experiment in code, you first need to determine the component that would be overridden.

As an example to help with describing the steps involved, lets consider a Sixpack A/B Test Experiment to test between two variations of the template used for the lede banner on the campaign landing page.

Since we would be testing the `LedeBanner` component, using multiple variations, within the `LandingPage` compoent we would want to insert the `SixpackExperiment` component in place of the `LedeBanner`, and instead pass the `LedeBanner` variations as items in the `alternatives` property of the `SixpackExperimentContainer`:

```javascript
// /resources/assets/components/pages/LandingPage/LandingPage.js
// Placed within the returned JSX/HTML output.

<SixpackExperimentContainer
  title="LedeBanner Layout Experiment"
  convertableActions={['signup']}
  alternatives={[
    <LedeBannerContainer testName="Mosaic Layout Template" />,
    <LedeBannerContainer
      testName="Jumbo Layout Template"
      coverImage={{
        url: 'https://cdnexample.com/path/to/image/jumbo-template-image.png',
      }}
      template="jumbo"
    />,
  ]}
/>
```

You then import the `SixpackExperimentContainer` component from `/resources/assets/components/utilities/SixpackExperiment/SixpackExperimentContainer`, and in place of the existing component you need to replace it with the `SixpackExperimentContainer` component and pass the existing component and any of the test variations as items of an array to the `alternatives` prop.

{% hint style="info"%}
If you need to isolate a Sixpack Experiment in code to only run in a particular condition, you will likely need to wrap the `SixpackExperiment` component within a conditional. For example, if you want the LedeBanner template test to run on only a single campaign instead of all campaigns, you may need to include a conditional to check against the Campaign ID or Contentful ID.
{% endhint %}

_notes:_
To override components that contain a React container, the container needs to allow overriding properties by any props that get passed into it.
