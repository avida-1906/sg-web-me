import Matter from 'matter-js'
import * as PIXI from 'pixi.js'
import * as TWEEN from '@tweenjs/tween.js'
import { GlobalFunc } from './GlobalFunc'

export function Plinko(element) {
  /** ******** Begin Settings For Engine, PIXI  **********/
  const Engine = Matter.Engine
  const Render = Matter.Render
  const Runner = Matter.Runner
  const Bodies = Matter.Bodies
  const Body = Matter.Body
  const Composite = Matter.Composite
  const Events = Matter.Events
  const canvasWidth = element.offsetWidth
  const canvasHeight = element.offsetHeight
  // const canvasWidth = 700
  // const canvasHeight = 630
  const engine = Engine.create()

  const initialWidth = window.innerWidth
  const initialHeight = window.innerHeight
  // engine.timing.timeScale = 1.1;
  engine.timing.timeScale = 2

  const sceneObjects = []

  const app = new PIXI.Application({
    backgroundAlpha: 0,
    resizeTo: element,
    width: canvasWidth,
    height: canvasHeight,
    antialias: true,
    resolution: 2,
    autoDensity: true,
  })

  let scale = 1
  app.stage.scale.set(scale)

  element.appendChild(app.view)

  app.ticker.add(() => {
    sceneObjects.forEach((object) => {
      object.sprite.position = object.body.position
      object.sprite.rotation = object.body.angle
    })
  })

  Runner.run(engine)
  Events.on(engine, 'collisionStart', collision)

  /** ******** End Settings For Engine, PIXI  **********/

  /** ******** Begin Global Variables  **********/
  const globalFunc = GlobalFunc()
  const ParticleRadius = globalFunc.initialDrawValue.ParticleRadius
  const GapWidth = globalFunc.initialDrawValue.GapWidth
  const PointRadius = globalFunc.initialDrawValue.PointRadius
  const MapGap = globalFunc.initialDrawValue.MapGap
  /** ******** End Global Variables  **********/

  /** ******** Begin Local Variables  **********/
  let scoreState = 10000
  let amountState = 0
  let levelState = 'Medium'
  let rowNumState = 16
  let numState = 0
  let last = 0
  const currency = 1300
  let originalY = 0
  let stageLength = 0

  let maskX = 0
  let maskY = 0
  let maskWidth = 0
  let maskHeight = 0

  const scoreArray = []
  const objects = []
  let tweensArray = []

  const mask = new PIXI.Graphics()
  /** ******** End Local Variables  **********/

  /** ******** Begin Draw functions  **********/
  function Point(x, y, row, col, color = 0xD3D3D3) {
    const options = {
      isStatic: true,
    }

    const metter = Bodies.circle(x, y, PointRadius, options)
    metter.label = 'point'
    metter.row = row
    metter.col = col
    Composite.add(engine.world, metter)

    const graphics = new PIXI.Graphics()
    graphics.beginFill(color)
    graphics.drawCircle(x, y, PointRadius)
    graphics.zIndex = 2
    graphics.endFill()
    app.stage.addChild(graphics)
  }

  function Particle(x, y, r, road) {
    const options = {
      restitution: 0,
      friction: 0,
      collisionFilter: {
        group: -1,
      },
    }

    const metter = Bodies.circle(x, y, r, options)
    metter.label = 'particle'
    metter.road = {
      list: road,
      id: [],
    }
    Composite.add(engine.world, metter)
    let texture = PIXI.Texture.from('/png/mini/plinko/ball.png?8')
    if (levelState === 'Low')
      texture = PIXI.Texture.from('/png/mini/plinko/ball-low.png?8')

    else if (levelState === 'Medium')
      texture = PIXI.Texture.from('/png/mini/plinko/ball.png?8')

    else
      texture = PIXI.Texture.from('/png/mini/plinko/ball-high.png?8')

    const sprite = new PIXI.Sprite(texture)
    sprite.width = ParticleRadius * 2
    sprite.height = ParticleRadius * 2
    sprite.pivot.set(ParticleRadius * 2, ParticleRadius * 2)
    app.stage.addChild(sprite)

    sceneObjects.push({
      body: metter,
      sprite,
    })
  }

  function Basket(x, y, gap, text) {
    const options = {
      isStatic: true,
    }

    const metter = Bodies.rectangle(x, y, gap, gap, options)
    metter.label = 'basket'
    Composite.add(engine.world, metter)

    if (text === undefined)
      return

    const color = globalFunc.selectFromText(
      rowNumState,
      levelState,
      text,
      'color',
    )

    const shadowColor = globalFunc.selectFromText(
      rowNumState,
      levelState,
      text,
      'shadow',
    )

    let fontSize = 12

    const rectangle = new PIXI.Graphics()
    const shadow = new PIXI.Graphics()
    rectangle.beginFill(color)
    shadow.beginFill(shadowColor)

    const cornerRadius = (gap * 10) / 120
    if (window.innerWidth < 1050) {
      rectangle.drawRoundedRect(
        -gap / 2,
        -gap / 8 / scale,
        gap - 4,
        (2 * gap) / 8 / scale,
        cornerRadius,
      )
      shadow.drawRoundedRect(
        -gap / 2,
        -gap / 8 / scale + 2 / scale,
        gap - 4,
        (2 * gap) / 8 / scale,
        cornerRadius,
      )
      fontSize = 6
    }
    else {
      rectangle.drawRoundedRect(
        -gap / 2,
        -gap / 4 / scale,
        gap - 4,
        (2 * gap) / 4 / scale,
        cornerRadius,
      )
      shadow.drawRoundedRect(
        -gap / 2,
        -gap / 4 / scale + 4 / scale,
        gap - 4,
        (2 * gap) / 4 / scale,
        cornerRadius,
      )
    }
    rectangle.endFill()
    shadow.endFill()

    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontWeight: 600,
      fontSize: fontSize / scale,
      fill: '#000000',
      align: 'center',
    })

    const label = new PIXI.Text(`${text}x`, style)
    label.anchor.set(0.5, 0.5)

    const container = new PIXI.Container()
    container.position.x = x
    container.position.y = y
    container.interactive = true
    container.buttonMode = true
    container.addChild(shadow)
    container.addChild(rectangle)
    container.addChild(label)

    const object = {
      body: metter,
      sprite: container,
    }

    sceneObjects.push(object)
    app.stage.addChild(container)
    // container.on("mouseover", function (e) {
    //   let sum = 0;
    //   for (let i = 0; i < scoreArray.length; i++) {
    //     if (scoreArray[i] === text) {
    //       sum += (scoreArray[i] - 1) * amountState;
    //     }
    //   }
    //   let percent = globalFunc.selectFromText(
    //     rowNumState,
    //     levelState,
    //     text,
    //     "percent"
    //   );
    //   document.getElementById("profit").textContent =
    //     "$" + Math.round(sum * currency).toFixed(2);
    //   document.getElementById("bitProfit").value = Math.round(
    //     (text - 1) * amountState
    //   ).toFixed(2);
    //   document.getElementById("chance").value = percent * 100;
    //   document.getElementById("overlay").style.display = "flex";
    // });

    // container.on("mouseout", function (e) {
    //   document.getElementById("overlay").style.display = "none";
    // });

    container.on('mousedown', (e) => {
      const target = GetIndexFromText(text, x)
      add(Number.parseInt(target))
    })

    metter.metter = {
      text,
      color,
      x,
      y,
      gap,
    }
  }

  function ScoreBoard(x, y, gap, text) {
    const options = {
      isStatic: true,
    }
    const metter = Bodies.rectangle(x, y, gap, gap, options)
    metter.label = 'scoreboard'

    if (text === undefined)
      return

    const color = globalFunc.selectFromText(
      rowNumState,
      levelState,
      text,
      'color',
    )

    const rectangle = new PIXI.Graphics()
    const border = new PIXI.Graphics()
    rectangle.beginFill(color)
    border.beginFill(0x000000)
    rectangle.drawRect(
      -gap / 2 / scale,
      -gap / 2 / scale,
      gap / scale,
      gap / scale - 2 / scale,
    )
    border.drawRect(
      -gap / 2 / scale,
      -gap / 2 / scale - 2 / scale,
      gap / scale,
      1 / 8,
    )
    border.endFill()
    rectangle.endFill()

    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 14 / scale,
      fontWeight: 600,
      fill: '#000000',
      align: 'center',
    })

    const label = new PIXI.Text(`${text}x`, style)
    label.anchor.set(0.5, 0.5)

    const container = new PIXI.Container()
    container.position.x = x
    container.position.y = y
    container.interactive = true
    container.buttonMode = true
    rectangle.blendMode = PIXI.BLEND_MODES.NORMAL
    label.blendMode = PIXI.BLEND_MODES.NORMAL
    container.addChild(rectangle)
    container.addChild(border)
    container.addChild(label)

    const object = {
      body: metter,
      sprite: container,
    }

    sceneObjects.push(object)
    app.stage.addChild(container)

    metter.metter = {
      text,
      color,
      x,
      y,
      gap,
    }

    if (Number.parseFloat(text) > 1) {
      const graphics = new PIXI.Graphics()

      let reqAnim
      const breathSpeed = 2
      const rMax = 15
      const rMin = 0
      let r = rMin
      let opacity = 0.7
      const rDiff = rMax - rMin
      const opacityIncr = 1 / rDiff / 1.2

      animate()

      function animate() {
        graphics.clear()
        graphics.lineStyle(r, color, opacity)
        graphics.beginFill(0, 0)

        const rectWidth = gap / scale
        const rectHeight = gap / scale
        const rectX = x - rectWidth / 2
        const rectY = y + 25 / scale
        graphics.drawRoundedRect(rectX, rectY, rectWidth, rectHeight, 5)
        graphics.endFill()

        app.stage.addChild(graphics)
        if (r === rMax) {
          cancelAnimationFrame(reqAnim)
          reqAnim = undefined
          return
        }
        r += breathSpeed
        opacity -= opacityIncr
        reqAnim = requestAnimationFrame(animate)
      }

      setTimeout(() => {
        if (reqAnim) {
          cancelAnimationFrame(reqAnim)
          reqAnim = undefined
        }
        graphics.destroy()
      }, 400)
    }

    object.sprite.mask = mask

    return object
  }
  /** ******** End Draw functions  **********/

  /** ******** Begin Animations  **********/
  function Splash(body) {
    const graphics = new PIXI.Graphics()

    let reqAnim
    const breathSpeed = 2
    const rMax = 15
    const rMin = 0
    let r = rMin
    let opacity = 0.9
    const rDiff = rMax - rMin
    const opacityIncr = 1 / rDiff / 1.2

    animate()
    function animate() {
      graphics.clear()
      graphics.lineStyle(r, 0xFFFFFF, opacity)
      graphics.beginFill(0, 0)
      graphics.drawCircle(
        body.position.x,
        body.position.y,
        body.circleRadius * 1.5,
      )
      graphics.endFill()

      app.stage.addChild(graphics)
      if (r === rMax) {
        cancelAnimationFrame(reqAnim)
        reqAnim = undefined
        return
      }
      r += breathSpeed
      opacity -= opacityIncr
      reqAnim = requestAnimationFrame(animate)
    }
    setTimeout(() => {
      if (reqAnim) {
        cancelAnimationFrame(reqAnim)
        reqAnim = undefined
      }
      graphics.destroy()
    }, 400)
  }

  function BasketSplash(body) {
    const graphics = new PIXI.Graphics()

    let reqAnim
    const breathSpeed = 2
    const rMax = 15
    const rMin = 0
    let r = rMin
    let opacity = 0.7
    const rDiff = rMax - rMin
    const opacityIncr = 1 / rDiff / 1.2

    animate()

    function animate() {
      graphics.clear()
      graphics.lineStyle(r, body.metter.color, opacity)
      graphics.beginFill(0, 0)

      const rectWidth = 60
      let rectHeight = 40 / scale
      if (window.innerWidth < 1050)
        rectHeight = 20 / scale

      const rectX = body.position.x - rectWidth / 2
      const rectY = body.position.y - rectHeight / 2
      graphics.drawRoundedRect(rectX, rectY, rectWidth, rectHeight, 10)

      graphics.endFill()

      app.stage.addChild(graphics)
      if (r === rMax) {
        cancelAnimationFrame(reqAnim)
        reqAnim = undefined
        return
      }
      r += breathSpeed
      opacity -= opacityIncr
      reqAnim = requestAnimationFrame(animate)
    }

    setTimeout(() => {
      if (reqAnim) {
        cancelAnimationFrame(reqAnim)
        reqAnim = undefined
      }
      graphics.destroy()
    }, 400)

    const targetY = originalY + 10
    if (body.position.y !== targetY) {
      const moveDownTween = new TWEEN.Tween(body.position)
        .to({ y: targetY }, 100)
        .easing(TWEEN.Easing.Quadratic.Out)

      const moveBackTween = new TWEEN.Tween(body.position)
        .to({ y: originalY }, 100)
        .easing(TWEEN.Easing.Quadratic.Out)

      moveDownTween.chain(moveBackTween)
      moveDownTween.start()

      app.ticker.add(() => {
        TWEEN.update()
      })
    }
  }
  /** ******** End Animations  **********/

  /** ******** Begin Assist Functions  **********/
  function getIndexFromCoordinate(row, col) {
    return (row * (row - 1)) / 2 + (row - 1) * 2 + col
  }

  function GetSettings(betAmount, betLevel, betRowNum, betNum, score) {
    if (
      betAmount === undefined
      || betLevel === undefined
      || betRowNum === undefined
      || betNum === undefined
      || score === undefined
    ) {
      console.log('undefined')
    }
    else {
      amountState = betAmount
      levelState = betLevel
      rowNumState = betRowNum
      numState = betNum
      scoreState = score
    }
  }

  function GetIndexFromText(text, x) {
    const basket = globalFunc.baskets[levelState][`_${rowNumState}`]
    let id = 0

    for (let i = 0; i < basket.length; i++) {
      if (basket[i] === text) {
        if (x <= canvasWidth / 2)
          id = basket.length - i

        else
          id = i + 1
      }
    }
    return id
  }

  function CheckBounds(row, pointId) {
    if (pointId === 1 + ((row - 1) * (row + 4)) / 2)
      return 'left'

    else if (pointId === (row * (row + 5)) / 2)
      return 'right'

    else
      return 'notBound'
  }

  function SearchRoute(target) {
    const pointIds = []
    const pointDirs = []

    const rows = Number.parseInt(rowNumState)
    let gapLeft = target
    let gapRight = rows + 2 - target
    let currentIndex = getIndexFromCoordinate(rows, target)

    for (let i = rows; i > 0; i--) {
      let flag = gapLeft > 0 ? (Math.random() > 0.5 ? 0 : 1) : 1
      if (gapRight === 0)
        flag = 0

      if (flag === 0) {
        last = Math.random() < 0.5 ? 1 : 3
        gapLeft--
      }
      if (flag === 1) {
        last = Math.random() < 0.5 ? 0 : 2
        gapRight--
      }
      currentIndex += flag
      pointIds.push(currentIndex)
      if (last === 0 || last === 1)
        pointDirs.push(last, last + 4)

      else
        pointDirs.push(last)

      currentIndex -= i + 2
    }
    return [pointIds, pointDirs]
  }

  function UpdateScore(body) {
    let lastPos = canvasHeight / 3 / scale - 50 / scale
    if (objects.length > 1)
      lastPos = objects[objects.length - 1].body.position.y - 50 / scale

    if (window.innerWidth < 1050) {
      lastPos = canvasHeight / 8 / scale - 35 / scale / 2
      if (objects.length > 1)
        lastPos = objects[objects.length - 1].body.position.y - 35 / scale
    }
    const text = body.metter.text
    scoreState += (text - 1) * 100
    scoreArray.push(text)
    const object = ScoreBoard(
      maskX + maskWidth / 2,
      lastPos,
      maskWidth * scale,
      text,
    )

    stopTween()
    objects.push(object)
    tweenUpdate()
  }

  function stopTween() {
    for (let i = 0; i < tweensArray.length; i++)
      tweensArray[i].stop()

    tweensArray = []
    removeScoreboard()
  }

  function tweenUpdate() {
    let distance = -50 / scale
    if (objects.length > 1) {
      distance
        = objects[objects.length - 1].body.position.y - canvasHeight / 3 / scale
    }
    if (window.innerWidth < 1050) {
      distance = -35 / scale
      if (objects.length > 1) {
        distance
          = objects[objects.length - 1].body.position.y
          - canvasHeight / 8 / scale
          - maskHeight / 8
      }
    }
    for (let i = 0; i < objects.length; i++) {
      const targetY = objects[i].body.position.y - distance
      const object = objects[i]
      const moveDown = new TWEEN.Tween(object.body.position)
        .to({ y: targetY }, 200)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start()
      tweensArray.push(moveDown)
    }
  }

  function removeScoreboard() {
    for (let i = 0; i < objects.length; i++) {
      if (window.innerWidth < 1050) {
        if (
          objects[i].body.position.y
          > canvasHeight / 8 / scale + 150 / scale
        ) {
          const object = objects.splice(i, 1)
          app.stage.removeChild(object[0].sprite)
          delete object[0]
          i--
        }
      }
      else {
        if (
          objects[i].body.position.y
          > canvasHeight / 3 / scale + 200 / scale
        ) {
          const object = objects.splice(i, 1)
          app.stage.removeChild(object[0].sprite)
          delete object[0]
          i--
        }
      }
    }
  }
  /** ******** End Assist Functions  **********/

  /** ******** Begin Engine, Canvas functionalities  **********/
  function collision(event) {
    const pairs = event.pairs
    for (let i = 0; i < pairs.length; i++) {
      const bodyA = pairs[i].bodyA
      const bodyB = pairs[i].bodyB
      if (bodyA.label === 'point')
        Splash(bodyA)

      if (bodyB.label === 'point')
        Splash(bodyB)

      if (bodyA.label === 'particle' && bodyB.label === 'point')
        Road(bodyA, bodyB)

      if (bodyB.label === 'particle' && bodyA.label === 'point')
        Road(bodyB, bodyA)

      if (bodyA.label === 'basket' && bodyB.label === 'particle') {
        RemoveParticle(bodyB)
        BasketSplash(bodyA)
        UpdateScore(bodyA)
      }
      if (bodyB.label === 'basket' && bodyA.label === 'particle') {
        RemoveParticle(bodyA)
        BasketSplash(bodyB)
        UpdateScore(bodyB)
      }
    }
  }

  function Road(body, point) {
    Body.setStatic(body, true)
    const bound = CheckBounds(point.row, point.col)
    if (bound === 'left' && body.road.list[0] === 0) {
      body.road.list.splice(0, 2)
      body.road.list.splice(0, 0, 2)
    }
    else if (bound === 'right' && body.road.list[0] === 1) {
      body.road.list.splice(0, 2)
      body.road.list.splice(0, 0, 3)
    }

    if (!body.road.id.includes(point.id)) {
      const road = body.road.list.shift()
      let velocity = { x: 0, y: 0 }
      if (road === 0) {
        velocity = { x: -3.2, y: -1.6 }
      }
      else if (road === 1) {
        velocity = { x: 3.2, y: -1.6 }
      }
      else if (road === 2 || road === 3) {
        Body.setPosition(body, {
          x: point.position.x,
          y: point.position.y - point.circleRadius * 2,
        })
        velocity = { x: road === 2 ? -1 : 1, y: -3.2 }
      }
      else if (road === 4) {
        velocity = { x: 0.7, y: 0 }
      }
      else if (road === 5) {
        velocity = { x: -0.7, y: 0 }
      }
      setTimeout(() => {
        Body.setVelocity(body, velocity)
      }, 0)
      body.road.id.push(point.id)
    }
    else {
      setTimeout(() => {
        Body.setVelocity(body, {
          x: Math.random() < 0.5 ? -1 : 1,
          y: -3.5,
        })
      }, 0)
    }
    Body.setStatic(body, false)
  }

  function map() {
    const newWindowWidth = window.innerWidth
    const newCanvasHeight = element.offsetHeight
    const newWidth = window.innerWidth
    let heightScale = newCanvasHeight / canvasHeight
    if (newCanvasHeight > 310)
      heightScale = newWindowWidth / initialWidth

    const rows = globalFunc.baskets[levelState][`_${rowNumState}`]
    app.stage.position._x = 0
    let col = 3
    const increment = 1
    const gap = GapWidth * 2 * MapGap

    clear()
    scale = (9 * heightScale) / rows.length
    originalY = rows.length * gap - 15 * scale
    let id = 0
    for (let i = 1; i <= rows.length; i++) {
      const space = (canvasWidth - gap * col) / 2
      for (let j = 1; j <= col; j++) {
        if (i < rows.length) {
          id++
          // const index = getIndexFromCoordinate(i, j);
          // if (routes.indexOf(index) >= 0) {
          //   new Point(space + j * gap - GapWidth * MapGap, i * gap, 0xff0000);
          // } else {
          //   new Point(space + j * gap - GapWidth * MapGap, i * gap);
          // }
          const a = new Point(space + j * gap - GapWidth * MapGap, i * gap, i, id)
          console.log('🚀 ~ file: Plinko.js:804 ~ map ~ a:', a)
        }
        else {
          if (j > 1) {
            const b = new Basket(
              space + j * gap - GapWidth * MapGap,
              i * gap - 15 * scale,
              gap,
              rows[j - 2],
            )
            console.log('🚀 ~ file: Plinko.js:814 ~ map ~ b:', b)
          }
        }
      }
      col += increment
    }
    app.stage.scale.set(scale)
    if (newWidth > 1050)
      app.stage.position.x = ((1 - scale) * canvasWidth) / 2

    else
      app.stage.position.x = (canvasWidth - scale * canvasWidth) / 2 - 150

    stageLength = app.stage.children.length

    mask.clear()
    mask.beginFill(0xFFFFFF)
    if (newWidth > 1050) {
      if (scale === 1) {
        maskX = 600
        maskY = canvasHeight / 3 / scale - 25 / scale
        maskHeight = 198 / scale
        maskWidth = 50 / scale
      }
      else {
        maskX = app.stage.position.x / (1 - scale) + 200 / scale + 50 / scale
        maskY = canvasHeight / 3 / scale - 25 / scale
        maskHeight = 198 / scale
        maskWidth = 50 / scale
      }
    }
    else {
      maskX
        = canvasWidth / scale / 2 + 5 / scale - app.stage.position.x / scale
      maskY = canvasHeight / 8 / scale
      maskHeight = 138 / scale
      maskWidth = 35 / scale
    }
    mask.drawRoundedRect(maskX, maskY, maskWidth, maskHeight, 10 / scale)
    mask.endFill()
    app.stage.addChild(mask)

    const rectangle = new PIXI.Graphics()
    rectangle.beginFill(0xFFFFFF)
    rectangle.drawRect(
      -gap / 2 / scale,
      -gap / 4 / scale,
      (gap - 4) / scale,
      gap / 2 / scale,
    )
    rectangle.endFill()
    rectangle.mask = mask
  }

  function add(target) {
    const [routes, dirRoute] = SearchRoute(target)
    routes.reverse()
    if (routes[0] === 1) {
      if (routes[1] === 5) {
        Math.random() > 0.5
          ? new Particle(canvasWidth / 2 - 60, 0, ParticleRadius, dirRoute)
          : new Particle(canvasWidth / 2 - 30, 0, ParticleRadius, dirRoute)
      }
      else {
        const a = new Particle(canvasWidth / 2 - 60, 0, ParticleRadius, dirRoute)
        console.log('🚀 ~ file: Plinko.js:879 ~ add ~ a:', a)
      }
    }
    else if (routes[0] === 2) {
      if (routes[1] === 5) {
        Math.random() > 0.5
          ? new Particle(canvasWidth / 2, 0, ParticleRadius, dirRoute)
          : new Particle(canvasWidth / 2 - 30, 0, ParticleRadius, dirRoute)
      }
      else {
        Math.random() > 0.5
          ? new Particle(canvasWidth / 2, 0, ParticleRadius, dirRoute)
          : new Particle(canvasWidth / 2 + 30, 0, ParticleRadius, dirRoute)
      }
    }
    else if (routes[0] === 3) {
      if (routes[1] === 5) {
        Math.random() > 0.5
          ? new Particle(canvasWidth / 2 + 60, 0, ParticleRadius, dirRoute)
          : new Particle(canvasWidth / 2 + 30, 0, ParticleRadius, dirRoute)
      }
      else {
        const b = new Particle(canvasWidth / 2 + 60, 0, ParticleRadius, dirRoute)
        console.log('🚀 ~ file: Plinko.js:902 ~ add ~ b:', b)
      }
    }
    // new Particle(canvasWidth / 2, 0, ParticleRadius, dirRoute);
  }

  function clear() {
    Composite.clear(engine.world)
    app.stage.removeChildren()
    app.stage.children.forEach((child) => {
      child.destroy(true)
    })
  }

  function RemoveParticle(body) {
    for (let i = 0; i < sceneObjects.length; i++) {
      if (sceneObjects[i].body.id === body.id) {
        Composite.remove(engine.world, sceneObjects[i].body)
        app.stage.removeChild(sceneObjects[i].sprite)
        delete sceneObjects[i]
        sceneObjects.splice(i, 1)
        break
      }
    }
  }
  /** ******** End Engine, Canvas functionalities  **********/

  return {
    map,
    add,
    clear,
    GetSettings,
  }
}
