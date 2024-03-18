import {
    Stack,
    StackProps,
    aws_budgets,
    aws_chatbot,
    aws_iam,
    aws_sns,
    aws_sqs
  } from "aws-cdk-lib";
  import { Construct } from "constructs";
  import { IPrincipal } from "aws-cdk-lib/aws-iam";
  import * as rds from "aws-cdk-lib/aws-rds"
  import * as lambda from "aws-cdk-lib/aws-lambda";
import { Lambda } from "aws-cdk-lib/aws-ses-actions";
  export type BudgetsAlertStackProps = StackProps & {
    slackWorkspaceId: string;
    budgetsAlertSlackChannelId: string;
  };
  export class BudgetsAlertStack extends Stack {
    constructor(scope: Construct, id: string, props: BudgetsAlertStackProps) {
      super(scope, id, props);
      const { slackWorkspaceId, budgetsAlertSlackChannelId } = props;
  


const topic = new aws_sns.Topic(this, "BudgetsAlertTopic");
    topic.addToResourcePolicy(
      new aws_iam.PolicyStatement({
        effect: aws_iam.Effect.ALLOW,
        actions: ["SNS:Publish"],
        principals: [
          new aws_iam.ServicePrincipal("budgets.amazonaws.com"),
        ] as IPrincipal[],
        resources: [topic.topicArn],
      })
    );

    }
}
