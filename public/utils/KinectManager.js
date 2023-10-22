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
    this.mockCircleX = 0
    this.mockCircleY = 0
    this.mockCircleMaxRadius = 0
    this.mockPulsationPhase = 0

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
      setInterval(() => {
        this.generateFakeFrame()
      }, 100) // couldn't connect to the kinect, so we'll generate fake frames on a 100ms interval
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

  generateFakeFrame() {
    const fakeFrame = new Uint8Array(this.frameWidth * this.frameHeight)

    if (this.mockPulsationPhase === 0) {
      this.mockCircleX = Math.floor(Math.random() * this.frameWidth)
      this.mockCircleY = Math.floor(Math.random() * this.frameHeight)
      this.mockCircleMaxRadius = Math.floor(Math.random() * (100 - 50) + 50)
    }

    let radius
    if (this.mockPulsationPhase <= this.mockCircleMaxRadius) {
      radius = this.mockPulsationPhase
    } else if (this.mockPulsationPhase <= 2 * this.mockCircleMaxRadius) {
      radius = 2 * this.mockCircleMaxRadius - this.mockPulsationPhase
    } else {
      radius = 0
    }

    for (let x = 0; x < this.frameWidth; x++) {
      for (let y = 0; y < this.frameHeight; y++) {
        const distanceToCenterOfMockCircle = Math.sqrt((x - this.mockCircleX) ** 2 + (y - this.mockCircleY) ** 2)

        fakeFrame[y * this.frameWidth + x] = distanceToCenterOfMockCircle < radius ? this.pushThreshold + 50 - distanceToCenterOfMockCircle : 0
      }
    }

    this.mockPulsationPhase += 2
    if (this.mockPulsationPhase > 2 * this.mockCircleMaxRadius) {
      this.mockPulsationPhase = 0
    }

    this.currentFrame = fakeFrame
    this.isRead = false
    if (!this.firstFrameReceived) this.firstFrameReceived = true
  }
}

export default KinectManager = new KinectManager()