// Fake data taken from initial-tweets.json
$(document).ready(function () {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function (tweets) {
    const $oldTweets = $("#oldTweets");
    $oldTweets.empty();
    for (let tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      $oldTweets.prepend(newTweet);
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
  <img src="${tweet.user.avatars}"> 
  <span >${tweet.user.name}</span>
  </div>
  <span> ${tweet.user.handle}</span>
  </header>
  <p><strong>${escape(tweet.content.text)}</strong></p>
  <footer>
  <span>${time}</span>
  <div class="icon">
  <i class="fas fa-flag"></i>
  <i class="fas fa-retweet"></i>
  <i class="fas fa-heart"></i>
  </div>
  </footer>
  </article>`);
    $tweet.append($tweet);

    return $tweet;
  };

  const loadTweets = function () {
    $.ajax({
      method: "GET",
      url: "/tweets",
    }).then((result) => {
      console.log(result);
      renderTweets(result);
    });
  };
  loadTweets();

  const $form = $("#tweetForm");
  $form.on("submit", function (event) {
    event.preventDefault();

    const words = $(this).serialize();

    const tc = $(".counter")[0].value;
    if (tc < 0) {
      $(".err1").slideDown();
      $(".err2").slideUp();
    } else if (tc === "140") {
      $(".err2").slideDown();
      $(".err1").slideUp();
    } else {
      $(".err1").slideUp();
      $(".err2").slideUp();
      $.ajax("/tweets", { method: "POST", data: words })
        .then(() => {
          $("#tweet-text").val("");
          loadTweets();
        })
        .catch((err) => console.log(err));
    }
  });
});
