# CREATE_MDS

> To faster create many markdowns, more than markdowns.

introduction:
原因：我在学习的过程中，每天写了一些电子日记。日记的格式大致相似。可每次都需要创建一个日记非常麻烦。倒不如创建一个模块，能快速的帮我创建这样的日记文件。

模块仍不是很完善，会加油开发的ing :muscle:

### HOW TO USE
```
const CreateMDs = require('./create_mds')
// path可以是相对路径 也可以是 绝对路径
const mds = new CreateMDs(path)

mds.writeFile(filename,content)

// 写入大量文件
let fileArray = [
  {
    filename : 'abcde',
    content: 'aaaa'
  }
]
mds.writeFiles(fileArray)

```

#### 新功能

```
mds.set(suffix)
mds.get()
```

设置新增文件的后缀名。


#### 问题修复

v0.3.2 docs: 版本号 问题
v0.3.1 fix:IO问题，仓库若未建立，无法使用writeFile() , 模块化处理write , feat: 增加suffix修改文件后缀的功能

