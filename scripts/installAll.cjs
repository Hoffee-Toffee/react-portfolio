const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Run npm install, and build for all submodules under projects directory
const projectsDir = path.join(__dirname, '../', 'projects');
fs.readdirSync(projectsDir).forEach(project => {
  const projectPath = path.join(projectsDir, project);
  if (fs.statSync(projectPath).isDirectory()) {
    execSync('npm i; npm run build', { cwd: projectPath, stdio: 'inherit' });
  }
});
