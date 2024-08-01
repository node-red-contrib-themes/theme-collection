(async () => {
  const { log, error } = require("console");
  const { promisify } = require("util");
  const exec = promisify(require("child_process").exec);
  const process = require("process");
  const fs = require("fs");
  const path = require("path");
  const chalk = (await import("chalk")).default;
  const ora = (await import("ora")).default;
  const rootDir = path.resolve(path.join(__dirname, ".."));
  const noderedDir = path.join(rootDir, "node-red");
  const userDir = path.join(rootDir, ".node-red");
  const projectsDir = path.join(userDir, "projects");
  const themeDevProjectDir = path.join(projectsDir, "theme-dev-project");

  if (fs.existsSync(noderedDir)) {
    fs.rmSync(noderedDir, { recursive: true, force: true });
  }

  await runner(
    "git clone --depth=1 --no-tags git@github.com:node-red/node-red.git",
    rootDir,
    "Cloning Node-RED repository"
  );

  await runner(
    "npm install",
    noderedDir,
    "Installing Node-RED dependencies",
    true
  );

  await runner("npm run build", noderedDir, "Building Node-RED", true);

  if (!fs.existsSync(path.join(userDir, "node_modules"))) {
    await makeDir(
      path.join(userDir, "node_modules"),
      "Creating User directory"
    );
  }

  if (!fs.existsSync(projectsDir)) {
    await makeDir(projectsDir, "Creating Projects directory");
    await runner(
      "git clone git@github.com:node-red-contrib-themes/theme-dev-project.git",
      projectsDir,
      "Cloning theme development project repository"
    );
  } else {
    await runner(
      "git pull",
      themeDevProjectDir,
      "Updating theme development project local repository"
    );
  }

  //   await runner(
  //     `npm install ${themeDevProjectDir}`,
  //     userDir,
  //     "Installing project dependencies",
  //     true
  //   );

  await runner("npm install ./..", userDir, "Installing theme package");

  async function runner(cmd, workingDir, prompt, hasSuffixText = false) {
    const spinner = ora().start(prompt);
    try {
      const suffix = `- ${chalk.yellow(
        "This may take a while, please be patient"
      )}`;
      spinner.suffixText = hasSuffixText ? suffix : "";

      await exec(cmd, { cwd: workingDir });

      spinner.suffixText = "";
      spinner.succeed(prompt);
    } catch (err) {
      spinner.fail(prompt);
      log("");
      error(err.toString());
      log("");
      log("Aborting");
      process.exit(1);
    }
  }

  async function makeDir(dir, prompt) {
    const spinner = ora().start(prompt);
    try {
      fs.mkdirSync(dir, { recursive: true });

      spinner.succeed(prompt);
    } catch (err) {
      spinner.fail(prompt);
      log("");
      error(err.toString());
      log("");
      log("Aborting");
      process.exit(1);
    }
  }
})();
