const jsonToCsv = require('./src/utils/json-to-csv')
const header = require('./header')

(function() {
  const csvFiles = []

  for(let i = 0; i < 5; i += 1) {
    csvFiles.push(
      jsonToCsv(header, {
        in: `./data/json-file-${i}.json`,
        out: `./data/csv-file-${i}.csv`
      })
    )
  }

  Promise.all(csvFiles)
    .then(() => {
      console.log('Conversion completed!')
    })
    .catch(error => console.log(error.message))
})()