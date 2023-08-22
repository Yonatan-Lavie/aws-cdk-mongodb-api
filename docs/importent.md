DevCluster: https://cloud.mongodb.com/v2/64e45977f7c2c24c48601ff8#/overview
Connection Strings - connection strings in GitHub as secrets for use in GitHub Actions, and localy as a .env file

ProdCluster: https://cloud.mongodb.com/v2/64e45ba25cbc605c51709476#/overview
Connection Strings - connection strings in GitHub as secrets for use in GitHub Actions, and localy as a .env file

dev env:

- create IAM user named aws-cdk-dev
- attach IAM policie named AdministratorAccess
- create IAM policy named `Dev-Environment-Policy`
- you can checkout the Policy description and the json file in the policies directory
- Attach the `Dev-Environment-Policy` to `aws-cdk-dev` IAM User
- Enable Programmatic Access
  - Create Access Key: Navigate to the "Security credentials" Click the "Create access key" button. This will generate a new Access Key ID and Secret Access Key.
  - Since you're planning to use these keys for CI/CD operations through GitHub Actions, the most appropriate use case would be "Third-party service"
  - create and download the .csv file, Make sure to save these securely, as you won't be able to view the Secret Access Key again.
- Store in GitHub Secrets Access key as `AWS_DEV_ACCESS_KEY` and Secret access key as `AWS_DEV_SECRET_ACCESS_KEY`
- create a new AWS profile in VSCode allows you to easily switch between different AWS environments or accounts.
  - terminal `aws configure --profile aws-cdk-dev-profile`
  - You'll be prompted to enter your Access Key ID, Secret Access Key, default region, and output format.
  - switch to the new profile

dev prod:

- create IAM user named aws-cdk-prod
- create IAM policy named `Prod-Environment-Policy`
- you can checkout the Policy description and the json file in the policies directory
- Attach the `Prod-Environment-Policy` to `aws-cdk-prod` IAM User
- Enable Programmatic Access
  - Create Access Key: Navigate to the "Security credentials" Click the "Create access key" button. This will generate a new Access Key ID and Secret Access Key.
  - Since you're planning to use these keys for CI/CD operations through GitHub Actions, the most appropriate use case would be "Third-party service"
  - create and download the .csv file, Make sure to save these securely, as you won't be able to view the Secret Access Key again.
- Store in GitHub Secrets Access key as `AWS_PROD_ACCESS_KEY` and Secret access key as `AWS_PROD_SECRET_ACCESS_KEY`
- create a new AWS profile in VSCode allows you to easily switch between different AWS environments or accounts.
  - terminal `aws configure --profile aws-cdk-prod-profile`
  - You'll be prompted to enter your Access Key ID, Secret Access Key, default region, and output format.
  - switch to the new profile
