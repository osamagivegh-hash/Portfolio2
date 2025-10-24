const fs = require('fs');
const path = require('path');

// Function to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy backend files to root
console.log('Copying backend files to root directory...');
copyDir('./backend', './backend-copy');

// Copy specific directories to root
const dirsToCopy = ['config', 'models', 'routes', 'middleware', 'scripts', 'uploads'];

dirsToCopy.forEach(dir => {
  const srcPath = path.join('./backend', dir);
  const destPath = path.join('./', dir);
  
  if (fs.existsSync(srcPath)) {
    console.log(`Copying ${dir}...`);
    copyDir(srcPath, destPath);
  }
});

console.log('Backend files copied successfully!');
