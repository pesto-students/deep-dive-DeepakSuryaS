var ForAwait = (function (exports, stream, fs) {
  'use strict';

  function transformForDelimiter(valuesArray, delimiter) {
    if (valuesArray instanceof Array) {
      return valuesArray.map((element) => {
        return element.split(delimiter).join(',')
      })
    }
  }

  function getHeaderRow(valuesArray, { headers, delimiter = ',' }, counter) {
    // operate here on valuess
    let headersArray = [];
    if (valuesArray instanceof Array) {
      if (counter === 1) {
        // this chunks have headers row
        if (headers === true) {
          headersArray = valuesArray[0].split(delimiter);
        }
        else {
          headersArray = headers;
          // Todo: - check length of new headers = old headers
        }
      }
      return headersArray
    }
  }

  function transformForHeader(valuesArray, headersArray, counter) {
    if (counter === 1) {
      // remove header row
      valuesArray.shift();
    }
    return valuesArray.reduce((arr, element) => {
      const splittedValues = element.split(',');
      const rowObj = splittedValues.reduce((obj, value, i) => {
        const keyName = headersArray[i];
        const objProp = {};
        objProp[keyName] = value;
        return { ...obj, ...objProp }
      }, {});
      return [...arr, rowObj]
    }, [])
  }

  function transformForSkipComments(valuesArray, commentChar) {
    if (valuesArray instanceof Array) {
      return valuesArray.filter((element) => {
        const len = element.length;
        return !(element[0] === commentChar || element[len - 1] === commentChar)
      })
    }
  }

  function transformation(values, config, counter) {
    const { delimiter = ',', skipComments = false, headersArray = [] } = config;

    let valuesArray = values;

    // check for delimiter
    valuesArray = delimiter === ',' ? valuesArray : transformForDelimiter(valuesArray, delimiter);
    // check for skip Comments
    valuesArray = skipComments === false ? valuesArray : transformForSkipComments(valuesArray, '#');

    if (headersArray.length) {
      // iterated and make object 
      valuesArray = transformForHeader(valuesArray, headersArray, counter);
    }
    return valuesArray
  }



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

  // parser     
  async function* csvToJsonParser(source, config) {
    try {
      const { headers = false } = config;
      let counter = 0;
      for await (let values of csvLines(source)) {
        ++counter; // to check if first record is in chunk
        // check for headers
        const headersArray = headers === false ? [] : getHeaderRow(values, config, counter);
        yield transformation(values, { ...config, headersArray }, counter);
      }
    } catch (error) {
      throw error
    }
  }

  // generates csv compatible string  from json stream 
  async function* csvStrings(chunkStream) {
    try {
      for await (const chunk of chunkStream) {
        yield chunk
          .toString()
          .replace(/("\w{1,}":)|[\r\n\s{[\]]/g, '')
          .trim()
          .replace(/},|}/g, "\n");
      }
    } catch (error) {
      throw error
    }
  }
  function transformForDelimiter$1(valuesArray, delimiter) {
    if (valuesArray instanceof Array) {
      return valuesArray.map((element) => {
        return element.split(',').join(delimiter)
      })
    }
  }

  function transformation$1(values, config) {
    const { delimiter = ',', newlineChar = '\n' } = config;
    let valuesArray = values.split(newlineChar);
    // check for delimiter
    valuesArray = delimiter === ',' ? valuesArray : transformForDelimiter$1(valuesArray, delimiter);
    return valuesArray
  }

  // parser     
  async function* jsonToCsvParser(source, config) {
    try {
      const { headers = false, delimiter = ',' } = config;
      for await (let values of csvStrings(source)) {
        yield transformation$1(values, { ...config, });
      }
    } catch (error) {
      throw error
    }
  }

  const streamFromFile = (file, opts = { encoding: 'utf8' }) => {
    try {
      if (!file) throw new Error("file path not provided")
      return fs.createReadStream(file, opts)
    } catch (error) {
      throw error
    }
  };
  const streamFromString = (string, opts = { encoding: 'utf8' }) => {
    try {
      if (!string) throw new Error("string not provided")
      return stream.Readable.from(string)
    } catch (error) {
      throw error
    }
  };

  const streamFromUrl = (url, opts = { encoding: 'utf8' }) => {
    try {
      if (!url) throw new Error("url not provided")
      // Todo:
      // send Stream Object from here
      return fs.createReadStream(url, opts) // provided url uses file protocol
    } catch (error) {
      throw error
    }
  };

  async function csvToJson(config) {
    return new Promise((resolve, reject) => {
      try {
        const { csvString, path, url, outputMode = 'stream' } = config;
        let stream$1;
        if (path) {
          stream$1 = stream.Readable.from(csvToJsonParser(streamFromFile(path), config));
        }
        else if (url) {
          stream$1 = stream.Readable.from(csvToJsonParser(streamFromUrl(url), config));
        } else if (csvString) {
          stream$1 = stream.Readable.from(csvToJsonParser(streamFromString(csvString), config));
        }
        else {
          throw Error('Provide either path , url or csvString')
        }
        if (outputMode === 'string') {
          let output = [];
          stream$1.on('data', (data) => {
            if (data) {
              output = [...output, ...data];
            }
          });
          stream$1.on('end', () => {
            resolve(output);
          });
        }

        if (outputMode === 'stream') {
          return resolve(stream$1)
        }

      } catch (error) {
        reject(error.message);
      }
    })
    .catch(error => console.log('Error:', error))
  }

  async function jsonToCsv(config) {
    return new Promise((resolve, reject) => {
      try {
        const { jsonString, path, url, outputMode = 'stream' } = config;
        let stream$1;
        if (path) {
          stream$1 = stream.Readable.from(jsonToCsvParser(streamFromFile(path), config));
        }
        else if (url) {
          stream$1 = stream.Readable.from(jsonToCsvParser(streamFromUrl(url), config));
        } else if (jsonString) {
          stream$1 = stream.Readable.from(jsonToCsvParser(streamFromString(jsonString), config));
        }
        else {
          throw Error('Provide either path , url or jsonString')
        }
        if (outputMode === 'string') {
          let output = [];
          stream$1.on('data', (data) => {
            if (data) {
              output = [...output, ...data];
            }
          });
          stream$1.on('end', () => {
            resolve(output);
          });
        }

        if (outputMode === 'stream') {
          return resolve(stream$1)
        }

      } catch (error) {
        reject(error.message);
      }
    })
    .catch(error => console.log('Error:', error))
  }

  async function csvToJsonFromFile(config) {
    try {
      return await csvToJson(config)
    } catch (error) {
      throw error
    }

  }

  async function csvToJsonFromUrl(config) {
    try {
      return await csvToJson(config)
    } catch (error) {
      throw error
    }
  }

  async function jsonToCsvFromFile(config) {
    try {
      return await jsonToCsv(config)
    } catch (error) {
      throw error
    }

  }

  async function jsonToCsvFromUrl(config) {
    try {
      return await jsonToCsv(config)
    } catch (error) {
      throw error
    }
  }

  exports.csvToJson = csvToJson;
  exports.csvToJsonFromFile = csvToJsonFromFile;
  exports.csvToJsonFromUrl = csvToJsonFromUrl;
  exports.jsonToCsv = jsonToCsv;
  exports.jsonToCsvFromFile = jsonToCsvFromFile;
  exports.jsonToCsvFromUrl = jsonToCsvFromUrl;

  return exports;

}({}, stream, fs));
