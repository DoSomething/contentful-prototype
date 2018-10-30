# Dynamic Link Tokens

You can use select _tokens_ in the specified URL within certain Content Types' **Link** field to substitute dynamic information. These tokens will be replaced with actual values.

The following tokens are available for use in the `link` field:

- `{campaignId}`: will be replaced with the campaign ID.
- `{campaignRunId}`: will be replaced with the campaign run ID.
- `{userId}`: will be replaced with the user's Northstar ID.
- `{source}`: will be replaced with the value of the `utm_source` parameter in the pages URL (e.g. `https://dosomething.org?utm_source=sms` would cause `{source}` to be replaced with `sms`). If no `utm_source` parameter is set, the value defaults to `web`.

This functionality applies to the following Content Types:

- [**Link Action**](./actions/link-action.md)
- [**Voter Registration Action**](./actions/voter-registration-action.md)

### Examples:

If you enter the following URL string into the `link` field:

```http
http://example.com?userId={userId}&campaign={campaignId}&source={source}
```

The resulting URL for the rendered link on the page will be:

```http
http://example.com?userId=551a2b3c4d5e6f7g8h9i0j1k2&campaign=1234&source=web
```

If the Pages URL contains a `utm_source=sms` parameter, the resulting URL for the rendered link would be:

```http
http://example.com?userId=551a2b3c4d5e6f7g8h9i0j1k2&campaign=1234&source=sms
```

As another example, if you enter the following URL string into the `link` field:

```http
https://turbonotes.xyz/?r=user:{userId},campaign:{campaignId},source:{source}
```

The resulting URL for the rendered link on the page will be:

```http
https://turbonotes.xyz/?r=user:551a2b3c4d5e6f7g8h9i0j1k2,campaign:1234,source:web
```

If the Pages URL contains a `utm_source=sms` parameter, the resulting URL for the rendered link would be:

```http
https://turbonotes.xyz/?r=user:551a2b3c4d5e6f7g8h9i0j1k2,campaign:1234,source:sms
```
