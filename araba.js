module.exports = function (fileInfo, api, options) {
  const j = api.jscodeshift;
  const { statement, expression } = j.template;
  const prefix = options.prefix || 'wr-';

  return j(fileInfo.source, { parser: require('@babel/preset-typescript') })
    .find(j.JSXAttribute)
    .filter(path => path.node.name.name === 'className')
    .forEach(path => {
      // Handling for a simple string literal
      console.log(path.node.value.type);
      if (path.node.value.type === 'StringLiteral') {
        path.node.value.value = path.node.value.value
          .split(/\s+/)
          .map(className => `${prefix}${className}`)
          .join(' ');

      }
      // Handling for JSX expression containers
      else if (path.node.value.type === 'JSXExpressionContainer') {
        // Simple string within JSX expression
        if (path.node.value.expression.type === 'StringLiteral') {
          path.node.value.expression.value = path.node.value.expression.value
            .split(/\s+/)
            .map(className => `${prefix}${className}`)
            .join(' ');
        }
        // Template literal or complex expression
        else if (path.node.value.expression.type === 'CallExpression' &&
          path.node.value.expression.callee.name === 'cn') {
          path.node.value.expression.arguments = path.node.value.expression.arguments.map(arg => {
            // Template strings within cn()
            if (arg.type === 'TemplateLiteral') {
              arg.quasis.forEach(quasi => {
                quasi.value.raw = quasi.value.raw.split(/\s+/).map(className => `${prefix}${className}`).join(' ');
                quasi.value.cooked = quasi.value.cooked.split(/\s+/).map(className => `${prefix}${className}`).join(' ');
              });
            }
            // Simple strings within cn()
            else if (arg.type === 'StringLiteral') {
              arg.value = arg.value
                .split(/\s+/)
                .map(className => `${prefix}${className}`)
                .join(' ');
            }
            return arg;
          });
        }
      }
    })
    .toSource();
};
