import { Stack, StackProps, Duration } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3"

export class TestAlertStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const provider = new iam.OpenIdConnectProvider(this, "Provider", {
      url: "https://token.actions.githubusercontent.com",
      clientIds: ["sts.amazonaws.com"],
    });

    const s3host = new s3.Bucket(this, 'bucket', {
    })

    /// create iam user
    const user = new iam.User(this, 'my_user', {
      userName: 'UserForPreSignUrl'
    })

    // policy for user
    const policy = new iam.Policy(this, 'Policy', {
      policyName: "User for "
    })



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


