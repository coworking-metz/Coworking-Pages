const fs = require('fs');
const path = require('path');

console.log('Vider cache cloudflare');
fetch('https://webhooks.coworking-metz.fr/cloudflare/purge');


console.log('Build du fichier index');

// Directory to search for HTML files
const directoryPath = '.';

// Path to the model HTML file
const modelFilePath = path.join(directoryPath, 'index-modele.html');

// Function to insert links into the model HTML content
function insertLinksIntoModel(modelContent, files) {
  const links = files.filter(file=>file!='index.html').map(file => `<li><a href="${file}">${file.split('.')[0]}</a></li>`).join('\n');
  // Assuming the model HTML has a marker where the list should be inserted
  const updatedContent = modelContent.replace('<!-- Links -->', `<ul>\n${links}\n</ul>`);
  return updatedContent;
}

// Function to create index.htm based on the model file
function createIndexFile(files) {
  fs.readFile(modelFilePath, 'utf8', (err, data) => {
    if (err) throw err;

    const htmlContent = insertLinksIntoModel(data, files);
    const indexPath = path.join(directoryPath, 'index.html');

    fs.writeFile(indexPath, htmlContent, (err) => {
      if (err) throw err;
      console.log('index.htm has been created based on index-modele.html!');
    });
  });
}

// Read the current directory to find HTML files
fs.readdir(directoryPath, (err, files) => {
  if (err) throw err;

  const htmlFiles = files.filter(file => path.extname(file) === '.html' && file !== 'index-modele.html');

  createIndexFile(htmlFiles);
});
