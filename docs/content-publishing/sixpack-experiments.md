# Sixpack Experiments

## Getting Started With Sixpack

### What’s an A/B test?

An A/B test is a type of user testing where we present one of two different variants of a page, button, paragraph, etc and use statistical analysis to determine which one performs better for a given goal.  For instance, we might offer two colors for a Sign-Up button and record which button has a higher click rate.

### What's Sixpack?

We use an open-source software package called Sixpack to run A/B tests on the Phoenix platform. It previously required engineering to write and deploy code to run any test, but now most content tests are available in Contentful, able to run tests on blocks without any engineering input whatsoever.

Experiments live on their own dashboard, at [experiments.dosomething.org](http://experiments.dosomething.org). The dashboard displays all currently active Sixpack experiments running across the organization. Each experiment includes a number of “alternatives”, which are the variants being tested. Each user that enters into a test is assigned an alternative and then their conversion is credited to that alternative.

After enough data is collected to be determined statistically significant, Sixpack will deem a winner within a certain confidence window. Usually, we look for a 95%+ confidence interval, which translates to a 95%+ likelihood that our results are not due to random chance. Depending on the amount of traffic, an A/B test could be completed in as short as a day, or longer than a week.

