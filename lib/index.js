const fs = require('fs')
const path = require('path')

var CreateMDs = function (path , content) {
  let initInfo = 'create_md_s仓库 初始化成功';
  this.description = 'create special markdowns for you';

  this.dirPath = path;

  this.content = this.content

  fs.exists(path, function (exists) {
    if(!exists) {
      fs.mkdir(path , function (err) {
        if(err) console.warn(err);
        else {
          console.log(initInfo)
        }
      })
    } else {
      console.log(initInfo)
    }
  })
}

CreateMDs.prototype.writeFile = function (filename , content) {
  let realtivePath = this.dirPath + `/${filename}.md`;

  fs.writeFile(realtivePath , content , function (err) {
    if(err) console.warn(err)
    else {
      console.log(`${filename} create success`)
    }
  })
}



module.exports = CreateMDs