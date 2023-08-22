import * as cdk from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { aws_apigateway as apigateway } from 'aws-cdk-lib';
import * as path from 'path';
import { Construct } from 'constructs';
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs';

export class AwsCdkMongodbApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Layers
    const businessLogicLayer = new lambda.LayerVersion(this, 'business-logic-layer', {
      compatibleRuntimes: [
        lambda.Runtime.NODEJS_18_X,
        lambda.Runtime.NODEJS_16_X,
      ],
      code: lambda.Code.fromAsset('src/layers/business-logic'),
      description: 'business-logic will contains database modules etc..',
    });


    const sharedLibrariesLayer = new lambda.LayerVersion(this, 'shared-libraries-layer', {
      compatibleRuntimes: [
        lambda.Runtime.NODEJS_18_X,
        lambda.Runtime.NODEJS_16_X,
      ],
      code: lambda.Code.fromAsset('src/layers/shared-libraries'),
      description: 'Uses a 3rd party libraries for shareing among lambdas functions',
    });


    // Lambdas
    const helloLambda = new lambda.Function(this, 'hello', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('src/lambdas/getUser'),
    });
    const getUserLambda = new lambda.Function(this, 'get-user', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('src/lambdas/getUser'),
      layers: [businessLogicLayer, sharedLibrariesLayer],
    });
    const createUserLambda = new lambda.Function(this, 'create-user', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('src/lambdas/getUser'),
      layers: [businessLogicLayer, sharedLibrariesLayer],
    });

    // Create API Gateway
    const api = new apigateway.RestApi(this, 'myApi', {
      restApiName: 'CDK-MONGODB-API Service',
    });


     // Define /user resource and methods
     const userResource = api.root.addResource('user');
     userResource.addMethod('POST', new apigateway.LambdaIntegration(createUserLambda));
     
     // Define /user/{id} resource and method
     const userIdResource = userResource.addResource('{id}');
     userIdResource.addMethod('GET', new apigateway.LambdaIntegration(getUserLambda));
 
     // Define /hello resource and method
     const helloResource = api.root.addResource('hello');
     helloResource.addMethod('GET', new apigateway.LambdaIntegration(helloLambda));
    
  }
}
