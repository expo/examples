# Electron Example

<p>
  <!-- Web -->
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>

> 🚨 Electron support is an experimental community project, so the workflow is suboptimal and subject to breaking changes. If you find bugs please report them on [expo/expo-electron-adapter](https://github.com/expo/expo-electron-adapter/issues).

[Electron][electron] is a framework for creating desktop apps that run in a Chromium wrapper. Using Expo with Electron will enable you to use your existing components to build OSX, Windows, and Linux apps.

For more info [check out the latest docs!](https://github.com/expo/expo/blob/master/docs/pages/guides/using-electron.md)

```sh
npx create-react-native-app -t with-electron
```

## 🚀 How to use

- Run `yarn` or `npm install`
- Run `yarn expo-electron start`
- Wait until the web build is finished and Electron is started.

## 📝 Notes

- [Known issue with app entry](https://github.com/expo/expo-cli/issues/1385)
- [Background on 'require not defined' error](https://github.com/electron/electron-quick-start/issues/463#issuecomment-869219170). If needed, this fix can be applied after running `yarn expo-electron customize` to allow customization of additional electron files.

[electron]: https://www.electronjs.org/
