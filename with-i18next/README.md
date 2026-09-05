# With-i18next

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  <!-- Web -->
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>

## 📚 Description
This exmaple add a localisation feature to template which enables support for multi-lingual react-native apps.

## 🚀 How to use

### 🛠️ Adding new language
if `examples/with-i18next/constants/languages.json` has your desired language already then

    1. Create a [langauge_code].json file in `constants` folder. e.g. sk.json
    2. Add required keys and its values(translation) to above json.file.
    3. Make sure to add an english fallback key:value in `en.json`
### 🔨 Adding a new key/translation to existing language
    1. If you need to add a new translation in any language, make sure you use a unique key and assign the value to it.
    2. Make sure you add a english translation for same key in `en.json`

## 📝 Notes

Follow instructions at https://www.i18next.com/
