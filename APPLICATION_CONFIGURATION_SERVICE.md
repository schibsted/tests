# Application configuration service

This is something we’ve made for Omni, and we’d like to see how you’d do it. Your task is to build an API for a microservice where…

* … an administrator can store a `key` and a `value` pair for a given `client` and `version`.
* … a client can get all changed `key` and `value` pairs since a given revision for a given `client` and `version`.

We expect that you spend in the order of ~3 hours and write ~200 lines of code. Beautiful, maintainable code. We're almost pedantic about it, and we hope you are, too! Please tend to it with the care that you would for production code, and if there's something that you'd have liked to do but didn't have time for then please put it in the README so we can give you some credit for it anyway.

When you're finished, please put the code on GitHub or send it to us.

## Specification

The API should conform to the following [Swagger](http://swagger.io/) specification:

```yml
paths:
  /config/{client}/{version}:
    get:
      description: Get all changed configurations since the last received change for a given client and version
      parameters:
        - name: client
          in: path
          type: string
          required: true
          description: Identifier for the client (e.g. "ios-m-omni")
        - name: version
          in: path
          type: string
          required: true
          description: Build version of the client (e.g. "267")
        - name: If-None-Match
          in: header
          type: string
          required: false
          description: The ETag of the last acquired configuration (e.g. W/"1")
      responses:
        304:
          description: No changed fields
        200:
          description: An object with changes since the given ETag
          schema:
            type: object
            example: '{ "ads_endpoint": "/devads" }'
    /config:
      post:
        description: Change or create a configuration
        parameters:
          - name: body
            in: body
            required: true
            schema:
              required:
                - client
                - version
                - key
                - value
              properties:
                client:
                  type: string
                version:
                  type: string
                key:
                  type: string
                value:
                  type: string
```

## Examples

```http
HTTP/1.1 POST /config
{ "client": "ios", "version": "267", "key": "ads_endpoint", "value": "/devads" }

HTTP1/1.1 201 Created
```

```http
HTTP/1.1 GET /config/ios/267

HTTP/1.1 200 OK
ETag: W/"1"
{ "ads_endpoint": "/devads" }
```

```http
HTTP/1.1 GET /config/ios/267
If-None-Match: W/"1"

HTTP/1.1 304 Not Modified
```

```http
HTTP/1.1 GET /config/ios/266

HTTP/1.1 304 Not Modified
```

```http
HTTP/1.1 GET /config/ios/268

HTTP/1.1 304 Not Modified
```

```http
HTTP/1.1 GET /config/android/267

HTTP/1.1 304 Not Modified
```

```http
HTTP/1.1 POST /config
{ "client": "ios", "version": "267", "key": "background_color", "value": "#000" }

HTTP/1.1 201 Created
```

```http
HTTP/1.1 GET /config/ios/267

HTTP/1.1 200 OK
Etag: W/"2"
{ "ads_endpoint": "/devads", "background_color": "#000" }
```

```http
HTTP/1.1 GET /config/ios/267
If-None-Match: W/"1"

HTTP/1.1 200 OK
ETag: W/"2"
{ "background_color": "#000" }
```

```http
HTTP/1.1 GET /config/ios/267
If-None-Match: W/"2"

HTTP/1.1 304 Not Modified
```

## Questions?

Feel free to [ask](mailto:johannes.gorset@schibsted.com,andreas.hultgren@schibsted.se)!
