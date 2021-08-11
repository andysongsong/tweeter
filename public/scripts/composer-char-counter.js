$(document).ready(function () {
  console.log("DOM is ready");

  const text = $("textarea");
  text.on("keyup", function () {
    console.log(event.target.value);
  }); // --- our code goes here ---

  const count = $(".counter");
  count.on("click", function () {
    console.log(this);
  });
});
