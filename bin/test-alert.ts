#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TestAlertStack } from '../lib/test-alert-stack';

const app = new cdk.App();
new TestAlertStack(app, 'TestAlertStack', {
});
