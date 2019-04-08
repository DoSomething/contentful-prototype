# Metadata

All pages and campaigns on DoSomething.org contain a **Metadata** field that references a [`Metadata` content type](https://app.contentful.com/spaces/81iqaqpfd8fy/content_types/metadata/fields). This content type allows an editor to provide data for the page to help with SEO and sharing the content on social platforms.

![Example Facebook Share With Metadata](../../.gitbook/assets/facebook-share-example.png)

By creating a custom **Metadata** content type for a page and filling out the fields, the platform will extract this information and add it as `<meta>` tags to the HTML for the page.

Technically, the platform is setup to automatically attempt to extract default data from the page to populate the `<meta>` tags if no **Metadata** content type is referenced, however by creating and referencing a custom **Metadata** content type for the page, it will override these defaults and customize the visual preview social platforms generate for the page.

It is recommended for editors to add a custom **Metadata** for pages so that they can provide more customized SEO friendly copy and better preview image when a preview link is rendered on other platforms like Facebook and Twitter, etc.

## Content Type Fields

- **Internal Title**: This is for our internal Contentful organization and will be how the block shows up in search results, etc. It should include the Year-Month and the title of the page to help find this content in the system.
- **Title**: This will be displayed as the headline when embedded and previewed on other sites.
- **Description**: This field will most often be styled as smaller text underneath the title. Mozilla and other experts recommend for this to be about 160 characters.
- **Image**: This image will be displayed alongside the title and description. Implementation differs from site to site, please see the attached image for guidance. The default size should be 1200px x 1200px with centered content.

{% hint style="info" %}
If there is no metadata image provided, the platform falls back to the Campaign or Page cover photo. If there is no cover photo provided for the Campaign or Page, the platform will fall back to the DS logo in a black square for the preview link image.
{% endhint %}

The recommended size for a metadata preview image is **1200px x 1200px** with the focus placed in the center. Some platforms like Pinterest, Reddit and Slack will use a full square photo when rendering a preview link image, but Facebook and Twitter will create a landscape cropped version out from the center:

![Metadata Photo Crop Preview](../../.gitbook/assets/metadata-photo-preview.png)
