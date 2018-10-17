# Routing

Since Phoenix is working alongside Ashes \(the legacy portion of our website\), there are some magical routing configurations to ensure that user traffic is being directed to its proper place \(with some requests being directed the legacy application, and the others to shiny new Phoenix).

New routes will default to Phoenix, with [a few exceptions](https://github.com/DoSomething/infrastructure/blob/master/dosomething/fastly-frontend/ashes_recv.vcl) to keep the old website functioning. You **do not** need to explicitly whitelist new routes or URLs in Fastly when developing a new feature or adding content.
