const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to run a command in a given directory
function runCommand(command, directory) {
  console.log(`Running "${command}" in ${directory}`);
  try {
    execSync(command, { cwd: directory, stdio: 'inherit' });
  } catch (error) {
    console.error(`Error running "${command}" in ${directory}: ${error.message}`);
  }
}

// Run npm run build for all submodules under projects directory
const projectsDir = path.join(__dirname, '../', 'projects');
fs.readdirSync(projectsDir).forEach(project => {
  const projectPath = path.join(projectsDir, project);
  if (fs.statSync(projectPath).isDirectory()) {
    runCommand('npm i; npm run build', projectPath);
  }
});
