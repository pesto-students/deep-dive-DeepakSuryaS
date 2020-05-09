const { 
  csvToJson,
  jsonToCsv,
  csvToJsonFromFile,
  csvToJsonFromUrl,
  jsonToCsvFromFile,
  jsonToCsvFromUrl
} = require('../dist/bundle/index')

describe('csv to json parse', function() {
  test('function return type test', () => {
    expect(typeof csvToJson).toBe('function')
  })

  test('should throw an error when invalid args are passed', function(cb) {
    try {
      csvToJson()
      cb(new Error('expected an error'))
    } catch(error) {
      expect(error.message).toBe('expected csv to be a string')
      cb()
    }
  })

  test('it should convert a string of csv to a json string', async function() {
    const str = [
      'id,fruit,vegetable',
      '1,apple,carrot',
      '2,orange,corn',
      '3,banana,potato',
    ].join('\n');
    const expected = [
      '[{"id":"1","fruit":"apple","vegetable":"carrot"},',
      '{"id":"2","fruit":"orange","vegetable":"corn"},',
      '{"id":"3","fruit":"banana","vegetable":"potato"}]',
    ].join('\n');

    const actual = await csvToJson({ path: str, delimiter: ',', outputMode: 'string', headers: true, skipComments: true })
  })
})




