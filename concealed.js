'use strict'

;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory()
  } else {
    // Browser globals (root is window)
    root.Conceal = factory()
  }
}(typeof self !== 'undefined' ? self : this, () => {
  const toI = v => parseInt(v, 10)
  const range = length => Array.from({ length }, (v, i) => i)
  const findLast = (predicate, array) =>
    array.reduce((p, c) => (predicate(c) ? c : p))

  const wordLengthCummulativeHistogram = [0, 0.04983818770226537, 0.20614886731391585, 0.4, 0.5799352750809061, 0.7016181229773463, 0.8090614886731391, 0.8822006472491909, 0.9242718446601941, 0.9540453074433656, 0.9721682847896439, 0.9841423948220064, 0.9915857605177992, 0.9961165048543688, 0.9977346278317151, 0.9993527508090614, 0.9999999999999999]

  const genWordLength = () => {
    const pred = v => v < Math.random()
    return wordLengthCummulativeHistogram
      .indexOf(findLast(pred, wordLengthCummulativeHistogram))
  }

  const conceal = element => {
    const words = toI(element.attributes['data-conceal'].value)
    const style = window.getComputedStyle(element)
    const height = toI(style.fontSize)
    const { color } = style

    const makeWord = () => {
      const word = document.createElement('canvas')
      const letters = genWordLength()
      word.height = height
      word.width = toI(letters * (height * 0.6))
      word.style.backgroundColor = color
      return word
    }

    range(words)
      .map(makeWord)
      .forEach(e => element.appendChild(e))
  }

  const init = () =>
    [...document
      .querySelectorAll('[data-conceal]')]
      .map(conceal)

  const style = document.createElement('style')
  style.textContent = '[data-conceal] canvas { border: none; display: inline; margin-right: .2em; vertical-align: top; }'
  document.head.appendChild(style)

  return init
}))
