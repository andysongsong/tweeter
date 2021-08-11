$(document).ready(function () {
  // Fake data taken from initial-tweets.json
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

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

  renderTweets(data);
});
