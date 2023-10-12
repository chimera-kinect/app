class KinectManager {
  constructor() {
    this.socketHost = 'ws://localhost:12345'
    this.socket = new WebSocket(this.socketHost)
    this.currentFrame = null
    this.nFrames = 0
    this.isRead = false
    this.frameWidth = 1002
    this.frameHeight = 658

    this.socket.addEventListener('open', (_event) => {
      console.log('Connected to localhost:12345.')
    })
  
    this.socket.addEventListener('message', async (event) => {
      const buf = await event.data.arrayBuffer()
      this.currentFrame = new Uint8Array(buf)
      // if (this.currentFrame.find(elem => elem >= 255)) {
      //   console.log('Found touch')
      // }
      this.isRead = false
      this.nFrames += 1
      console.log(this.nFrames)
      // npy.load(buf, (npyObject) => {
      //   this.currentFrame = npyObject.data
      //   this.isRead = false
      //   this.nFrames += 1
      //   console.log(this.nFrames)
      // })
    })
  
    this.socket.addEventListener('error', (event) => {
      console.error('WebSocket error:', event)
    });
  
    this.socket.addEventListener('close', (event) => {
      console.log("Socket closed", event)
    })
  }

  get frame() {
    this.isRead = true
    return this.currentFrame
  }

  get isFrameRead() {
    return this.isRead
  }
}

export default KinectManager = new KinectManager()