///
///  spinner.js
///
///  https://github.com/marando/zoomable.js/
///
///
///  Copyright (c) Ashley Marando
///  Released under the GNU2 license
///
///


var examples = [{
  name: 'wave',
  inputs: [{
    prop: 'bars',
    min: 1,
    max: 10,
    default: 5,
    step: 1,
    type: 'range'
  }, {
    prop: 'height',
    min: 10,
    max: 120,
    default: 80,
    step: 1,
    type: 'range',
    units: 'px'
  }, {
    prop: 'width',
    min: 1,
    max: 100,
    default: 12,
    step: 1,
    type: 'range',
    units: 'px'
  }, {
    prop: 'spacing',
    min: 0,
    max: 30,
    default: 1,
    step: 1,
    type: 'range',
    units: 'px'
  }, {
    prop: 'speed',
    min: 10,
    max: 120,
    default: 70,
    step: 1,
    type: 'range'
  }, {
    prop: 'opacity',
    min: 0,
    max: 1,
    default: 1,
    step: 0.01,
    type: 'range'
  }, {
    prop: 'color',
    default: '#484242',
    type: 'color'
  }]
}, {
  name: 'domino',
  inputs: [{
    prop: 'bars',
    min: 1,
    max: 10,
    default: 7,
    step: 1,
    type: 'range'
  }, {
    prop: 'height',
    min: 10,
    max: 120,
    default: 24,
    step: 1,
    type: 'range',
    units: 'px'
  }, {
    prop: 'width',
    min: 1,
    max: 100,
    default: 15,
    step: 1,
    type: 'range',
    units: 'px'
  }, {
    prop: 'spacing',
    min: 0,
    max: 30,
    default: 1,
    step: 1,
    type: 'range',
    units: 'px'
  }, {
    prop: 'speed',
    min: 10,
    max: 180,
    default: 92,
    step: 0.05,
    type: 'range'
  }, {
    prop: 'opacity',
    min: 0,
    max: 1,
    default: 1,
    step: 0.01,
    type: 'range'
  }, {
    prop: 'color',
    default: '#484242',
    type: 'color'
  }]
}];
