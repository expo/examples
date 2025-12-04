# Starter Template with Convex

This is a minimal starter template using [Convex](https://docs.convex.dev/quickstart/react-native).

## Launch your own

[![Launch with Expo](https://github.com/expo/examples/blob/master/.gh-assets/launch.svg?raw=true)](https://launch.expo.dev/?github=https://github.com/expo/examples/tree/master/with-convex)

It includes the following a simple list of products that update in real-time. It works on Android, iOS and Web.

## Getting Started

1. Create a new project using this template:

   ```sh
   npx create-expo-app --example with-convex
   yarn create expo-app --example with-convex
   pnpm create expo-app --example with-convex
   bun create expo-app --example with-convex
   ```

## Running the app

- Install the dependencies:

  ```sh
  npx expo install
  ```

- Set up a [Convex dev deployment](https://docs.convex.dev/quickstart/react-native):

  ```sh
  npx convex dev
  ```

  This will prompt you to log in with GitHub, create a project, and save your production and deployment URLs.

  It will also create a `.env.local` file with neccessary env variables and a `convex/` folder for you to write your backend API functions in. The dev command will then continue running to sync your functions with your dev deployment in the cloud.

- Add sample products to your database

  ```sh
  npx convex import --table tasks sampleData.jsonl
  ```

- Add convex queries

  Create a new file named `products.ts` in the generated `convex/` folder and paste the following code:

  ```ts
  import { query, mutation } from "./_generated/server";
  import { v } from "convex/values";

  export const getProducts = query({
    args: {},
    handler: async (ctx) => {
      return await ctx.db.query("products").collect();
    },
  });

  export const purchase = mutation({
    args: { id: v.id("products") },
    handler: async (ctx, args) => {
      const product = await ctx.db.get(args.id);
      if (!product || product.quantity <= 0) return;
      await ctx.db.patch(args.id, { quantity: product.quantity - 1 });
    },
  });
  ```

  Feel free to add more queries and mutations. Learn more about [queries with Convex](https://docs.convex.dev/functions/query-functions)

- Start the development server:

  ```sh
  npx expo start
  ```

- In the terminal running the development server, press `i` to open the iOS simulator, `a` to open the Android device or emulator, or `w` to open the web browser.

## Resources

- [Convex React Native documentation](https://docs.convex.dev/quickstart/react-native)
- [Expo documentation](https://docs.expo.dev/)
