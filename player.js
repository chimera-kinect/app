const webdriver = require('selenium-webdriver')
const { SerialPort } = require('serialport')
const { ReadlineParser } = require("@serialport/parser-readline")
const path = require('path')
const fs = require('fs')

require('dotenv').config()

const sketches = []
const getSketchUrl = sketch => `http://localhost:${process.env.PORT}/${sketch}`

const publicPath = path.join(__dirname, 'public')
const dirs = fs.readdirSync(publicPath).filter(item => fs.statSync(path.join(publicPath, item)).isDirectory())

dirs.forEach(dir => {
  if (dir.endsWith('_sketch')) {
    sketches.push(dir.replace('_sketch', ''))
  }
})

const chromeCapabilities = webdriver.Capabilities.chrome()
const chromeOptions = {
  'excludeSwitches': ['enable-automation'],
  'args': ['--autoplay-policy=no-user-gesture-required', '--window-position=5000,0', '--kiosk']
}
chromeCapabilities.set('goog:chromeOptions', chromeOptions)

const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .withCapabilities(chromeCapabilities)
  .build()

SerialPort.list()
  .then((list) => {
    const path = list.find(elem => elem.serialNumber === process.env.ARDUINO_SN)?.path
    if (!path) throw new Error('Arduino not found. Have you set the ARDUINO_SN environment variable? Is the Arduino connected?')
    const port = new SerialPort({ path, baudRate: 9600 })

    const parser = new ReadlineParser()
    port.pipe(parser).on('data', async line => {
      const data = line.trim()
      if (data === 'OFF') {
        await driver.quit()
        process.exit(0)
      }
      const intVal = parseInt(data)
      if (intVal >= sketches.length) return
      await driver.get(getSketchUrl(sketches[intVal]))
    })
  })
  .catch(async (err) => {
    console.error(err)
    await driver.quit()
    process.exit(1)
  })

