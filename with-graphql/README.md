# GraphQL example

An example of using a graphQL API in your Expo Router project.

- create a graphQL api in your React Native codebase as an [API route](https://docs.expo.dev/router/reference/api-routes/)
- automatic type generation with [gql.tada](https://gql-tada.0no.co/)
- use the API in your frontend code
- deploy it to EAS Hosting (for production use in your React Native app, website or both)

## What's in this codebase

- `src/app/api/graphql+api.ts` - this is your graphQL endpoint. It exports a function called `POST`, so all calls to `POST /graphql` will execute this function
- `src/schema.graphql` - this is your graphQL schema. It is generated based on the schema in `POST /graphql`. After making changed to the schema, run `npm run sync:schema` to update it
- `src/server` - this is a folder for your server code. With file-based routing, any file in the `/app` folder will become a screen or a route in your app, so this is handy for storing utilities and other necessities for your server code
- `.vscode/settings.json` - enables automatic type generation in [VSCode](https://gql-tada.0no.co/get-started/installation#vscode-setup)
- `src/graphql-env.d.ts` - these are your types, autogenerate based on the queries (change the query in `src/queries.ts` to see it change). This file will get automatically updated as you change your queries, but you can also update it manually with `npm run sync:types`
