# Expo example of uploading an image to S3

This shows an example of how using EAS Hosting to create a signed URL to upload an image to an S3 bucket directly from your device.

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

> [!IMPORTANT]
> Keep your `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` safe, never check them into `.git` or use them in frontend code.


## Deploy to EAS Hosting

Export the API routes:

```sh
npx expo export --platform web --no-ssg
```

> [!NOTE]
> The `--no-ssg` flag will export the API routes only. Omit this flag if you also want to deploy the web UI

(Optional) upload the env vars to EAS environment variables

```sh
npx eas-cli env:push --environment production
```

> [!NOTE]
> The env vars will default to "plain text" visibility on the EAS dashboard. You may change the visibility on the UI, but only use plain text or sensitive (secret env vars cannot be used in local deployments).

Deploy the project:

```sh
npx eas-cli deploy --environment production --prod
```

> [!NOTE]
> The `--environment production` will use environment variables uploaded earlier. Omitting this flag will use env vars in your local `.env` or `.env.local`
> The `--prod` flag will promote the deployment to production, so it will be accessible under `https://you-chosen-name.expo.app`
