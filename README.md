# Vuex Workshop

This is the base application for the Vuex Workshop. 

[slides](http://slides.com/blakenewman/vuex-workshop?token=iPiqjTvC)

## Structure

``` bash
.
├── config/                     # config files
│   └── ...
├── dist/                       # compiled files
│   └── ...
├── server/                     # server files
│   ├── api.js                  # api
│   ├── dev.js                  # dev server
│   └── index.js                # server entry point
├── src/
│   ├── api/                    # API services (Axios)
│   │   └── ...
│   ├── components/             # UI Components
│   │   └── ...
│   ├── entry/                  # bundle entries
│   │   ├── client.js           # client entry point
│   │   ├── app.js              # shared app entry point for server and client
│   │   └── server.js           # server server entry point
│   ├── router/                 # routing (maps and route components)
│   │   └── index.js            # router entry point
│   └── store/                  # store (Vuex state)
│   │   ├── module/             # store modules (state, actions and mutations)
│   │   │   └── ...
│   │   └── index.js            # store entry point
│   └── views/                  # UI Views
│       └── ...
├── static/                     # pure static assets
├── .babelrc                    # babel config
├── .editorconfig.js            # editor config
├── .eslintrc.js                # eslint config
├── .stylelintrc.js             # stylelint config
├── prettierc.config.js         # prettier config
└── package.json                # build scripts and dependencies
```

## Commands

+ Starts a Node.js local development server 
  + `yarn dev`
  + `npm run dev`
+ Builds server bundle for SSR and client
  + `yarn build`
  + `npm run build`
+ Starts a Node.js server in production 
  + `yarn start`
  + `npm start`
+ Run all linters (autofixing)
  + `yarn lint`
  + `npm lint`

## API 

### `/api/product/list`

#### Retrieve products [GET]

+ Response 200 (application/json)
  + Body
    ```json
      { 
        "payload": [
          {
            "id": 1,
            "sku": "...",
            "title": "...",
            "desc": "...",
            "image": "...",
            "stocked": "....",
            "basePrice": 13.72,
            "price": 6.31
          },
          {
            "id": 2,
            "sku": "...",
            "title": "...",
            "desc": "...",
            "image": "...",
            "stocked": "....",
            "basePrice": 13.72,
            "price": 6.31
          }
        ]
      }
    ```


### `/api/product/:id`

#### Retrieve product by id [GET]

+ Response 200 (application/json)
  + Body
    ```json
      { 
        "payload": [
          {
            "id": 1,
            "sku": "...",
            "title": "...",
            "desc": "...",
            "image": "...",
            "stocked": "....",
            "basePrice": 13.72,
            "price": 6.31
          }
        ]
      }
    ```

### `/api/basket`

#### Retrieve basket [GET]

Note if there is > 4 products in the basket then it will respond with 500 error

+ Response 200 (application/json)
  + Body
    ```json
      { 
        "payload": [
          {
            "id": 32,
            "quantity": 2
          }
        ]
      }
    ```

+ Response 500 (application/json)
  + Body
    ```json
      { 
        "error": {
          "message": "Server error"
        }
      }
    ```

#### Delete basket [DELETE]

+ Response 200 (application/json)
  + Body
    ```json
      {
        "payload": []
      }
    ```

### `/api/basket/product/:id`

#### Add product to basket [POST]

+ Request (application/json)
  ``` json
    {
      "quantity": "1"
    }
  ```

+ Response 200 (application/json)
  + Body
    ``` json
      { 
        "payload": [
          {
            "id": 32,
            "quantity": 2
          }
        ]
      }
    ```

#### Update product in basket [PATCH]

+ Request (application/json)
  ``` json
    {
      "quantity": "4"
    }
  ```

+ Response 200 (application/json)
  + Body
    ``` json
      { 
        "payload": [
          {
            "id": 32,
            "quantity": 4
          }
        ]
      }
    ```

#### Delete product in basket [DELETE]

+ Response 200 (application/json)
  + Body
    ``` json
      { 
        "payload": []
      }
    ```
