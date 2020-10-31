This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

You will need to have installed the AWS CLI and have a configured an `~/.aws/credentials` file.

You will need to create a bucket on S3 (replace `UNIQUE_NAME_FOR_BUCKET` with a globally unique name for the s3 bucket):

```
aws s3api create-bucket --bucket UNIQUE_NAME_FOR_BUCKET --region us-east-1
```

Set the CORS policy of the bucket to allow websites on `localhost:3000` to load resources in the bucket:

```
aws s3api put-bucket-cors --bucket UNIQUE_NAME_FOR_BUCKET --cors-configuration file://cors.json
```

Edit pages/api/upload.js and edit the `BUCKET` variable to match the name of the bucket you created

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
