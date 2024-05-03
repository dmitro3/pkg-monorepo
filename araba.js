const fs = require('fs');
const path = require('path');
const glob = require("glob");

const rootDir = "./packages/games";
const classNameRegex = /className=["']([\w\s-]+)["']/g;

glob("**/*.{js,jsx,tsx}", { cwd: rootDir }, (er, files) => {
  files.forEach((file) => {
    const filePath = path.join(rootDir, file);

    if (filePath.includes("node_modules")) {
      return;
    }

    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const result = data.replace(classNameRegex, (match, p1) => {
        const classNames = p1.split(" ");
        const prefixedClassNames = classNames.map((className) => {
          if (className.startsWith("inav-")) {
            return className;
          } else {
            return `inav-${className}`;
          }
        });
        return `className="${prefixedClassNames.join(" ")}"`;
      });
      fs.writeFile(filePath, result, 'utf-8', (err) => {
        if (err) console.error(err);
      });
    });
  });
});