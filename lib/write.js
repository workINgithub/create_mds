// write files
const fs = require('fs');

const initInfo = 'create_md_s store init success\n';

const catchError = function (err) {
  throw err;
}

// init store
exports.init = function init () {
  const self = this;
  return new Promise((resolve,reject) => {
    fs.exists(self.dirPath, function (exists) {
      if(!exists) {
        fs.mkdir(self.dirPath , function (err) {
          if(err) {
            reject(err)
          }
          else {
            console.log(initInfo);
            resolve();
          }
        })
      } else {
        console.log(initInfo);
        resolve();
      }
    })
  })
}

// write single file
exports.writeFile = function writeFile (filename , content) {
  const self = this;
  let realtivePath = self.dirPath + `/${filename}.${self.get()}`;
  
  return new Promise((resolve,reject) => {
    fs.writeFile(realtivePath , content , function (err) {
      if(err) reject(err);
      else {
        console.log(`${filename} create success`)
        resolve()
      }
    })
  })
}

// write files
exports.writeFiles = function writeFiles(fileArray) {
  const self = this;
  // 类型判断 fileArray类型
  if(Object.prototype.toString.call(fileArray) !== '[object Array]') {
    throw new TypeError('fileArray is not Array')
  }
  // 类型判断 object
  let objectContent = 'filename,content';
  for(let file of fileArray) {
    let compare = Object.keys(file).toString() == objectContent;
    if(compare === false) {
      throw new TypeError('bad object')
    }
  }
  fileArray = fileArray.map(function (value) {
    return new Promise(function (resolve,reject) {
      let { filename , content } = value;
      let resolvePath = self.dirPath + `/${filename}.${self.get()}`;
      fs.writeFile(resolvePath , content , function (err) {
        if(err) reject(err);
        else {
          console.log(`${filename} create success`)
          resolve();
        }
      })
    })
  })
  return Promise.all(fileArray)
}