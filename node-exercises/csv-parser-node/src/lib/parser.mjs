import { Readable } from 'stream';
import { csvToJsonParser } from './helpers/csv-json.mjs'
import { jsonToCsvParser } from './helpers/json-csv.mjs'
import { streamFromFile, streamFromString, streamFromUrl } from './helpers/utils.mjs'

export async function csvToJson(config) {
  return new Promise((resolve, reject) => {
    try {
      const { csvString, path, url, outputMode = 'stream' } = config
      let stream;
      if (path) {
        stream = Readable.from(csvToJsonParser(streamFromFile(path), config))
      }
      else if (url) {
        stream = Readable.from(csvToJsonParser(streamFromUrl(url), config))
      } else if (csvString) {
        stream = Readable.from(csvToJsonParser(streamFromString(csvString), config))
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

export async function jsonToCsv(config) {
  return new Promise((resolve, reject) => {
    try {
      const { jsonString, path, url, outputMode = 'stream' } = config
      let stream;
      if (path) {
        stream = Readable.from(jsonToCsvParser(streamFromFile(path), config))
      }
      else if (url) {
        stream = Readable.from(jsonToCsvParser(streamFromUrl(url), config))
      } else if (jsonString) {
        stream = Readable.from(jsonToCsvParser(streamFromString(jsonString), config))
      }
      else {
        throw Error('Provide either path , url or jsonString')
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

export async function jsonToCsvFromFile(config) {
  try {
    return await jsonToCsv(config)
  } catch (error) {
    throw error
  }

}

export async function jsonToCsvFromUrl(config) {
  try {
    return await jsonToCsv(config)
  } catch (error) {
    throw error
  }
}
