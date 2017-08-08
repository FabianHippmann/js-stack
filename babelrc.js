const sass = require('node-sass');
const path = require('path');

module.exports = function processSass(data, filename) {
  const removeTilde = data.replace(/~/g, '');

  const result = sass.renderSync({
    data: removeTilde,
    file: filename,
    includePaths: [path.join(__dirname, 'src')],
    outputStyle: 'compressed',
  }).css;

  return result.toString('utf8');
};
