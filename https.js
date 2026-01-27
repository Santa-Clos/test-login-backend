const http = require('node:http')
const fs = require('node:fs')
const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.end('Bienvenido a mi página de inicio')
  } else if (req.url === '/contact') {
    res.end('Bienvenido a mi página de contacto')
  } else if (req.url === '/imagen.png') {
    fs.readFile('./gato.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1> Internal Server Error </h1>')
      } else {
        res.setHeader('Content-type', 'image/png')
        res.end(data)
      }
    })
  } else {
    res.statusCode = 404
    res.end('404 ERROR')
  }
})

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
