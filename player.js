const webdriver = require('selenium-webdriver')

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

driver.get('http://localhost:6372/lines')
  .then(() => driver.sleep(15000))
  .catch(err => console.log(err))
  .finally(() => driver.quit())