# CREATE_MDS

> To faster create many markdowns

introduction:
原因：我在学习的过程中，每天写了一些电子日记。日记的格式大致相似。可每次都需要创建一个日记非常麻烦。倒不如创建一个模块，能快速的帮我创建这样的日记文件。

模块仍不是很完善，会加油开发的ing :muscle:

### HOW TO USE
```
const CreateMds = require('./create_mds')

const mds = new CreateMds(testPath)

mds.writeFile(filename,content)
```

你只需要三步,是不是很简单。完全支持写入一定数量的文件。

