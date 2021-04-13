# nodeExpressReactBootstrapPagination

A simple example connecting node + express + react with bootstrap and fake pagination

Node+Express runs on http://localhost:3001
React dev server runs http://localhost:3000

## Run it

Clone it, then

```
yarn install
cd front
yarn install
yarn build
cd ..
yarn start
```

And check your http://localhost:3001

## Alternative

For development start the two servers

```
yarn install
yarn nodemon
```

And the backend will run on http://localhost:3001

```
cd front
yarn install
yarn start
```

And the frontend will run on http://localhost:3001

## Deploying in heroku

1. Create a free account on heroku
2. [Install the heroku CLI and set it up](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
3. Clone this repo
4. (Once) Create a heroku app

```
heroku create my-app-name
```

5. (Everytime you deploy) Deploy

```
heroku push heroku main
```

This step will generate the react build because of the build script in the package.json:

```js
  "scripts": {
    ...
    "build": "cd front && yarn install && yarn run build"
  },
```
