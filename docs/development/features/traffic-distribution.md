# Traffic Distribution

Sometimes we'll have a feature that we only want to expose to a portion of our traffic. (E.G. a Survey feature, which we'd only like 5 percent of our users to see.)

We have an available wrapper component we use to set this up. It's aptly named the `TrafficDistribution` component! (Genius).

It's a pretty simple and straightforward component. It'll accept a percentage number as well as the feature name as `prop`s, and then make the calculation as to whether to expose or hide the wrapped feature. It will also store the result in localstorage to ensure a level of consistency across visits to the site.

## Usage Instructions

Let's use our Survey example.

If we only want to expose this Survey to 5 percent of traffic:

```jsx
<TrafficDistribution percentage={5} feature="survey_feature">
  <Survey />
</TrafficDistribution>
```

And viola! 

