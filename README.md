# strapi-upload-minio

This is unofficial plugin for minio servers. It is not production-ready\! Use on your own risk\!


```cd plugins/upload```

```npm install --save strapi-upload-minio-unofficial```

start your strapi application and go to: plugins => files upload settings

from the providers list select **Minio Server**

fill in:
  - access token
  - secret token
  - endpoint (ex: storage.example.com:9000) (skip :9000 if using ports 80 & 443)
  - bucket (must exist on your minio server)
  
NOTE: bucket policy must be set to allow your file to be readable. (just set it to: prefix \*, readonly)

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
