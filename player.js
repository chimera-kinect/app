const webdriver = require('selenium-webdriver')
// const { SerialPort } = require('serialport')
const { ReadlineParser } = require("@serialport/parser-readline")
const { MockBinding } = require('@serialport/binding-mock') // no arduino here lol
const { SerialPortStream } = require('@serialport/stream')

require('dotenv').config()

const getSketchUrl = sketch => `http://localhost:${process.env.PORT}/${sketch}`

const sketches = [
  'lines',
  'circles',
  'alsje',
  'view_frame'
  //...
]

const chromeCapabilities = webdriver.Capabilities.chrome()
const chromeOptions = {
  'excludeSwitches': ['enable-automation'],
  'args': ['--kiosk']
}
chromeCapabilities.set('goog:chromeOptions', chromeOptions)

const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .withCapabilities(chromeCapabilities)
  .build()

const emitRandomInteger = (port) => {
  port.port.emitData(`${Math.floor(Math.random() * sketches.length)}\n`)
  setTimeout(() => emitRandomInteger(port), 10000) // every ten seconds, navigate to a random sketch
}

MockBinding.createPort('/dev/LMAO', { echo: true, record: true }) // create fake serial port that echoes back whatever you send to it
const port = new SerialPortStream({ binding: MockBinding, path: '/dev/LMAO', baudRate: 14400 })

const parser = new ReadlineParser()
port.pipe(parser).on('data', line => {
  driver.get(getSketchUrl(sketches[parseInt(line)]))
})

port.on('open', () => {
  emitRandomInteger(port)
})