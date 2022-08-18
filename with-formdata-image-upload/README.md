# Image Upload Example

### Running the app

- Run `yarn` or `npm install`
- Run `yarn start` or `npm run start` to try it out.

### Running the server

- By default, the app will use a server that is already deployed in order to upload the image to S3. If you want to deploy your own, follow the steps in the [backend directory](https://github.com/expo/examples/tree/master/with-formdata-image-upload/backend).

## The idea behind the example

A common requirement for apps is to be able to upload an image to a server. This example shows how you can use `ImagePicker` to snap a photo or grab it from your camera roll, then use `FormData` with `fetch` to upload it to a server. The `/backend` demonstrates a simple Node app that uploads an image to S3. The `/` directory contains the Expo app that sends the image to that backend.
