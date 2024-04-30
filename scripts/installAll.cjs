const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to run npm i for a given directory
function runNpmInstall(directory) {
  console.log(`Running npm install in ${directory}`);
  execSync('npm i', { cwd: directory, stdio: 'inherit' });
}

// Run npm install for all submodules under projects directory
const projectsDir = path.join(__dirname, '../', 'projects');
fs.readdirSync(projectsDir).forEach(project => {
  const projectPath = path.join(projectsDir, project);
  if (fs.statSync(projectPath).isDirectory()) {
    runNpmInstall(projectPath);
  }
});
