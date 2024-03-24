import * as dotenv from 'dotenv';

export const pipelineConfig = (env: string) => {
  if (env === 'production') {
    const { parsed } = dotenv.config({ path: '.env.production' });

    return {
      buildCommand: 'pnpm build:prod',
      deployCommand: 'pnpm cdk deploy',
      branch: 'main',
      tag: 'chapter5-production-pipeline',
      githubToken: parsed?.GITHUB_TOKEN,
      workspaceId: parsed?.WORKSPACE_ID,
      channelId: parsed?.CHANNEL_ID,
    };
  }

  const { parsed } = dotenv.config({ path: '.env.development' });

  return {
    buildCommand: 'pnpm build:dev',
    deployCommand: 'pnpm cdk:dev deploy',
    branch: 'dev',
    tag: 'chapter5-development-pipeline',
    githubToken: parsed?.GITHUB_TOKEN,
    workspaceId: parsed?.WORKSPACE_ID,
    channelId: parsed?.CHANNEL_ID,
  };
};
