# GraphQL example

This is an example of setting up a graphQL server in an Expo Router [API route](https://docs.expo.dev/router/reference/api-routes/) and using it in the app and web code. The example also includes automatic type generation powered by [gql.tada](https://gql-tada.0no.co/).

**Deployed demo:** https://with-graphql.expo.app/

<img width="1099" height="416" alt="Screenshot 2025-07-24 at 12 00 05" src="https://github.com/user-attachments/assets/fe2a8d94-30db-45f4-bb22-9a7457c1dbf9" />

## Launch your own

[![Launch with Expo](https://github.com/expo/examples/blob/master/.gh-assets/launch.svg?raw=true)](https://launch.expo.dev/?github=https://github.com/expo/examples/tree/master/with-graphql)

## Tools used

- [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) - graphQL server
- [URQL](https://github.com/urql-graphql/urql) - graphQL client ([Apollo Client](https://www.apollographql.com/docs/react) can also be used if preferred)
- [gql.tada](https://gql-tada.0no.co/) - for type generation
- [Expo Router API Route](https://docs.expo.dev/router/reference/api-routes/) - for server-side code
- [EAS Hosting](https://docs.expo.dev/eas/hosting/introduction/) - for API & web deployments

## Notable files

- `src/app/api/graphql+api.ts` - this is your graphQL endpoint. It exports a function called `POST`, so all calls to `POST /graphql` will execute this function
- `src/schema.graphql` - your GraphQL schema. It is generated based on the schema in `POST /graphql`. After making changes to the schema, run `npm run sync:schema` to update it
- `src/server` - this is a folder for your server code. With file-based routing, any file in the `/app` folder will become a screen or a route in your app, so this is handy for storing utilities and other necessities for your server code
- `.vscode/settings.json` - enables automatic type generation in [VSCode](https://gql-tada.0no.co/get-started/installation#vscode-setup)
- `src/graphql-env.d.ts` - these are your types, auto-generated based on the queries (change the query in `src/queries.ts` to see it change). This file will get automatically updated as you change your queries, but you can also update it manually with `npm run sync:types`

## Using this example

Create a new project with this example:

```sh
npx create-expo-app --example with-graphql
```

And then `npx expo start` to run it locally (scan the QR code, or `w` to open web, `a` to open android, `i` to open iOS).

## Updating GraphQL code

After making a change in `src/app/api/graphql+api.ts` (e.g. adding a new resolver), refetch the schema with:

```sh
npm run sync:schema
```

> [!NOTE]
> The API must be running at `npx expo start` when running that script, so that the introspection query can call the GraphQL endpoint.

Now add a query anywhere in the `src` folder (the `src/queries.ts` file is a convenience, but not necessary).

If you're using VSCode, Cursor or other editing tool, the `src/graphql-env.d.ts` file should update automatically based on the query you updated. If you're not using an editor or want to run the type generation manually, run:

```sh
npm run sync:types
```

## Deploying this example

See a deployed version of this example at https://with-graphql.expo.app.

To deploy the API only (for use in your iOS and Android apps and without the web UI), export the API bundle:

```sh
npx expo export --platform web --no-ssg
```

Deploy to EAS Hosting:

```sh
npx eas-cli deploy --prod
```

This will print out a production URL, like `https://your-chosen-name.expo.app`: your API will be available from `https://your-chosen-name.expo.app/api/graphql`.

To test the deployed API in your local project, copy `.env.example` into `.env.local` and add

```
EXPO_PUBLIC_API_URL=https://your-chosen-name.expo.app
```

To deploy the API including the web UI, export without the `no-ssg` flag:

```sh
npx expo export --platform web
npx eas-cli deploy --prod
```

| iOS                                                                                                                                                            | Android                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="353" height="823" alt="Screenshot 2025-07-24 at 13 42 28" src="https://github.com/user-attachments/assets/e3ab0506-6335-45bb-93f5-6a2695578a0e" /> | <img width="425" height="772" alt="Screenshot 2025-07-24 at 13 42 48" src="https://github.com/user-attachments/assets/2eb29087-635a-44a3-9cdd-667e641757df" /> |
