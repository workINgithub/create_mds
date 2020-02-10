const fs = require('fs')
const path = require('path')

var CreateMDs = function (path) {
  let initInfo = 'create_md_s仓库 初始化成功';
  this.description = 'create special markdowns for you';

  this.dirPath = path;

  this.mdsPromise = new Promise((resolve,reject) => {
    fs.exists(path, function (exists) {
      if(!exists) {
        fs.mkdir(path , function (err) {
          if(err) {
            console.warn(err);
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

// 单次创建若干个文件
CreateMDs.prototype.writeFile = function (filename , content) {
  if(this.mdsPromise) {
    let realtivePath = this.dirPath + `/${filename}.md`;
    
    this.mdsPromise = this.mdsPromise.then(function () {
      return new Promise((resolve,reject) => {
        fs.writeFile(realtivePath , content , function (err) {
          if(err) console.warn(err)
          else {
            console.log(`${filename} create success`)
            resolve()
          }
        })
      })
    } , CreateMDs.catchError)
  }
}

// 同时创建若干个文件
CreateMDs.prototype.writeFiles = function (fileArray) {
  const self = this;
  // 类型判断 fileArray类型
  if(Object.prototype.toString.call(fileArray) !== '[object Array]') {
    console.error("TypedError, fileArray");
    return
  }
  // 类型判断 object
  let objectContent = 'filename,content';
  for(let file of fileArray) {
    let compare = Object.keys(file).toString() == objectContent;
    if(compare === false) {
      console.error("TypedError")
      return;
    }
  }
  fileArray = fileArray.map(function (value) {
    return new Promise(function (resolve,reject) {
      let { filename , content } = value;
      let resolvePath = self.dirPath + `/${filename}.md`;
      fs.writeFile(resolvePath , content , function (err) {
        if(err) reject(err);
        else {
          console.log(`${filename} create success`)
          resolve();
        }
      })
    })
  })
  this.mdsPromise = Promise.all(fileArray)
}

CreateMDs.catchError = function (err) {
  console.trace(err)
}


module.exports = CreateMDs