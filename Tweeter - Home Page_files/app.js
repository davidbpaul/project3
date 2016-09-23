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
  let dtoday = (new Date()).getTime();
  let post =(tweet.created_at)
  let date = ((dtoday-post)/1000);

  day = Math.floor()
  var hours = Math.floor(date / 60 / 60);
  var duration = hours

  console.log(duration)

  if (hours < 1){
    duration = "less then an hour ago"
  }

  else if (hours < 24){
    duration = `${hours} hours ago`
  }

  else if (hours > 24){
    let days = Math.floor(hours / 24);
    duration = `${days} days ago`;
  }

  // let tweetHTML =
//     `<article class = "art icons">
//        <header class = "head">
//        <span class = "group1">
//        <img class="pic" src="${tweet.user.avatars.small}" alt="Mountain View">
//         <h1 class ="name">${tweet.user.name}</h1>
//         </span>
//         <span class = "group2">
//         <a class = "user-name">${tweet.user.handle}</a>
//         </span>
//         </header>
//         <section class="message">
//         <h3>${tweet.content.text}</h3>
//         </section>
//        <footer class = "foot">
//          <h6 class = "time">${duration}</h6>
//              <span class = "three">
// <img class="hot" src="./images/sharing.png">
// <img class="hot" src="./images/laptop.png">
// <img class="hot" src="./images/like.png">
//                </span>
//         </footer>
//      </article>`

  let tweetHTML = _.template( `<article class = "art icons">
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
});
  $('button').click(function(){
      $('.new-tweet').slideToggle('slow');
       $("#tweet-text").focus();
    $('html, body').animate({
        scrollTop: 0
    }, 'slow');

  });



    // Animation complete.

  // load intital tweets
  function fetchTweets(){


    $.ajax({
      url: '/tweets/',
      method: 'GET',
      success: function (data) {
        renderTweets(data);

        // $(".icons").hover(function(){
        // $(this).toogleClass(hov);
        // })
      }
    })
  }

fetchTweets()

// then on user submit with form
// make another tweets request

function tweetIsEmpty(data) {
  return data === null || data === ""
}

function tweetIsTooLong(data) {
return data.length > 140
}

// post tweet
 $("form").on("submit", function (ev) {

    ev.preventDefault();

    let text = $('#tweet-text').val()
    console.log(text);

    let data = $(this).serialize()

    console.log('...', data)

    if (tweetIsEmpty(text)) {
      alert('enter a tweet!')
      return
    } else if (tweetIsTooLong(text)) {
        alert('tweet to long!')
      return
    } else {

      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: data,

        success: fetchTweets
      });
    }

  });

});











