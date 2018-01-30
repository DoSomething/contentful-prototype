# Routing
***

Since Phoenix (next) is working alongside Phoenix Ashes (the legacy portion of our website), there are some magical routing configurations
to ensure that user traffic is being directed to its proper place (with some requests being directed the legacy application, and the others to 
shiny new Phoenix (next)).

Therefore, any routing additions you might want to make need to be coordinated with the Devops team. Otherwise traffic to said route will be 
directed to the legacy Drupal site by default.

You can hop into the #devops channel on Slack to get in touch with the relavent parties.


## Tips
- Any route nested under `/next` is configured to be directed to Phoenix (next). (e.g. `/next/this-cool-route` is ready for takeoff, no extra work needed).

