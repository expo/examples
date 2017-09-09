## Run this locally

1. Rename `.env.example` to `.env`

2. Fill in your AWS credentials in `.env`

3. `npm start`

4. Update the `apiUrl` in `frontend` to point to the server.

## Deploy this with [now.sh](https://zeit.co/now/):

1. Add your AWS credentials to now

  ```
  now secret add aws-access-key-id your-access-key-id-here
  now secret add aws-secret-access-key your-secret-access-key
  now secret add aws-bucket your-bucket-name-here
  ```

2. Deploy

  ```
  now . \
    -e AWS_ACCESS_KEY_ID=@aws-access-key-id \
    -e AWS_SECRET_ACCESS_KEY=@aws-secret-access-key \
    -e AWS_BUCKET=@aws-bucket \
    -e NODE_ENV=production
  ```

3. Update the `apiUrl` in `frontend` to point to your deploy.
