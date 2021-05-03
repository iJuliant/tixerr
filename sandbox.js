const fs = require('fs')
const result = fs.unlink('../tixerr/readme.md', (error, result) => {
  if (!error) {
    console.log('berhasil')
  } else {
    console.log(error)
  }
})
