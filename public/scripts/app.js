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

  function printFooter(tweet) {
    const $footer = $("<footer>");
    const $date = $("<span>");//.text(makeDate()).addClass("date");
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
      }
    });
  }
});

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