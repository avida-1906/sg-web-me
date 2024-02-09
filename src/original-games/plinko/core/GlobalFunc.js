export function GlobalFunc() {
  const changePercent = (req) => {
    const sum = req.reduce((acc, val) => acc + val, 0)
    const res = req.map(val => val / sum)
    return res
  }

  const baskets = {
    Low: {
      _8: [13, 3, 1.3, 0.7, 0.4, 0.7, 1.3, 3, 13],
      _9: [18, 4, 1.7, 0.9, 0.5, 0.5, 0.9, 1.7, 4, 18],
      _10: [22, 5, 2, 1.4, 0.6, 0.4, 0.6, 1.4, 2, 5, 22],
      _11: [24, 6, 3, 1.8, 0.7, 0.5, 0.5, 0.7, 1.8, 3, 6, 24],
      _12: [33, 11, 4, 2, 1.1, 0.6, 0.3, 0.6, 1.1, 2, 4, 11, 33],
      _13: [43, 13, 6, 3, 1.3, 0.7, 0.4, 0.4, 0.7, 1.3, 3, 6, 13, 43],
      _14: [58, 15, 7, 4, 1.9, 1, 0.5, 0.2, 0.5, 1, 1.9, 4, 7, 15, 58],
      _15: [88, 18, 11, 5, 3, 1.3, 0.5, 0.3, 0.3, 0.5, 1.3, 3, 5, 11, 18, 88],
      _16: [
        110, 41, 10, 5, 3, 1.5, 1, 0.5, 0.3, 0.5, 1, 1.5, 3, 5, 10, 41, 110,
      ],
    },
    Medium: {
      _8: [13, 3, 1.3, 0.7, 0.4, 0.7, 1.3, 3, 13],
      _9: [18, 4, 1.7, 0.9, 0.5, 0.5, 0.9, 1.7, 4, 18],
      _10: [22, 5, 2, 1.4, 0.6, 0.4, 0.6, 1.4, 2, 5, 22],
      _11: [24, 6, 3, 1.8, 0.7, 0.5, 0.5, 0.7, 1.8, 3, 6, 24],
      _12: [33, 11, 4, 2, 1.1, 0.6, 0.3, 0.6, 1.1, 2, 4, 11, 33],
      _13: [43, 13, 6, 3, 1.3, 0.7, 0.4, 0.4, 0.7, 1.3, 3, 6, 13, 43],
      _14: [58, 15, 7, 4, 1.9, 1, 0.5, 0.2, 0.5, 1, 1.9, 4, 7, 15, 58],
      _15: [88, 18, 11, 5, 3, 1.3, 0.5, 0.3, 0.3, 0.5, 1.3, 3, 5, 11, 18, 88],
      _16: [
        110, 41, 10, 5, 3, 1.5, 1, 0.5, 0.3, 0.5, 1, 1.5, 3, 5, 10, 41, 110,
      ],
    },
    High: {
      _8: [13, 3, 1.3, 0.7, 0.4, 0.7, 1.3, 3, 13],
      _9: [18, 4, 1.7, 0.9, 0.5, 0.5, 0.9, 1.7, 4, 18],
      _10: [22, 5, 2, 1.4, 0.6, 0.4, 0.6, 1.4, 2, 5, 22],
      _11: [24, 6, 3, 1.8, 0.7, 0.5, 0.5, 0.7, 1.8, 3, 6, 24],
      _12: [33, 11, 4, 2, 1.1, 0.6, 0.3, 0.6, 1.1, 2, 4, 11, 33],
      _13: [43, 13, 6, 3, 1.3, 0.7, 0.4, 0.4, 0.7, 1.3, 3, 6, 13, 43],
      _14: [58, 15, 7, 4, 1.9, 1, 0.5, 0.2, 0.5, 1, 1.9, 4, 7, 15, 58],
      _15: [88, 18, 11, 5, 3, 1.3, 0.5, 0.3, 0.3, 0.5, 1.3, 3, 5, 11, 18, 88],
      _16: [
        110, 41, 10, 5, 3, 1.5, 1, 0.5, 0.3, 0.5, 1, 1.5, 3, 5, 10, 41, 110,
      ],
    },
  }

  const probabilities = {
    _8: changePercent([1, 8, 28, 56, 70, 56, 28, 8, 1]),
    _9: changePercent([1, 9, 36, 84, 126, 126, 84, 36, 9, 1]),
    _10: changePercent([1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1]),
    _11: changePercent([1, 11, 55, 165, 330, 462, 462, 330, 165, 55, 11, 1]),
    _12: changePercent([
      1, 12, 66, 220, 495, 792, 924, 792, 495, 220, 66, 12, 1,
    ]),
    _13: changePercent([
      1, 13, 78, 186, 715, 1287, 1716, 1716, 1287, 715, 186, 78, 13, 1,
    ]),
    _14: changePercent([
      1, 14, 91, 264, 901, 2002, 3003, 3432, 3003, 2002, 901, 264, 91, 14, 1,
    ]),
    _15: changePercent([
      1, 15, 105, 355, 1165, 2903, 5005, 6435, 6435, 5005, 2903, 1165, 355, 105,
      15, 1,
    ]),
    _16: changePercent([
      1, 16, 120, 460, 1520, 4068, 7908, 11440, 12870, 11440, 7908, 4068, 1520,
      460, 120, 16, 1,
    ]),
  }

  const colors = {
    _8: [
      0xFA223E, 0xFA302F, 0xFA6020, 0xFA8F11, 0xFAC000, 0xFA8F11, 0xFA6020,
      0xFA302F, 0xFA223E,
    ],
    _9: [
      0xFA223E, 0xFA302F, 0xFA6020, 0xFA8F11, 0xFFAC04, 0xFFAC04, 0xFA8F11,
      0xFA6020, 0xFA302F, 0xFA223E,
    ],
    _10: [
      0xFA223E, 0xFF2632, 0xFF4E27, 0xFA6020, 0xFA8F11, 0xFAC000, 0xFA8F11,
      0xFA6020, 0xFF4E27, 0xFF2632, 0xFA223E,
    ],
    _11: [
      0xFA223E, 0xFA302F, 0xFA4527, 0xFA681E, 0xFA8C10, 0xFAAF06, 0xFAAF06,
      0xFA8C10, 0xFA681E, 0xFA4527, 0xFA2234, 0xFA223E,
    ],
    _12: [
      0xFA223E, 0xFA302F, 0xFA4527, 0xFA681E, 0xFA8C10, 0xFAA00C, 0xFAC000,
      0xFAA00C, 0xFA7F17, 0xFA681E, 0xFA4527, 0xFA302F, 0xFA223E,
    ],
    _13: [
      0xFA223E, 0xFA2235, 0xFA4527, 0xFA5922, 0xFA7618, 0xFA940E, 0xFAB104,
      0xFAB104, 0xFA940E, 0xFA7618, 0xFA5922, 0xFA3A2C, 0xFA223E, 0xFA223E,
    ],
    _14: [
      0xFA223E, 0xFA223E, 0xFA302F, 0xFA5224, 0xFA681E, 0xFA8C10, 0xFAA00C,
      0xFAC000, 0xFAA00C, 0xFA7F17, 0xFA6E1B, 0xFA5224, 0xFA362D, 0xFA223E,
      0xFA223E,
    ],
    _15: [
      0xFA223E, 0xFA223E, 0xFA2235, 0xFA4527, 0xFA5922, 0xFA7618, 0xFA940E,
      0xFAB104, 0xFAB104, 0xFA940E, 0xFA7618, 0xFA5922, 0xFA3A2C, 0xFA223E,
      0xFA223E, 0xFA223E,
    ],
    _16: [
      0xFA223E, 0xFA223E, 0xFA223E, 0xFA302F, 0xFA5224, 0xFA681E, 0xFA8C10,
      0xFAA00C, 0xFAC000, 0xFAA00C, 0xFA7F17, 0xFA6E1B, 0xFA5224, 0xFA362D,
      0xFA223E, 0xFA223E, 0xFA223E,
    ],
  }

  const shadows = {
    _8: [
      0xA61304, 0xA61302, 0xA81302, 0xAA4B00, 0xAB7902, 0xAA4B00, 0xA81302,
      0xA61302, 0xA61304,
    ],
    _9: [
      0xA61304, 0xA61302, 0xA81302, 0xAA4B00, 0xAB7902, 0xAB7902, 0xAA4B00,
      0xA81302, 0xA61302, 0xA61304,
    ],
    _10: [
      0xA61304, 0xA61302, 0xA81302, 0xAA4B00, 0xAB7902, 0xAB7902, 0xAA4B00,
      0xA81302, 0xA61302, 0xA61304, 0xA61304,
    ],
    _11: [
      0xA61304, 0xA61302, 0xA81302, 0xA81A02, 0xA94700, 0xAB6900, 0xAB6900,
      0xA94700, 0xA81A02, 0xA71302, 0xA61302, 0xA61304,
    ],
    _12: [
      0xA61304, 0xA61302, 0xA81302, 0xA81A02, 0xA94700, 0xAB6900, 0xAB7902,
      0xAB6900, 0xA93A00, 0xA71302, 0xA61302, 0xA61304, 0xA61304,
    ],
    _13: [
      0xA61304, 0xA61302, 0xA81302, 0xA81A02, 0xA94700, 0xAA4F00, 0xAB6B01,
      0xAB6B01, 0xAA4F00, 0xA94700, 0xA81A02, 0xA81302, 0xA61302, 0xA61304,
    ],
    _14: [
      0xA61304, 0xA61304, 0xA61302, 0xA71302, 0xA81A02, 0xA94700, 0xAB6900,
      0xAB7902, 0xAB6900, 0xA94700, 0xA81A02, 0xA71302, 0xA61302, 0xA61304,
      0xA61304,
    ],
    _15: [
      0xA61304, 0xA61304, 0xA61302, 0xA81302, 0xA81A02, 0xA94700, 0xAA4F00,
      0xAB6B01, 0xAB6B01, 0xAA4F00, 0xA94700, 0xA81A02, 0xA81302, 0xA61302,
      0xA61304, 0xA61304,
    ],
    _16: [
      0xA61304, 0xA61304, 0xA61304, 0xA61302, 0xA71302, 0xA81A02, 0xA94700,
      0xAB6900, 0xAB6900, 0xAB7902, 0xA94700, 0xA81A02, 0xA71302, 0xA61302,
      0xA61304, 0xA61304, 0xA61304,
    ],
  }
  const getIndexForColorAndPercent = (rowNum, level, text) => {
    let index = 0
    const selectedBasket = baskets[level][`_${rowNum}`]
    for (let i = 0; i < selectedBasket.length; i++) {
      if (selectedBasket[i] === text) {
        index = i
        break
      }
    }
    return index
  }

  const selectFromText = (rowNum, level, text, array) => {
    let selectedType = []
    if (array === 'color')
      selectedType = colors

    else if (array === 'shadow')
      selectedType = shadows

    else
      selectedType = probabilities

    const index = getIndexForColorAndPercent(rowNum, level, text)
    const select = selectedType[`_${rowNum}`][index]

    return select
  }

  const initialDrawValue = {
    ParticleRadius: 12,
    GapWidth: 10,
    PointRadius: 8,
    MapGap: 3,
  }

  return {
    baskets,
    probabilities,
    colors,
    shadows,
    initialDrawValue,
    selectFromText,
  }
}
