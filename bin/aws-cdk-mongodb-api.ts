#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsCdkMongodbApiStack } from '../lib/aws-cdk-mongodb-api-stack';

const app = new cdk.App();
new AwsCdkMongodbApiStack(app, 'AwsCdkMongodbApiStack', {
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION 
  },
});