# S3 secure

* An endpoint to set signed cookies for a parameterised host.

* To be used with S3 buckets, CloudFront & Route 53. 
   * Probably use terraform to set them up?

## Request flow
* This endpoint is hosted on https://content.my-host.com
* The S3 objects are in a bucket on https://secure.content.my-host.com
* The cookies are set on the S3 bucket domain
* A request comes from the web client, hits this endpoint, receives signed cookies in the response & then can access protected S3 objects hosted on the relevant domain.

## Next question   
* How to secure access to this endpoint? 

### Method 1
* Authorize the client
* Sign a url to this end point
* Redirect the client to the signed url