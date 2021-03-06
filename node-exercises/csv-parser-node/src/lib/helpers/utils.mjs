import {createReadStream} from 'fs'

export const streamFromFile = (file, opts = { encoding: 'utf8' }) => {
  try {
    if (!file) throw new Error("file path not provided")
    return createReadStream(file, opts)
  } catch (error) {
    throw error
  }
}
export const streamFromString = (string, opts = { encoding: 'utf8' }) => {
  try {
    if (!string) throw new Error("string not provided")
    return Readable.from(string)
  } catch (error) {
    throw error
  }
}

export const streamFromUrl = (url, opts = { encoding: 'utf8' }) => {
  try {
    if (!url) throw new Error("url not provided")
    // Todo:
    // send Stream Object from here
  } catch (error) {
    throw error
  }
}
