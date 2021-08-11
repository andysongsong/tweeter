$(document).ready(function () {
  console.log("DOM is ready");

  const text = $("#tweet-text");
  text.on("keyup", function () {
    let remain = 140 - this.value.length;
    let count = $(".counter");
    count.text(remain);
    if (this.value.length > 140) {
      count.addClass("overLimit");
    } else {
      count.removeClass("overLimit");
    }
  }); // --- our code goes here ---
});
