const { createWriteStream, createReadStream } = require('fs')
const { Transform } = require('stream')

function jsonToCsv(header, paths) {
  return new Promise(resolve => {
    const read = createReadStream(paths.in, {encoding: 'utf-8'})

    const transform = new Transform()

    transform._transform = (chunk, encoding, done) => {
      const rows = chunk
        .toString()
        .replace(/("\w{1,}":)|[\r\n\s{[\]]/g, "")
        .replace(/},|}/g, "\n")
        
      done(null, rows)
    }

    const writer = createWriteStream(paths.out)

    writer.on('open', () => writer.write(header.join(',') + '\n'))
    writer.on('close', () => resolve())

    read.pipe(transform).pipe(writer)
  })
}

module.exports = jsonToCsv