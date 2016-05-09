var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');

console.log('hello2');

var HJApp = Marionette.Application.extend({
    initialize: function(options) {
        console.log('Initialising');
    }
});

var myApp = new HJApp();
console.dir(myApp);
myApp.start();

console.log('hello2');

$(document).ready(function () {

    $('body').append('<h3>Zort</h3>');
    $('body').append('<h4>Narf</h4>');

});