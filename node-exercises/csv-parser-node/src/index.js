export * from './lib/parser.mjs'

import { csvToJson, jsonToCsv } from '../src/lib/parser.mjs'

try {

  (async function () {

    // const csvString = `policyID>statecode>county>eq_site_limit>hu_site_limit>fl_site_limit>fr_site_limit>tiv_2011>tiv_2012>eq_site_deductible>hu_site_deductible>fl_site_deductible>fr_site_deductible>point_latitude>point_longitude>line>construction>point_granularity
    // 223488>FL>CLAY COUNTY>328500>328500>328500>328500>328500>348374.25>0>16425>0>0>30.102217>-81.707146>Residential>Wood>1
    // 433512>FL>CLAY COUNTY>315000>315000>315000>315000>315000>265821.57>0>15750>0>0>30.118774>-81.704613>Residential>Wood>1
    // 142071>FL>CLAY COUNTY>705600>705600>705600>705600>705600>1010842.56>14112>35280>0>0>30.100628>-81.703751>Residential>Masonry>1
    // 253816>FL>CLAY COUNTY>831498.3>831498.3>831498.3>831498.3>831498.3>1117791.48>0>0>0>0>30.10216>-81.719444>Residential>Masonry>1

    // 894922>FL>CLAY COUNTY>0>24059.09>0>0>24059.09>33952.19>0>0>0>0>30.095957>-81.695099>Residential>Wood>1

    // `




    // const string = await csvToJson({ csvString, delimiter: '>', outputMode: 'string',headers:true })
    // console.log(string)

    // const string = await jsonToCsv({ path: './samples/sample.json', delimiter: ',',quoteChar:'"',newline: "\r\n", outputMode: 'string', headers: true })
    // console.log(string)



    const stream =await jsonToCsv({ path: './samples/sample.json', delimiter: ',',quoteChar:'"',newlineChar: "\n", outputMode: 'stream', headers: true })
    // console.time()

    //    for await (const line of stream) {
    //      console.log("lklklklklklklk\n",line[0]);
    //   }

    stream.on('data', (data) => {
      console.log("sksnksjkjnsks\n",data)
    })

    stream.on('end', () => {
      console.log("endendend")
    })
    // console.timeEnd()

  })();

} catch (error) {
  console.log(error)
}

