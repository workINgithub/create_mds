const write = require('./write')
// director path
let suffix = 'md'

class CreateMDs  {
  mdsPromise;
  constructor (path) {
    this.dirPath = path;
    try {
      this.mdsPromise = write.init.call(this)
    } catch (err) {
      console.log(err.message)
    }
  }

  writeFile (filename , content) {
    this.mdsPromise = this.mdsPromise.then(() => {
      return write.writeFile.call(this , filename , content)
    } , (err) => console.log(err.message) )
  }

  writeFiles (fileArray) {
    this.mdsPromise = this.mdsPromise.then(() => {
      return write.writeFiles.call(this , fileArray)
    } , (err) => console.log(err.message) )
  }

  set (newVal) {
    suffix = newVal
  }

  get () {
    return suffix;
  }
}


module.exports = CreateMDs;