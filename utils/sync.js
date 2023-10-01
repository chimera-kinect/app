const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const prompt = require('prompt-sync')()
require('dotenv').config()

const isCommandAvailable = command => {
  try {
    execSync(`which ${command}`)
    return true
  } catch (error) {
    return false
  }
}

const missingCommands = ['ssh', 'sshpass', 'scp'].filter(command => !isCommandAvailable(command))

if (missingCommands.length > 0) {
  console.error(`The following required utilities are missing: ${missingCommands.join(', ')}`)
  console.error('Please install them and try again.')
} else {
  const publicPath = path.join(process.cwd(), 'public')
  const dirs = fs.readdirSync(publicPath).filter(item => fs.statSync(path.join(publicPath, item)).isDirectory())
  console.log('Which folder should I sync?\n')
  dirs.forEach((dir, index) => {
    console.log(`${index}. ${dir}`)
  })
  const dirIndex = Number(prompt('Enter a number: '))
  if (isNaN(dirIndex) || dirIndex < 0 || dirIndex >= dirs.length) {
    console.error('I need a valid input, bozo.')
    process.exit(0)
  }
  const dirPath = path.join(publicPath, dirs[dirIndex])
  console.log(`Syncing ${dirs[dirIndex]}...`)

  try {
    execSync(`sshpass -p "${process.env.HOST_PASSWORD}" ssh ${process.env.HOST_USERNAME}@${process.env.HOST_IP} 'rmdir /s /q \"N:/home/chimera/project/app/public/${dirs[dirIndex]}\"' || true`, { stdio: 'ignore' })
    execSync(`sshpass -p "${process.env.HOST_PASSWORD}" scp -r ${dirPath} ${process.env.HOST_USERNAME}@${process.env.HOST_IP}:N:/home/chimera/project/app/public`, { stdio: 'ignore' })
    console.log('Synced successfully.')
  } catch (error) {
    console.error('Error:', error.message)
  }
}