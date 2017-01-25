/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetObj = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
]

function header(obj) {
  const $header = $("<header>");
  const $avatar = $("<img>").attr("src", obj.user.avatars.smal);
  const $name = $("<span>").text(obj.user.name);
  const $handle = $("<span>").text(obj.user.handle).addClass("handle");
  $header.append($userName, $avatar, $handle);
  return $header;
}

function content(obj){
  const $content = $("<div>").text(obj.content.text);
  return $content;
}

function footer(obj) {
  const $footer = $("<footer>");
  const $date = $("<span>").text(makeDate()).addClass("date");
  const $flag = $("<i>").addClass("fa fa-flag").attr("aria-hidden", true);
  const $retweet = $("<i>").addClass("fa fa-retweet").attr("aria-hidden", true);
  const $heart = $("<i>").addClass("fa fa-heart").attr("aria-hidden", true);
  let $icon = $("<span>").addClass("icons");
  $icon.append($flag, " ", $retweet, " ", $heart);
  $footer.append($date, $icon);
  return $footer;
}

function createTweetElement(obj) {
  const $tweet = $("<article>");
  const $header = header(obj);
  const $content = content(obj);
  const $footer = footer(obj);
  $('#tweets').append($header, $content, $footer);
  return $tweet;
}

function renderTweets(obj) {
  obj.forEach(tweet => {
    $("#tweets").prepend(createTweetElement(tweet));
  });
}

var $tweet = renderTweets(tweetObj);

$('tweets').append($tweet);

