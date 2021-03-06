// @flow
import * as fs from 'fs';
import path from 'path';

export default (app: Object) => {
  fs.readdir(path.resolve(__dirname, '../services'), function (err, folders) {
    folders.forEach(folder => {
      fs.readdir(path.resolve(__dirname, '../services', folder), function (err, files) {
        const requiredFiles = files.filter(file => file.match(/.routes.js$/));
        requiredFiles.forEach(file => {
          const filePath: string = path.resolve(__dirname, '../services', folder, file);
          require(filePath).default(app);
        });
      });
    });
  });
};
