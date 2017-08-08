const sass = require('node-sass');
const path = require('path');

const fs = require('fs');
const util = require('util');

const log_file = fs.createWriteStream(`${__dirname}/debug.log`, { flags: 'w' });
const log_stdout = process.stdout;

console.log = function (d) {
  //
  log_file.write(`${util.format(d)}\n`);
  log_stdout.write(`${util.format(d)}\n`);
};

module.exports = function processSass(data, filename) {
  // @todo: if a sass file is imported with ~shared/styles/variables.scss (sass-loader syntax)
  // it will not be recognized by includePaths here. If referenced without ~ it works
  console.log(typeof filename);
  console.log(typeof data);
  const removeTilde = data.replace(/~/g, '');
  console.log(typeof removeTilde);

  const result = sass.renderSync({
    removeTilde,
    file: filename,
    includePaths: [path.join(__dirname, 'src')],
    outputStyle: 'compressed',
  }).css;

  console.log(result.toString('utf8'));
  return result.toString('utf8');
};
