const core = require('@actions/core');
const wait = require('./wait');
const yaml = require('js-yaml');
const fs   = require('fs');

async function read_yml() {

  
  // Get document, or throw exception on error
  try {
    const doc = yaml.load(fs.readFileSync('/inputs/base.yml', 'utf8'));
    console.info("~~~READING YML FILE~~~~")
    console.log(doc);
    console.log(doc.env.VAR_A);
    core.exportVariable("VAR_A", VAR_A);
  } catch (e) {
    console.log(e);
  }

}

// most @actions toolkit packages have async methods
async function run() {
  try {
    const ms = core.getInput('milliseconds');
    core.info(`Waiting ${ms} milliseconds ...`);

    core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    await wait(parseInt(ms));
    core.info((new Date()).toTimeString());

    core.setOutput('time', new Date().toTimeString());
    read_yml()
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
