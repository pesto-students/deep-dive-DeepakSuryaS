const http = require('http')

const server = http.createServer(function(request, response) {
  response.setHeader("Content-type", "application/json")
  response.setHeader("Access-Control-Allow-Origin", "*")
  response.writeHead(200)

  let dataObj = { id: 1, name: "Surya", email: "example@exam.com" }
  let data = JSON.stringify(dataObj)
  response.end(data)
})


server.listen(1234, function() {
  console.log('Listening on port 1234')
})