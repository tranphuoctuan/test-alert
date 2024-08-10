#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { infraStack } from '../lib/infra-stack';
import { config } from '../config.dev';
import { GithubActionsOidcStack } from '../lib/github_action';


const app = new cdk.App();

new infraStack(app, "infraStack")

new GithubActionsOidcStack(app, "GithubActionsOidcStack", {
})
  