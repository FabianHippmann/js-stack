const sass = require('node-sass');
const path = require('path');

module.exports = function processSass(data, filename) {
  // @todo: if a sass file is imported with ~ shared/styles/variables.scss (sass-loader syntax)
  // it will not be recognized by includePaths here. If referenced without ~ it works
  const result = sass.renderSync({
    data,
    file: filename,
    includePaths: [path.join(__dirname, 'src')],
    outputStyle: 'compressed',
  }).css;
  return result.toString('utf8');
};
