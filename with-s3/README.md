# S3 upload example

An example of uploading images from iOS, Android or web to an [AWS S3 bucket](https://aws.amazon.com/s3/) using [Expo Router](https://docs.expo.dev/router/introduction/) and [EAS Hosting](https://docs.expo.dev/eas/hosting/introduction/).

To upload content to S3 securely, we create an [API route](https://docs.expo.dev/router/reference/api-routes/) which will generate a signed URL which allows the client to upload a file to a specific bucket for a fixed duration. This API route is a **server side function** which will be deployed to EAS Hosting, meaning it is safe to use sensitive environemnt variables such as your S3 bucket credenitals.

https://github.com/user-attachments/assets/64b5470f-2f1c-41d2-ae6b-951eff5b054b

Create a new project with this example:

```sh
npm create expo --example with-s3
```

You may use credentials for an existing s3 bucket, or create a new one.

First, make a copy of `.env.example` in this codebase and rename it to `.env.local`. This file will be gitignored and should never be checked into source control.

The instructions below explain how to create a new bucket, but to use an existing one, fill in the env vars in `.env.local`

Now let's create an S3 bucket. Login to your AWS account and [create a new bucket](https://console.aws.amazon.com/s3/home). Ensure you uncheck "Block all public access".

Open your bucket and under the "Permissions" tab, under "Bucket policy", edit it and add the following (ensure you replace `YOUR-BUCKET-NAME` with your bucket name):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        }
    ]
}
```

Open your `env.local` and add your `AWS_REGION` (e.g. `us-east-1`) and the `AWS_BUCKET_NAME` (e.g. `my-bucket`).

Now we need to create an IAM user that has permission to upload to your S3 buckets.

Login to your AWS account and [create a new bucket](https://console.aws.amazon.com/s3/home). Ensure you uncheck "Block all public access". On your newly created IAM user, click "Create access key". You'll only see these values once: add them to your `env.local` under `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.

To support web uploads and to be able to view the uploaded image, you also need to add the CORS policy. In your bucket, open Permissions -> Cross-origin resource sharing (CORS) and add the following:

```json
[
 {
     "AllowedHeaders": [
         "*"
     ],
     "AllowedMethods": [
         "GET",
         "PUT",
         "POST",
         "DELETE"
     ],
     "AllowedOrigins": [
         "*"
     ],
     "ExposeHeaders": []
 }
]
```

> [!WARNING]
> The above setup for S3 creates a highly permissive policy for testing purposes.
> For production use, ensure you adjust this accordingly to your project requirements.

## Test locally

After completing the above, you should be able to upload images locally on iOS, Android and Web. The API route is running locally at `http://localhost:8081`. When you've confirmed it is working as expected, see the next section about deploying your API routes.

## Deploy to EAS Hosting

Export the web project:

```sh
npx expo export --platform web
```

> [!NOTE]
> If you are looking to implement upload for your iOS and Android projects only, add `--no-ssg` to your export comment. This will create a deployable bundle with only your API routes, without the web UI.

(Optional) upload the env vars to EAS environment variables

```sh
npx eas-cli env:push --environment production
```

> [!NOTE]
> The environment variables will default to "plain text" visibility on the EAS dashboard. You may change the visibility on the UI, but only use plain text or sensitive (secret env vars cannot be used in local deployments).

Deploy the project:

```sh
npx eas-cli deploy --environment production --prod
```

> [!NOTE]
> The `--environment production` will use environment variables uploaded earlier. Omitting this flag will use env vars in your local `.env` or `.env.local`
> The `--prod` flag will promote the deployment to production, so it will be accessible under `https://you-chosen-name.expo.app`
