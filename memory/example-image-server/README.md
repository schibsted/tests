# Example image server

This HTTP server will generate square images (either in PNG or SVG format) for a given string and
size in pixels. To run it on localhost on port 8111, just do

```bash
npm install
npm start
```

## API

### GET /png/:identifier/:size

Example: `GET /png/alice/200` will return a PNG image of size 200x200 for the string 'alice'.

### GET /svg/:identifier/:size

Example: `GET /svg/alice/200` will return a SVG image of size 200x200 for the string 'alice'.
