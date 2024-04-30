const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to run npm i for a given directory
function runNpmInstall(directory) {
  console.log(`Running npm install in ${directory}`);
  execSync('npm i', { cwd: directory, stdio: 'inherit' });
}

// Function to check if a package.json file contains a build script
function canBuild(directory) {
  const packageJsonPath = path.join(directory, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = require(packageJsonPath);
    return packageJson && packageJson.scripts && packageJson.scripts.build;
  }
  return false;
}

// Function to run npm run build for a given directory (if existing)
function runBuild(directory, project) {
  if (canBuild(directory)) {
    console.log(`Running npm run build in ${directory}`);
    // Add a root path so it knows where to host it
    let base = `/projects/${project}/`;
    // Set base in that package's config
    const packageJsonPath = path.join(directory, 'package.json');
    const packageJson = require(packageJsonPath);
    packageJson.config = packageJson.config || {};
    packageJson.config.base = base;
    packageJson.config.assets_dir = base;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    execSync('npm run build', { cwd: directory, stdio: 'inherit' });
  }
}


// Run npm install for all submodules under projects directory
const projectsDir = path.join(__dirname, '../', 'projects');
fs.readdirSync(projectsDir).forEach(project => {
  const projectPath = path.join(projectsDir, project);
  if (fs.statSync(projectPath).isDirectory()) {
    runNpmInstall(projectPath);
    runBuild(projectPath, project)
  }
});
