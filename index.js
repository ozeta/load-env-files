const core = require('@actions/core');
const yaml = require('js-yaml');
const fs   = require('fs');

async function run() {
  try {
    const doc = yaml.load(fs.readFileSync('.github/workflows/test.yml', 'utf8'));
    core.info("~~~READING YML FILE~~~~")
    core.info("reading yml file: " + doc.env.VAR_A)
    core.exportVariable("VAR_A", doc.env.VAR_A);
    core.exportVariable("VAR_SECR_A", doc.env.SECRET_VAR);

    const doc1 = yaml.load(fs.readFileSync('.github/workflows/codeql-analysis.yml', 'utf8'));
    core.info("~~~READING YML FILE~~~~")
    core.info("reading yml file: " + doc1.env.VAR_D)
    core.exportVariable("VAR_D", doc1.env.VAR_D);
  } catch (error) {
    core.setFailed(error.message)
  }
}

run();
