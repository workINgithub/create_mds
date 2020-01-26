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

CreateMDs.catchError = function (err) {
  console.trace(err)
}


module.exports = CreateMDs