#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TestAlertStack } from '../lib/test-alert-stack';
import { BudgetsAlertStack } from '../lib/sns-stack';
import { config } from '../config.dev';

const app = new cdk.App();
new TestAlertStack(app, 'TestAlertStack', {
});

new BudgetsAlertStack(app, "BudgetsAlertStack", {
    env: { region: "ap-southeast-1" },
    slackWorkspaceId: config.slackWorkspaceId,
    budgetsAlertSlackChannelId: config.budgetsAlertSlackChannelId,
  });

  