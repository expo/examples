# Remote Build Cache Provider Example

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
</p>

Example demonstrating how to create a custom build cache provider for Expo CLI. Uses GitHub to store builds.

## 🚀 How to use

1. **Create a GitHub Personal Access Token** with **repo** permissions:

   - Go to [GitHub Settings › Developer settings › Personal access tokens](https://github.com/settings/tokens).
   - Click **Generate new token**, select the **repo** scope, and copy the token.
   - Set it in your shell:
     ```bash
     export GITHUB_TOKEN=YOUR_TOKEN_HERE
     ```

2. **Configure your Expo project**:

   - Open `app.json`.
   - Update the `remoteBuildCache` block under the `expo` key:
     ```json
     {
       "expo": {
         "remoteBuildCache": {
           "provider": "./buildCacheProviderPlugin.js",
           "options": {
             "owner": "<YOUR_GITHUB_USERNAME>",
             "repo": "<YOUR_REPO_NAME>"
           }
         }
       }
     }
     ```
   - Replace `<YOUR_GITHUB_USERNAME>` and `<YOUR_REPO_NAME>` with your details.

3. Run `yarn` or `npm install`

4. Run `yarn start` or `npm run start` to try it out.

> **Tip:** If you’d rather not create prereleases in your main repository, point `repo` to a separate GitHub project or private repo and update the `repo` option in `remoteBuildCache`.
