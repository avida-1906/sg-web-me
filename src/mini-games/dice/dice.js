/* eslint-disable @typescript-eslint/no-invalid-this */
import * as PIXI from 'pixi.js'

export function Dice(element) {
  const canvasWidth = element.offsetWidth
  const canvasHeight = element.offsetHeight

  let isFirstBet = true

  const app = new PIXI.Application({
    backgroundAlpha: 0,
    resizeTo: element,
    width: canvasWidth,
    height: canvasWidth,
    antialias: true,
    resolution: 2,
    autoDensity: true,
  })

  document.body.appendChild(app.view)

  // Call the setup function to load and draw the SVG file
  setup()
  write_mark_number()

  function setup() {
    const texture = PIXI.Texture.from('/png/mini/union.svg')
    const sliderback = new PIXI.Sprite(texture)

    sliderback.anchor.set(0.5)
    sliderback.x = app.screen.width / 2
    sliderback.y = (app.screen.height * 0.9) / 2

    console.log(app.screen.width)
    console.log(app.screen.height)
    const scaleX = app.screen.width / 960
    const scaleY = app.screen.width / 960

    sliderback.scale.set(scaleX, scaleY)

    app.stage.addChild(sliderback)
    // Add the sprite to the stage or the container
  }

  function write_mark_number() {
    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: (18 * app.screen.width) / 768,
      fontWeight: 'bold',
      fill: '#ffffff',
    })

    const zero_text = new PIXI.Text('0', style)
    zero_text.x = (107 * app.screen.width) / 768
    zero_text.y = (app.screen.height * 0.75) / 2

    const twentyfive_text = new PIXI.Text('25', style)
    twentyfive_text.x = (238 * app.screen.width) / 768
    twentyfive_text.y = (app.screen.height * 0.75) / 2

    const fifty_text = new PIXI.Text('50', style)
    fifty_text.x = (373.5 * app.screen.width) / 768
    fifty_text.y = (app.screen.height * 0.75) / 2

    const seventyfive_text = new PIXI.Text('75', style)
    seventyfive_text.x = (510 * app.screen.width) / 768
    seventyfive_text.y = (app.screen.height * 0.75) / 2

    const hundred_text = new PIXI.Text('100', style)
    hundred_text.x = (638 * app.screen.width) / 768
    hundred_text.y = (app.screen.height * 0.75) / 2

    app.stage.addChild(zero_text)
    app.stage.addChild(twentyfive_text)
    app.stage.addChild(fifty_text)
    app.stage.addChild(seventyfive_text)
    app.stage.addChild(hundred_text)
  }

  // #region two lines behind the slider / red & green
  // Creating a Graphics object
  let scale = 1
  const borderRadius = 10 // You can adjust the radius value here

  const redline = new PIXI.Graphics()
  const redlineR = new PIXI.Graphics()

  // Drawing the rounded rectangle
  redline.beginFill(0xE9103D) // Fill color (red in this example)
  redline.drawRoundedRect(
    0,
    0,
    (271 * canvasWidth) / 768,
    (8 * canvasWidth) / 768,
    borderRadius,
  ) // x, y, width, height, radius
  redline.x = (115 * canvasWidth) / 768
  redline.y = (app.screen.height * 0.895) / 2

  // Adding the graphics object to the stage
  redlineR.beginFill(0xE9103D) // Fill color (red in this example)
  redlineR.drawRoundedRect(
    0,
    0,
    (273 * canvasWidth) / 768,
    (8 * canvasWidth) / 768,
    borderRadius,
  ) // x, y, width, height, radius
  redlineR.x = (111 * canvasWidth) / 768
  redlineR.y = (app.screen.height * 0.895) / 2

  // Adding the graphics object to the stage
  app.stage.scale.set(1)

  const greenline = new PIXI.Graphics()
  const greenlineR = new PIXI.Graphics()

  // Setting up the border radius

  // Drawing the rounded rectangle
  greenline.beginFill(0x00E700) // Fill color (red in this example)
  greenline.drawRoundedRect(
    0,
    0,
    (271 * canvasWidth) / 768,
    (8 * canvasWidth) / 768,
    borderRadius,
  ) // x, y, width, height, radius
  // redline.anchor.set(0.5);
  greenline.x = (384 * canvasWidth) / 768
  // redline.x = app.screen.width / 2;
  greenline.y = (app.screen.height * 0.895) / 2

  // Adding the graphics object to the stage
  app.stage.scale.set(2)

  greenlineR.beginFill(0x00E700) // Fill color (red in this example)
  greenlineR.drawRoundedRect(
    0,
    0,
    (273 * canvasWidth) / 768,
    (8 * canvasWidth) / 768,
    borderRadius,
  ) // x, y, width, height, radius
  // redline.anchor.set(0.5);
  greenlineR.x = (384 * canvasWidth) / 768
  // redline.x = app.screen.width / 2;
  greenlineR.y = (app.screen.height * 0.895) / 2

  // Adding the graphics object to the stage

  app.stage.addChild(greenlineR)
  app.stage.addChild(redlineR)

  app.stage.addChild(greenline)
  app.stage.addChild(redline)

  app.stage.scale.set(2)
  // #endregion

  // #region
  //* **************************** games button with text ***************************/
  const games_texture = PIXI.Texture.from('/png/mini/games.svg')
  const games = new PIXI.Sprite(games_texture)
  games.anchor.set(0.5, 1)
  games.x = 0
  games.y = (app.screen.height * 0.905) / 2
  const scaleX = app.screen.width / 960
  const scaleY = app.screen.width / 960
  games.scale.set(scaleX, scaleY)
  app.stage.addChild(games)

  const games_style = new PIXI.TextStyle({
    fontFamily: 'Inter',
    fontSize: (14 * app.screen.width) / 768,
    fontWeight: 'bold',
    fill: '#B1BAD3',
    dropShadowColor: '#FFFFFF',
    dropShadow: true,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: (0.5 * app.screen.width) / 768,
  })
  const games_text = new PIXI.Text('56.34', games_style)
  games_text.anchor.set(0.5, 1)
  games_text.x = 0
  games_text.y = (app.screen.height * 0.83) / 2
  app.stage.addChild(games_text)

  games.visible = false
  games_text.visible = false
  // container.visible = false;

  element.appendChild(app.view)

  // const ticker = PIXI.ticker.shared;
  let progress = 0
  let initialPos = {
    x: 0,
    y: 0,
  }
  let targetPos = {
    x: 0,
    y: 0,
  }
  let startFontSize = 0
  let targetFontSize = 0
  let startscale = 0
  let targetscale = 1
  let startalpha = 0
  let targetalpha = 1
  const startFontcolor = '#B1BAD3'

  const ticker = PIXI.Ticker.shared
  let numcolor

  function show_dice(num) {
    // console.log(num);
    const val = calc_slider()
    console.log('sniper val', val)
    if (num > val)
      numcolor = '#00B804'

    else
      numcolor = '#E9103D'

    if (isFirstBet) {
      if (num <= 50) {
        initialPos = {
          x: (139 * app.screen.width) / 960,
          y: (app.screen.height * 0.865) / 2,
        }
      }
      else {
        initialPos = {
          x: (821 * app.screen.width) / 960,
          y: (app.screen.height * 0.865) / 2,
        }
      }

      targetPos = {
        x: ((((821 - 139) * num) / 100 + 139) * app.screen.width) / 960,
        y: (app.screen.height * 0.83) / 2,
      }

      startFontSize = (7 * app.screen.width) / 768
      targetFontSize = (14 * app.screen.width) / 768
      startscale = 0.5
      targetscale = 1
      startalpha = 0
      targetalpha = 1
      progress = 0

      games.position.x = initialPos.x
      games.scale.set(startscale)
      games.alpha = startalpha

      games_text.position.set(initialPos.x, initialPos.y)
      games_text.style.fontSize = startFontSize
      games_text.style.fill = startFontcolor
      games_text.alpha = startalpha
      games_text.text = `${num}`

      games.visible = true
      games_text.visible = true

      ticker.add(update)
      isFirstBet = false
    }
    else {
      console.log('isFirstBet false here')
      initialPos = {
        x: targetPos.x,
        y: (app.screen.height * 0.83) / 2,
      }

      targetPos = {
        x: ((((821 - 139) * num) / 100 + 139) * app.screen.width) / 960,
        y: (app.screen.height * 0.83) / 2,
      }

      startFontSize = (14 * app.screen.width) / 768
      targetFontSize = (14 * app.screen.width) / 768
      startscale = 1
      targetscale = 1
      startalpha = 1
      targetalpha = 1
      progress = 0

      games.position.x = initialPos.x
      games.scale.set(startscale)
      games.alpha = startalpha

      games_text.position.set(initialPos.x, initialPos.y)
      games_text.style.fontSize = startFontSize
      games_text.style.fill = startFontcolor
      games_text.alpha = startalpha
      games_text.text = `${num}`

      ticker.add(update)
    }
  }

  function inOutSine(t, w) {
    const f = 0.5
    const k = (-0.5 * (Math.cos((Math.PI * t) / w) - 1) - 0.5) * 2
    return (k >= 0 ? k ** f : -((-k) ** f)) / 2 + 0.5
    // return t / w
  }

  function update(delta) {
    // Calculate the progress of the animation
    progress = Math.min(1, progress + delta * 0.02) // Adjust the multiplier to control the animation speed
    // Interpolate the position, scale, and alpha based on the progress
    const timeMid = 0.45 // time line
    const timeSleep = 0.5
    const timeMax = 0.72
    const timeDelta = timeMax - timeSleep
    const timeMaxSleep = 1 - timeDelta
    const scaleMax = 1.15 // scale
    const hexFont = 0.5
    let interpolatedPosition
    let interpolatedScale
    let interpolatedAlpha
    let interpolatedFontsize
    const deltaPosY = targetPos.y - initialPos.y
    if (progress <= timeMid) {
      const timeProgress = inOutSine(progress, timeMid)
      interpolatedPosition = {
        x: initialPos.x + (targetPos.x - initialPos.x) * timeProgress,
        y: initialPos.y + deltaPosY * timeProgress,
      }
      interpolatedScale
        = startscale + (targetscale - startscale) * timeProgress
      interpolatedAlpha
        = startalpha + (targetalpha - startalpha) * timeProgress
      interpolatedFontsize
        = startFontSize + (targetFontSize - startFontSize) * timeProgress
    }
    else if (progress <= timeSleep) {
      interpolatedPosition = {
        x: targetPos.x,
        y: targetPos.y,
      }
      interpolatedFontsize = targetFontSize
      interpolatedScale = 1
      interpolatedAlpha = 1
    }
    else if (progress <= timeMax) {
      const timeProgress = inOutSine(progress - timeSleep, timeDelta)
      interpolatedPosition = {
        x: targetPos.x,
        y: targetPos.y + deltaPosY * hexFont * timeProgress,
      }
      interpolatedScale = 1 + (scaleMax - 1) * timeProgress
      interpolatedAlpha = 1
      interpolatedFontsize
        = targetFontSize
        + (targetFontSize * scaleMax - targetFontSize) * timeProgress
    }
    else if (progress <= timeMaxSleep) {
      interpolatedPosition = {
        x: targetPos.x,
        y: targetPos.y + hexFont * deltaPosY,
      }
      interpolatedFontsize = targetFontSize * scaleMax
      interpolatedScale = 1 * scaleMax
      interpolatedAlpha = 1
    }
    else {
      const timeProgress = inOutSine(progress - timeMaxSleep, timeDelta)
      interpolatedPosition = {
        x: targetPos.x,
        y:
          targetPos.y
          + (deltaPosY * hexFont - deltaPosY * hexFont * timeProgress),
      }
      interpolatedScale = scaleMax + (1 - scaleMax) * timeProgress
      interpolatedAlpha = 1
      interpolatedFontsize
        = targetFontSize * scaleMax
        + (targetFontSize - targetFontSize * scaleMax) * timeProgress
    }

    // Update the sprite's properties
    games.position.x = interpolatedPosition.x
    games.scale.set(interpolatedScale)
    games.alpha = interpolatedAlpha

    games_text.position.set(interpolatedPosition.x, interpolatedPosition.y)
    games_text.style.fontSize = interpolatedFontsize
    games_text.alpha = interpolatedAlpha

    // Check if the animation is complete
    if (progress === 1) {
      // Animation complete, do something here
      // Stop the animation loop
      games_text.style.fill = numcolor

      ticker.remove(update)
    }
  }

  // #endregion

  const slidertexture = PIXI.Texture.from('/png/mini/slider.svg')
  const slider = new PIXI.Sprite(slidertexture)
  slider.anchor.set(0.5)
  slider.x = app.screen.width / 2
  slider.y = (app.screen.height * 0.91) / 2
  const sliderscaleX = (app.screen.width * 0.98) / 960
  const sliderscaleY = (app.screen.width * 0.98) / 960
  slider.scale.set(sliderscaleX, sliderscaleY)
  slider.interactive = true
  slider.buttonMode = true
  app.stage.addChild(slider)

  slider.on('mousedown', onDragStart).on('touchstart', onDragStart)

  function onDragStart(event) {
    this.data = event.data
    this.dragging = true
  }

  slider.on('mousemove', onDragMove).on('touchmove', onDragMove)

  function onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent)
      if (newPosition.x < (113 * app.screen.width) / 768)
        this.position.x = (113 * app.screen.width) / 768

      else if (newPosition.x > (655 * app.screen.width) / 768)
        this.position.x = (655 * app.screen.width) / 768

      else
        this.position.x = newPosition.x

      redline.width = this.position.x - (113 * app.screen.width) / 768
      greenline.x = this.position.x
      greenline.width = (655 * app.screen.width) / 768 - this.position.x

      setInputVal(calc_slider(this.position.x))
      console.log('position x: ', this.position.x)
    }
  }

  function setSlider(val) {
    // let calc = val...Dice;
    slider.position.x = val
    redline.width = slider.position.x - (113 * app.screen.width) / 768
    greenline.x = slider.position.x
    greenline.width = (655 * app.screen.width) / 768 - slider.position.x
  }

  function invertSlider() {}

  function setInputVal(position) {
    document.getElementById('multiplier').value = (
      (position * (49.5 - 1.0102)) / 96
    ).toFixed(4)
    document.getElementById('rollunder').value = position.toFixed(2)
    document.getElementById('winchance').value = (100 - position).toFixed(4)
  }

  function calc_slider() {
    const val
      = ((slider.position.x - (113 * app.screen.width) / 768) * 100)
      / ((655 * app.screen.width) / 768 - (113 * app.screen.width) / 768)

    const res = Math.floor(val)
    if (res <= 2)
      return 2

    else if (res < 98)
      return res

    else
      return 98
  }

  function calc_position(val) {
    return val * 96 / (49.5 - 1.0102)
  }

  slider
    .on('mouseup', onDragEnd)
    .on('mouseupoutside', onDragEnd)
    .on('touchend', onDragEnd)
    .on('touchendoutside', onDragEnd)

  function onDragEnd() {
    this.dragging = false
    this.data = null
  }

  // -- region -- score history tag bar --

  // Define pill shape dimensions and styles
  const tag_width = 60
  const tag_height = 30
  const tag_cornerRadius = 20

  const tag_position_x = canvasWidth - tag_width - 28
  const tag_position_y = 16
  const tag_gap = 10

  // Create an array to store tags
  const score_tags = []

  // Define new ticker and proccessor
  const tag_ticker = PIXI.Ticker.shared
  let tag_progress = 0

  function show_history(num) {
    // Update the threshold
    const tag_threshold = calc_slider()

    const tag_graphics = new PIXI.Graphics()
    const tag_text = new PIXI.Text(num.toString(), {
      fontSize: 12,
      fill: 'white',
    })
    tag_progress = 0
    tag_graphics.position.x = tag_position_x + tag_width + tag_gap
    tag_graphics.position.y = tag_position_y // Adjust the value as needed

    tag_text.anchor.set(0.5)
    tag_text.position.x = tag_graphics.position.x + tag_width / 2
    tag_text.position.y = tag_graphics.position.y + tag_height / 2

    draw_tag(tag_threshold, tag_text, tag_graphics, num)

    app.stage.addChild(tag_graphics)
    app.stage.addChild(tag_text)
    score_tags.push({
      graphics: tag_graphics,
      text: tag_text,
    })

    app.renderer.render(app.stage)

    tag_ticker.add(transit_tag)
  }

  function draw_tag(threshold, tag_text, tag_graphics, num) {
    if (num > threshold) {
      tag_graphics.beginFill(0x00E700)
      tag_graphics.drawRoundedRect(
        0,
        0,
        tag_width,
        tag_height,
        tag_cornerRadius,
      )
      tag_text.style.fill = 'black'
      tag_graphics.endFill()
    }
    else {
      tag_graphics.beginFill(0x304554)
      tag_graphics.drawRoundedRect(
        0,
        0,
        tag_width,
        tag_height,
        tag_cornerRadius,
      )
      tag_text.style.fill = 'white'
      tag_graphics.endFill()
    }
  }

  function transit_tag(delta) {
    tag_progress = Math.min(1, tag_progress + delta * 0.04)
    const distance = (tag_width + tag_gap) * tag_progress
    const current_delta = 1 - tag_progress
    const firstX = canvasWidth - 28 + tag_gap
    for (let i = score_tags.length - 1; i >= 0; i--) {
      const tag = score_tags[i]
      if (score_tags.length === 6 && i === 0) {
        tag.graphics.alpha = current_delta
        tag.text.alpha = current_delta
      }
      tag.graphics.position.x
        = firstX + (i - score_tags.length + 1) * (tag_width + tag_gap) - distance
      tag.text.position.x
        = firstX
        + tag_width / 2
        + (i - score_tags.length + 1) * (tag_width + tag_gap)
        - distance
    }

    if (tag_progress === 1) {
      if (score_tags.length === 6) {
        app.stage.removeChild(score_tags[0].graphics)
        app.stage.removeChild(score_tags[0].text)
        score_tags.shift()
      }
      tag_ticker.remove(transit_tag)
    }
  }

  function map() {
    app.stage.position._x = 0
    scale = 1
    app.stage.scale.set(scale)
  }

  return {
    map,
    show_dice,
    show_history,
    calc_slider,
    setSlider,
    invertSlider,
    calc_position,
  }
}
