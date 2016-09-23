/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function renderTweets(tweets) {
  $('#tweetsContainer').empty()
  tweets.forEach(tweetHTML => {
    $('#tweetsContainer').append(createTweetElement(tweetHTML));
  })
}

function createTweetElement(tweet) {
  const dtoday = (new Date()).getTime();
  const post =tweet.created_at
  const date = (dtoday-post)/1000;

  const hours = Math.floor(date / 60 / 60);
  let duration = hours

  console.log(duration)

  if (hours < 1){
    duration = "less then an hour ago"
  }

  else if (hours < 24){
    duration = `${hours} hours ago`
  }

  else if (hours > 24){
    const days = Math.floor(hours / 24);
    duration = `${days} days ago`;
  }


  const tweetHTML = _.template( `<article class = "art icons">
         <header class = "head">
         <span class = "group1">
         <img class="pic" src="<%= tweet.user.avatars.small %>" alt="Mountain View">
          <h1 class ="name"><%= tweet.user.name %> </h1>
          </span>
          <span class = "group2">
          <a class = "user-name"><%= tweet.user.handle %></a>
          </span>
          </header>
          <section class="message">
          <h3><%= tweet.content.text %></h3>
          </section>
         <footer class = "foot">
           <h6 class = "time"><%= duration %></h6>
               <span class = "three">
          <img class="hot" src="./images/sharing.png">
          <img class="hot" src="./images/laptop.png">
          <img class="hot" src="./images/like.png">
                 </span>
          </footer>
       </article>`);
  return tweetHTML({tweet: tweet, duration: duration})
}

$(document).ready(function() {

  $('#container input').on('click', function() {
      alert('Tweet, Tweet!');
      event.stopPropagation();

  });
  $('button').click(function(){
      $('.new-tweet').slideToggle('slow');
      $("#tweet-text").focus();
      $('html, body').animate({
        scrollTop: 0
    }, 'slow');

  });

  // load intital tweets
  function fetchTweets(){
    $.ajax({
      url: '/tweets/',
      method: 'GET',
      success: function (data) {
        renderTweets(data);

      }
    })
  }

  fetchTweets()

  // then on user submit with form
  // make another tweets request

  function isTweetEmpty(data) {
    return data === null || data === ""
  }

  function isTweetToLong(data) {
  return data.length > 140
  }

// post tweet
 $("form").on("submit", function (ev) {
    ev.preventDefault();
    const text = $('#tweet-text').val()
    console.log(text);
    const data = $(this).serialize()
    if (isTweetEmpty(text)) {
      alert('enter a tweet!')
      event.stopPropagation();
      return
    } else if (isTweetToLong(text)) {
      alert('tweet to long!')
      event.stopPropagation();
      return
    } else {
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: data,

        success: fetchTweets
      });
      $('#tweet-text').val("")

    }
  });
});











