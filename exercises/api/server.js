const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

/**
 * this function is blocking, fix that
 * @param {String} name full file name of asset in asset folder
 */
const findAsset = (name) => {
  const assetPath = path.join(__dirname, 'assets', name)
  return fs.readFileSync(assetPath, {encoding: 'utf-8'}).toString()
}

const hostname = '127.0.0.1'
const port = 3000

// log incoming request coming into the server. Helpful for debugging and tracking
const logRequest = (method, route, status) => console.log(method, route, status)

const router = {
  '/': {
    'file':'index.html',
    'mime_type': 'text/html'
  },
  '/style.css': {
    'file': 'style.css',
    'mime_type': 'text/css'
  }

}

const server = http.createServer((req, res) => {
  const method = req.method
  const route = url.parse(req.url).pathname
  console.log('outside async');

  const handleRequest = async () => {
    console.log('inside async')
    try {
      console.log('inside try')
      res.writeHead(200, {'Content-Type': router[route]['mime_type']})
      await res.write(findAsset(router[route]['file']))
      console.log('after await')
      logRequest(method, route, 200)
      res.end()
    } catch (e) {
      console.log(e)
      res.writeHead(404, {'Content-Type': 'text/html'})
      res.write('404')
      logRequest(method, route, 404)
      res.end()
    }
  }
  handleRequest()

})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
