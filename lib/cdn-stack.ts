// import type { Construct } from "constructs";
// import * as s3 from "aws-cdk-lib/aws-s3";
// import * as cloudfront from "aws-cdk-lib/aws-cloudfront";

// import { Stack, StackProps } from "aws-cdk-lib";

// type Props = StackProps;

// export class CdnStack extends Stack {
//   constructor(scope: Construct, id: string, props: Props) {
//     super(scope, id, props);

//     const StickerBucket = new s3.Bucket(this, "StickerBucket", {
// `      bucketName: `${this.account}-sticker-bucket`,
//       encryption: s3.BucketEncryption.S3_MANAGED,
//       blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
//     });
//     const cfOriginAccessIdentity = new cloudfront.OriginAccessIdentity(this, "OAI", {
//         comment: "only from cloudfront to s3",
//       });

//     StickerBucket.grantRead(cfOriginAccessIdentity);



//      new cloudfront.CloudFrontWebDistribution(
//       this,
//       "CloudFrontToS3",
//       {
//         originConfigs: [
//           {
//             s3OriginSource: {
//               originPath: "/tuan",
//               s3BucketSource: StickerBucket,
//               originAccessIdentity: cfOriginAccessIdentity,
//             },
//             behaviors: [
//               {
//                 isDefaultBehavior: true,
//                 viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.ALLOW_ALL,
//                 allowedMethods: cloudfront.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
              
//               },
//             ],
//           },
//         ],
//         priceClass: cloudfront.PriceClass.PRICE_CLASS_200,
//         httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
//       }
//     );
