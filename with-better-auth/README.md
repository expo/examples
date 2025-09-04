# Better Auth Example

<p>
  <!-- iOS -->
  <a href="https://itunes.apple.com/app/apple-store/id982107779">
    <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  </a>
  <!-- Android -->
  <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample">
    <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  </a>
  <!-- Web -->
  <a href="https://docs.expo.dev/workflow/web/">
    <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
  </a>
</p>

This example integrates sign-in with email using Better Auth. It uses Prisma SQLite for development, but we recommend using a deployed database. You can learn more about the databases supported by Better Auth in the [Databases](https://www.better-auth.com/docs/concepts/database) docs.

## Launch your own

[![Launch with Expo](https://github.com/expo/examples/blob/master/.gh-assets/launch.svg?raw=true)](https://launch.expo.dev/?github=https://github.com/expo/examples/tree/master/with-better-auth)

## 🚀 How to use

Run the following command:

```bash
npx create-expo -e with-better-auth
```

Run prisma generate

```bash
npx prisma generate
```

Start the server

```bash
npx expo start
```

That's it!

## 🗃️ Migrations

- Run `npx @better-auth/cli generate` to update the `schema.prisma` file with the tables needed by Better Auth.
- Then run the Prisma CLI generate command: `npx prisma generate`
- Finally, run the migration: `npx prisma migrate dev`

After running the above, you'll have a local SQLite database and a `migrations` folder. You can learn more about the databases supported by Better Auth in the [Databases](https://www.better-auth.com/docs/concepts/database) docs.
