import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Stack } from "aws-cdk-lib";

export class infraStack extends Stack {
  constructor(scope: Construct, id: string, props?: infraStack) {
    super(scope, id);

    const s3Bucket = new s3.Bucket(this, "S3Bucket", {
      bucketName: `${id}-bucket-test`,
    });
  }
}
