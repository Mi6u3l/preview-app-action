const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {

    const inputs = {
      token: core.getInput('repo-token', {required: true}),
      bodyTemplate: core.getInput('body-template', {required: true})
    }

    const branchName = github.context.payload.pull_request.head.ref;
    core.debug(`branch: ${branchName}`);


    const match = (upperCase) => upperCase ? matches[0].toUpperCase() : matches[0];
    core.info(`Matched branch text: ${match(false)}`);

    const request = {
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: github.context.payload.pull_request.number,
    }

    const title = github.context.payload.pull_request.title || '';

    const body = github.context.payload.pull_request.body || '';
    const processedBody = inputs.bodyTemplate.replace('%pr_number%', request.pull_number);
    core.debug(`processedBody: ${processedBody}`);

    processedBody.concat('\n'.2, body);


    if (!updateTitle && !updateBody) {
      return;
    }

    const client = new github.GitHub(inputs.token);
    const response = await client.pulls.update(request);

    core.info(`response: ${response.status}`);
    if (response.status !== 200) {
      core.error('Updating the pull request has failed');
    }
  }
  catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}

run()
