import { createReadStream } from 'fs'
import { Readable } from 'stream';

// generates lines from a csv  stream 
async function* csvLines(chunkStream) {
  try {
    let remainingLine = ''; // chunk may ends in the middle of a line
    for await (const chunk of chunkStream) {
      const linesFromChunk = (remainingLine + chunk).split('\n');
      remainingLine = linesFromChunk.pop();
      yield linesFromChunk;
    }
    yield remainingLine;
  } catch (error) {
    throw error
  }
}

function transformForDelimiter(valuesArray, delimiter) {
  if (valuesArray instanceof Array) {
    return valuesArray.map((element) => {
      return element.split(delimiter).join(',')
    })
  }
}

function getHeaderRow(valuesArray, { headers, delimiter = ',' }, counter) {
  // operate here on valuess
  let headersArray = []
  if (valuesArray instanceof Array) {
    if (counter === 1) {
      // this chunks have headers row
      if (headers === true) {
        headersArray = valuesArray[0].split(delimiter)
      }
      else {
        headersArray = headers
        // Todo: - check length of new headers = old headers
      }
    }
    return headersArray
  }
}

function transformForHeader(valuesArray, headersArray, counter) {
  if (counter === 1) {
    // remove header row
    valuesArray.shift()
  }
  return valuesArray.reduce((arr, element) => {
    const splittedValues = element.split(',')
    const rowObj = splittedValues.reduce((obj, value, i) => {
      const keyName = headersArray[i];
      const objProp = {}
      objProp[keyName] = value
      return { ...obj, ...objProp }
    }, {})
    return [...arr, rowObj]
  }, [])
}

function transformForSkipComments(valuesArray, commentChar) {
  if (valuesArray instanceof Array) {
    return valuesArray.filter((element) => {
      const len = element.length
      return !(element[0] === commentChar || element[len - 1] === commentChar)
    })
  }
}

function transformation(values, config, counter) {
  const { delimiter = ',', skipComments = false, headersArray = [] } = config

  let valuesArray = values;

  // check for delimiter
  valuesArray = delimiter === ',' ? valuesArray : transformForDelimiter(valuesArray, delimiter)
  // check for skip Comments
  valuesArray = skipComments === false ? valuesArray : transformForSkipComments(valuesArray, '#')

  if (headersArray.length) {
    // iterated and make object 
    valuesArray = transformForHeader(valuesArray, headersArray, counter)
  }
  return valuesArray
}


// parser     
export async function* parser(source, config) {
  try {
    const { headers = false } = config
    let counter = 0;
    for await (let values of csvLines(source)) {
      ++counter // to check if first record is in chunk
      // check for headers
      const headersArray = headers === false ? [] : getHeaderRow(values, config, counter)
      yield transformation(values, { ...config, headersArray }, counter)
    }
  } catch (error) {
    throw error
  }
}

const streamFromFile = (file, opts = { encoding: 'utf8' }) => {
  try {
    if (!file) throw new Error("file path not provided")
    return createReadStream(file, opts)
  } catch (error) {
    throw error
  }
}
const streamFromCsvString = (csvString, opts = { encoding: 'utf8' }) => {
  try {
    if (!csvString) throw new Error("csvString not provided")
    return Readable.from(csvString)
  } catch (error) {
    throw error
  }
}
const streamFromUrl = (url, opts = { encoding: 'utf8' }) => {
  try {
    if (!url) throw new Error("url not provided")
    // Todo:
    // send Stream Object from here
  } catch (error) {
    throw error
  }
}


export async function csvToJson(config) {
  return new Promise((resolve, reject) => {
    try {
      const { csvString, path, url, outputMode = 'stream' } = config
      let stream;
      if (path) {
        stream = Readable.from(parser(streamFromFile(path), config))
      }
      else if (url) {
        stream = Readable.from(parser(streamFromUrl(url), config))
      } else if (csvString) {
        stream = Readable.from(parser(streamFromCsvString(csvString), config))
      }
      else {
        throw Error('Provide either path , url or csvString')
      }
      if (outputMode === 'string') {
        let output = []
        stream.on('data', (data) => {
          if (data) {
            output = [...output, ...data]
          }
        })
        stream.on('end', () => {
          resolve(output)
        })
      }

      if (outputMode === 'stream') {
        return resolve(stream)
      }

    } catch (error) {
      reject(error)
    }
  })
}

export async function csvToJsonFromFile(config) {
  try {
    return await csvToJson(config)
  } catch (error) {
    throw error
  }
}

export async function csvToJsonFromUrl(config) {
  try {
    return await csvToJson(config)
  } catch (error) {
    throw error
  }
}
