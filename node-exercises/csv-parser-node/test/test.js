// import { csvToJson, jsonToCsv } from '../src/lib/parser.mjs'

// /* try {
//   (async function () {
//     const string = await csvToJson({ path: '../samples/small.csv', delimiter: ',', outputMode: 'string', headers: true, skipComments: true })
//     console.log(string)
//   })();
// } catch (error) {
//   console.log(error)
// } */

// /* try {
//   (async function () {
//     const string = await csvToJson({ url: 'https://jsonplaceholder.typicode.com/todos/1', delimiter: ',', outputMode: 'string', headers: false, skipComments: true })
//     console.log(string)
//   })();
// } catch (error) {
//   console.log(error)
// } */

// /* const str = [
//   'id,fruit,vegetable',
//   '1,apple,carrot',
//   '2,orange,corn',
//   '3,banana,potato',
// ].join('\n');

// try {
//   (async function () {
//     const string = await csvToJson({ csvString: str, delimiter: ',', outputMode: 'string', headers: false, skipComments: true })
//     console.log(string)
//   })();
// } catch (error) {
//   console.log(error)
// } */

// try {
//   (async function () {
//     let isPromise = csvToJson() instanceof Promise // error: unhandled promise rejection
//     console.log(isPromise ? 'function returns promise.' : 'function does not return a promise.')
//   })()
// } catch (error) {
//   console.log(error)
// }



// // json to csv
// /* try {
//   (async function () {
//     const string = await jsonToCsv({ url: 'https://jsonplaceholder.typicode.com/todos/1', delimiter: ',', outputMode: 'string', headers: false, skipComments: true })
//     console.log(string)
//   })();
// } catch (error) {
//   console.log(error)
// } */

// /* const jsonObj = {
//   "userId": 1,
//   "id": 1,
//   "title": "delectus aut autem",
//   "completed": false
// }

// const jsonStr = JSON.stringify(jsonObj)

// try { // headings not applied
//   (async function () {
//     const string = await jsonToCsv({ jsonString: jsonStr, delimiter: ',', outputMode: 'string', headers: true, skipComments: true })
//     console.log(string)
//   })();
// } catch (error) {
//   console.log(error)
// } */


// /* try {
//   (async function () {
//     let isPromise = jsonToCsv() instanceof Promise // error: unhandled promise rejection
//     console.log(isPromise ? 'function returns promise.' : 'function does not return a promise.')
//   })()
// } catch (error) {
//   console.log(error)
// } */




// // options 
// // const { outputMode = 'string', delimiter = ',', skipComments = false, chunks = true, transformHeader = undefined, headers = false, transform = undefined, headersArray = [] } = config
