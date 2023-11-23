class Spotify {
  constructor() {
    this.origin = new URL(window.location.href).origin
  }

  async play(song) {
    window.addEventListener('beforeunload', (event) => {
      this.pause()
    }) // make sure than when unloading the sketch, spotify gets paused
    
    return fetch(`${this.origin}/play`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ song })
    })
  }

  async pause() {
    return fetch(`${this.origin}/pause`, {
      method: 'POST'
    })
  }
}

export default Spotify = new Spotify()