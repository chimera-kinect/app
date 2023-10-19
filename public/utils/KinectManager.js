class KinectManager {
  constructor() {
    this.socketHost = 'ws://localhost:12345'
    this.socket = new WebSocket(this.socketHost)
    this.currentFrame = null
    this.isRead = false
    this.firstFrameReceived = false
    this.frameWidth = 1002
    this.frameHeight = 658
    this.canvasWidth = null
    this.canvasHeight = null
    this.pushThreshold = 40

    this.socket.addEventListener('open', (_event) => {
      console.log('Connected to localhost:12345.')
    })
  
    this.socket.addEventListener('message', async (event) => {
      const buf = await event.data.arrayBuffer()
      this.currentFrame = new Uint8Array(buf)
      this.isRead = false
      if (!this.firstFrameReceived) this.firstFrameReceived = true
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

  updateCanvasSize() {
    this.canvasWidth = width
    this.canvasHeight = height
  }

  isCoordinatePushed(x, y) {
    // translates frame size to canvas size
    const xRatio = this.frameWidth / this.canvasWidth
    const yRatio = this.frameHeight / this.canvasHeight

    const targetX = Math.floor(x * xRatio)
    const targetY = Math.floor(y * yRatio)

    if (targetX < 0 || targetX >= this.frameWidth || targetY < 0 || targetY >= this.frameHeight) return 0

    return this.currentFrame[(targetY * this.frameWidth) + targetX] >= this.pushThreshold
  }
}

export default KinectManager = new KinectManager()