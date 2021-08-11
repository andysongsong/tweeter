$(document).ready(function () {
  // Fake data taken from initial-tweets.json

  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      $("#oldTweets").append(newTweet);
    }

    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  };

  const createTweetElement = function (tweet) {
    let time = timeago.format(tweet.created_at);
    let $tweet = $(`
       <article> 
          <header>
            <div class="image_container">
              <img class='avatar_icon' src="${tweet.user.avatars}"> 
             <span >${tweet.user.name}</span>
            </div>
           <span> ${tweet.user.handle}</span>
          </header>
          <p><strong>${tweet.content.text}</strong></p>
          <footer>
            <span>${time}</span>
            <div class="icon">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </footer>
        </article>`);

    return $tweet;
  };

  const loadtweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
      success: (tweet) => {
        console.log(tweet);
        createTweetElement(tweet);
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  const $form = $("#tweetForm");
  $form.on("submit", function (event) {
    event.preventDefault();
    console.log("submit form");
    const tweetData = $(this).serialize();
    console.log("1111111", tweetData);
    $.post("/tweets", tweetData).then(loadtweets);
  });
});
