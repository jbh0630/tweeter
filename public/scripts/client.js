/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (const data of tweets) {
      let tweet = createTweetElement(data);
      $('#tweets-container').prepend(tweet);
    }
  }

  const createTweetElement = function(tweet) {
    let $tweet = $(
      `<article class="tweet">
        <header>
        <div class="avatar-name">
          <img src="${tweet.user.avatars}" />
          <span>${tweet.user.name}</span>
        </div>
        <div class="user-handle">  
          <span>${tweet.user.handle}</span>
        </div>
        </header>
        <textarea readonly>&emsp;${tweet.content.text}</textarea>
        <footer>
          <span>${timeago.format(tweet.created_at)}</span>
          <div>
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>`
    );

    return $tweet;
  }

  $(function arrowAnimation() {
    $('.fa-angle-double-down').animate({top: '15'}, 700, null);
    $('.fa-angle-double-down').animate({top: '0'}, 700, arrowAnimation);
  });
  
  $('.write-container').click(function() {
    if ($(window).width() < 1024) {
      if ($(document).scrollTop() < 630) {
        console.log($(document).scrollTop());
    
          $('html').animate({
            scrollTop: $('#tweet-text').offset().top
          },800
          );
          return;
        }
        $('html').animate({
          scrollTop: $('h2').offset().top
        },800
        );
        return;
    }

    if ($(document).scrollTop() < 330) {
      console.log($(document).scrollTop());
  
      $('html').animate({
        scrollTop: $('#tweet-text').offset().top
      },800
      );
      return;
    } 
      
    $('html').animate({
      scrollTop: $('html').offset().top
    },800
    );    
  });

  $('.fa-arrow-circle-up').hide();
  $(window).scroll(function() {
    if ($(this).scrollTop() > 0) {
      $('.fa-arrow-circle-up').fadeIn();
    } else {
      $('.fa-arrow-circle-up').fadeOut();
    }
  });
 
  $(".fa-arrow-circle-up").click(function() {
    $('html, body').animate({
        scrollTop : 0
    }, 400);
    return false;
  });

  const alertHandler = function(message) {
    $('.alertMessage').remove();
    let $alert = $(
      `<div class="alertMessage">
        <div>
          <i class="fas fa-exclamation-triangle"></i>
          ${message}
          <i class="fas fa-exclamation-triangle"></i>
        </div>
      </div>`
    );  
    $('.container').prepend($alert);
    $('.alertMessage').hide();
    $('.alertMessage').slideDown();
  }

  $('form').submit(function(event) {
    event.preventDefault();

    if ($('#tweet-text').val() === '' || $('#tweet-text').val() === null) {
      $('#tweet-text').val('');
      alertHandler('You must type correctly.');
      return;
    } else if ($('.counter').val() < 0) {
      $('#tweet-text').val('');
      alertHandler('Too long. Please type within 140 words.');
      return;
    }
    $('.alertMessage').slideUp();

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize(),
    }).then(() => {
      $('#tweet-text').val('');
      loadTweets();
      $('.counter').text(140);
    });

  });

  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    }).then((result) => {
      renderTweets(result);
    });
  }
  loadTweets();

});