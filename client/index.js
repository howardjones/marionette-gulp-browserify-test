var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');

// app bootstrap
var app = new Marionette.Application();

app.start();
module.exports = app;

console.log('hello');
