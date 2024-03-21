import { Stack, StackProps, Duration, CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import cdk = require('@aws-cdk/core');
import * as ssm from "aws-cdk-lib/aws-ssm";
import * as s3 from "aws-cdk-lib/aws-s3";

export class TestAlertStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const provider = new iam.OpenIdConnectProvider(this, "Provider", {
      url: "https://token.actions.githubusercontent.com",
      clientIds: ["sts.amazonaws.com"],
    });

    const s3bucket = new s3.Bucket(this, "S3bucket", {
    })
    
    const policy = new iam.Policy(this, "policy", {

      policyName: "AmazonS3FullAccess",
      statements: [
        new iam.PolicyStatement({
          actions: ["s3:GetObject","s3:PutObject"],
          resources: [s3bucket.bucketArn]
        })
      ]
    })
    /// create iam user
    const user = new iam.User(this, 'iam_user', {
      userName: 'User-For-S3PreSignUrl'
    })
    const accessKey = new iam.CfnAccessKey(this, 'CfnAccessKey',{
      userName: user.userName,
    })
    policy.attachToUser(user);
 
    
    // qweqweqw
  //  qweqwe 
    // create ssm parameter for AccessKey
    new ssm.StringParameter(this, 'AccessKeyForUser', {
      description: "This param is the AccessKey for User Send messages",
      parameterName: "/Output/User/AccessKey",
      stringValue: accessKey.ref,
      tier: ssm.ParameterTier.STANDARD,
    })

    // Create ssm parameter for SecretAccessKey
    new ssm.StringParameter(this, 'SecretAccessKeyForUser', {
      description: "This param is the SecretAccessKey for User Send messages",
      parameterName: "/Output/User/SecretAccessKey",
      stringValue: accessKey.attrSecretAccessKey,
      tier: ssm.ParameterTier.STANDARD,
    });

    const role = new iam.Role(this, "DeployRole", {
      roleName: "DeployRole",
      maxSessionDuration: Duration.hours(2),
      assumedBy: new iam.WebIdentityPrincipal(
        provider.openIdConnectProviderArn,
        {
          StringEquals: {
            "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          },
          StringLike: {
            "token.actions.githubusercontent.com:sub": "repo:tranphuoctuan/test-alert:*",
          },
        }
      ),
    });
    role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess")
    );
  }
}


