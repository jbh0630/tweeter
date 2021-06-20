$(document).ready(function() {

  $('.new-tweet').on('input', 'textarea', function() {
    //Keep track the counter number
    const $text = $('textarea').val();
    const $counter = 140 - $text.length;
    //If the word count excceed, the word count color changed as red
    if ($counter < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }
    $('.counter').text($counter);
  });
});