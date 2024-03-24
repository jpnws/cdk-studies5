# CDK Studies Chapter 5

## Updating all packages

- `npx npm-check-updates` -> `npx npm-check-updates -u`
- or `pnpm update --latest`

## Creating a CDK Project

1. Create an empty folder.
2. Create three folders: `infra`, `server`, `web`.
3. Change into `infra` directory.
4. Execute `cdk init --language=typescript`.

## Common Commands

### Infrastructure (infra)

- `cdk deploy --profile cdk`
- `cdk destroy --profile cdk`

### Back-end

- export AWS_PROFILE=cdk
- export PORT=3001
