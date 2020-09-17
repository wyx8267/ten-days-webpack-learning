let less = require('less')

function loader(source) {
  let css;
  less.render(source, function (err, result) {
    css = result.css
  })
  return css
}

module.exports = loader;