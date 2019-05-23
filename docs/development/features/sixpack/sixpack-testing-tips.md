# Testing Tips

When testing to confirm that an experiment is set up properly, you can **force** a specific test alternative by passing a URL parameter in the URL:

```text
http://example.com?sixpack-force-experiment_name=name_of_alternative_to_show
```

The forced alternative will not end up sending any data to Sixpack, so it will not affect the conversion!

@TODO Block vs No Block
