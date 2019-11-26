# Electron Example

> 🚨 Electron support is experimental, so the workflow is suboptimal and subject to breaking changes. If you find bugs please report them on [expo/expo-cli](https://github.com/expo/expo-cli/issues) with the `[electron]` tag in the title.

[Electron][electron] is a framework for creating desktop apps that run in a Chromium wrapper. Using Expo with Electron will enable you to use your existing components to build OSX, Windows, and Linux apps.

For more info [check out the latest docs!](https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-electron.md)

### Running

1. Create a new Expo project `expo init`
2. cd into the project and run `yarn add -D @expo/electron-adapter`
3. Now run `yarn expo-electron` to bootstrap the project. You can read more about what this does in the docs: [Using Electron](https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-electron.md).
4. Run `yarn expo-electron start` to start the project.
