### How to use sounds

Your `index.html` file should be importing the p5 sound library in addition to the p5 library. The sound library should be imported before your sketch.
```
...
<body>
  <script src="https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.8.0/addons/p5.sound.min.js"></script>
  <script src="sketch.js" type="module"></script>
</body>
...
```

If you want to use an oscillator or anything that's already built in the library, you're good to go. The lines sketch is a good example on how to use an oscillator. If you want to load your own sounds keep reading.

Preload your sound and immediately play in a loop

```
function preload() {
  soundFormats('mp3')
  loadSound('claire.mp3', (sound) => {
    sound.loop()
    sound.play()
  })
}
```

Self-explanatory. If you want to play a sound programmatically, just save the callback function value of the `loadSound()` function and call its play method whenever. Something like:

```
let audio

function preload() {
  soundFormats('mp3')
  loadSound('claire.mp3', (sound) => {
    audio = sound
  })
}

function draw() {
  const coords = kinectManager.detectTouch()
  if (coords)
    if (coords.value >= kinectManager.pushThreshold)
      audio.play()
}
```