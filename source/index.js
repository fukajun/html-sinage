import _ from 'lodash'
var $ = require('jquery')
global.jQuery = $
var bxslider = require('bxslider')

var timestamp = function () {
  return Math.floor( new Date().getTime() / 1000 )
}
$(function() {
  $(document).ready(function(){

    var switchInterval = 5

    var slider = $('.bxslider').bxSlider({
      mode: 'fade',
      speed: 1000,
      pager: false
    });

    var count = slider.getSlideCount()
    setInterval(()=> {
      var tick = Math.trunc(timestamp() / switchInterval)
      var slideNo = tick % count
      slider.goToSlide(slideNo)
    }, 100)
  });
})
