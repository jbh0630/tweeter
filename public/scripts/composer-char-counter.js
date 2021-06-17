$(document).ready(function() {

  $('.new-tweet').on('input', 'textarea', function() {
   const $text = $('textarea').val();
   const $counter = 140 - $text.length;

   if ($counter < 0) {
    $('.counter').css('color', 'red');
   } else {
    $('.counter').css('color', 'black');

   }
   
   $('.counter').text($counter);
  });
});