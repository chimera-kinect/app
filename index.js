const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const { exec } = require('child_process')

require('dotenv').config()

const app = express()
const port = process.env.PORT 

if (process.argv.includes('--spotify')) {
  exec(`spotify status`, (error, _stdout, _stderr) => {
    if (error) {
      console.error('Spotify is not active')
      process.exit(1)
    }

    exec(`spotify repeat track`, (error, _stdout, _stderr) => {
      if (error) {
        console.error('Weird Spotify error, shouldn`t happen, lol')
        process.exit(1)
      }
    })
  })
}

// Find all directories in the 'public' folder
const publicPath = path.join(__dirname, 'public')
const dirs = fs.readdirSync(publicPath).filter(item => fs.statSync(path.join(publicPath, item)).isDirectory())

// Home, contains links to all the sketches
app.get('/', (_req, res) => {
  const html = `
    <html>
      <head>
        <title>Sketches</title>
      </head>
      <body>
        <h1>Sketches</h1>
        <ul>
          ${dirs
            .filter(dir => dir.endsWith('_sketch'))
            .map(dir => `<li><a href="/${dir.replace('_sketch', '')}">${dir.replace('_sketch', '')}</a></li>`)
            .join('')}
        </ul>
      </body>
    </html>
  `

  res.send(html);
});

// For each dir in public
dirs.forEach(dir => {
  if (dir.endsWith('_sketch')) {
    const routeName = '/' + dir.replace('_sketch', '')
    // If it's a sketch, serve the folder statically...
    app.use(routeName, express.static(path.join(publicPath, dir)))
    // ...and register a route to serve the 'index.html' file within it
    app.get(routeName, (_req, res) => {
      res.sendFile(path.join(publicPath, dir, 'index.html'))
    })
  } else {
    // Otherwise, just serve the folder statically
    const routeName = '/' + dir
    app.use(routeName, express.static(path.join(publicPath, dir)))
  }
})

app.use('/utils', express.static(path.join(__dirname, 'utils')))

const jsonParser = bodyParser.json()

app.post('/play', jsonParser, (req, res) => {
  const { song } = req.body

  exec(`spotify play "${song}"`, (error, stdout, stderr) => {
    if (error) return res.status(500).send(error.message)
    if (stderr) return res.status(500).send(stderr)
    res.send(stdout)
  })
})

app.post('/pause', (_req, res) => {
  exec(`spotify pause`, (error, stdout, stderr) => {
    if (error) return res.status(500).send(error.message)
    if (stderr) return res.status(500).send(stderr)
    res.send(stdout)
  })
})

if (process.argv.includes('--spotify')) {
  // keep spotify session alive
  setInterval(() => {
    exec(`spotify repeat track`, (error, _stdout, _stderr) => {
      if (error) {
        console.error('Spotify is not active')
      }
      console.log('Spotify session alive...')
    })
  }, 1000 * 60)
}

app.listen(port, () => {
  console.log(`Now listening on port ${port}`)
  console.log(`http://localhost:${port}`)
})