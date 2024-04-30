const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

async function jsify(directory) {
  // All files and paths
  const files = fs.readdirSync(directory).map(file => path.join(directory, file));

  for (const file of files) {
    const filePath = path.join(directory, file);
    const ext = path.extname(filePath);

    if (ext === '.ts') {
      try {
        await esbuild.build({
          entryPoints: [filePath],
          outdir: directory,
          format: 'esm',
          target: 'esnext',
          bundle: true,
          minify: true,
          external: ['fs', 'path', 'module'],
        });

        fs.unlinkSync(filePath);
      } catch (error) {
        console.error(`Error compiling ${filePath}:`, error);
      }
    }
  }
}

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
    jsify(projectPath)
  }
});
