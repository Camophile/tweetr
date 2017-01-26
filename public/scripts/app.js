/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function(){

  function printDate(tweet){
    const $date = $("<span>").addClass("date");
    $date.append
  }

  function printHeader(tweet) {
    const $header = $("<header>");
    const $avatar = $("<img>").attr("src", tweet.user.avatars.small);
    const $name = $("<span>").text(tweet.user.name);
    const $handle = $("<span>").text(tweet.user.handle).addClass("handle");
    $header.append($name, $avatar, $handle);

    return $header;
  }

  function printContent(tweet){
    const $content = $("<div>").text(tweet.content.text);
    return $content;
  }

  function printDate(ms) {
    const milisecs = Date.now() - ms;
    if(milisecs >= 86400000){
      days = milisecs / 86400000;
      return (Math.floor(days) + " days ago");
    }
    if(milisecs >= 3600000) {
      hours = milisecs / 3600000;
      return (Math.floor(hours) + " hours ago");
    }
    if(milisecs >= 60000){
      mins = milisecs / 60000;
      return (Math.floor(mins) + " minutes ago");
    } else {
      secs = milisecs / 1000;
      return (Math.floor(seconds) + " seconds ago");
    }
  }

  function printFooter(tweet) {
    const $footer = $("<footer>");
    const $date = $("<span>").text(printDate(tweet.created_at)).addClass("date");
    const $flag = $("<i>").addClass("fa fa-flag").attr("aria-hidden", true);
    const $retweet = $("<i>").addClass("fa fa-retweet").attr("aria-hidden", true);
    const $heart = $("<i>").addClass("fa fa-heart").attr("aria-hidden", true);
    let $icon = $("<span>").addClass("icons");
    $icon.append($flag, " ", $retweet, " ", $heart);
    $footer.append($date, $icon);
    return $footer;
  }

  function createTweetElement(tweet) {
    const $tweet = $("<article>");
    const $header = printHeader(tweet);
    const $content = printContent(tweet);
    const $footer = printFooter(tweet);

    $tweet.append($header, $content, $footer);
    return $tweet;
  }

  function loadTweets() {
      $.ajax({
        url: '/tweets',
        method: 'GET',
        dataType: 'JSON',
        success: function(result){
          renderTweets(result);
        }
      })
  }

  loadTweets();

  $('[action="/tweets/"]').on('submit', function(event) {
    event.preventDefault();
    let charLim = 140;
    let $span = $('textarea').val();
    if($span.length > charLim){
      alert("Th'art beyond the delimitations herein");
      return;
    }
    if($span === ""){
      alert("duuuuuude");
      return;
    } else{
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize(),
      success: function() {
        $("#tweets").empty();
        loadTweets();
        $("textarea").val("");
      }
    });
  }
});

  $("#tweets").on('mouseenter', 'article', function() {
    $(this).find("header").css('opacity', '0.72')
    })
    .mouseleave('article', function(){
      $(this).find("header").css('opacity', '1')
    // $article.find("header").css('background-color', 'rgba(0, 160, 135, 0.72)');
  })

  $("nav button").click(function(event) {
    const $tweet = $(".new-tweet");
    $tweet.slideToggle('slow', function(){
      if($tweet.is(":visible")){
        $("textarea").focus();
      }
    });

  });

  function renderTweets(obj) {
    obj.forEach(tweet => {
      $tweet = createTweetElement(tweet);
      $("#tweets").prepend($tweet);
    });
  }
});