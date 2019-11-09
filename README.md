# Places

This project was bootstrapped with the [Vue cli](https://cli.vuejs.org).

## Project setup
1.  Clone or fork this repo.
1.  Get a google [places api key](https://developers.google.com/places/web-service/get-api-key).
1.  Create a `.env` or `.env.local` file in the cloned root directory.
1.  Set VUE_APP_MAPS_API_KEY=yourApiKey;
    Your .env file should look something like this:
    ```
    VUE_APP_MAPS_API_KEY=101010101010101010101010101
    ```
1.  Run `yarn install` or `npm install` inside the directory.
1.  Then run `yarn serve` or `npm run serve` and open a browser to `localhost:8080`

### To Compile and minify for production
```
yarn build
```

### Dev Server Proxy
Note the contents of the `vue.config.js` file in the root directory.
```
...
devServer: {
  proxy: 'https://maps.googleapis.com/maps/api/place',
},
```
Behind the scenes, webpack is running a small express server that serves and hot-reloads your Vue app as you build it.

By default the browser will gives cors errors for requests to urls other than `localhost:8080`.

Setting a proxy to `https://maps.googleapis.com/maps/api/place` passes requests to that url through the 'backend' express server.

For more information see the related [Vue](https://cli.vuejs.org/config/#devserver) and [Webpack](https://github.com/webpack/docs/wiki/webpack-dev-server) docs.
