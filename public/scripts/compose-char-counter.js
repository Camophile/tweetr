$(document).ready(function() {
  $(".new-tweet textarea").on("input", function() {
    const charLim = 140;
    const span = $(this).nextAll('span');
    let len = charLim - $(this).val().length;
    if(len < 10) {
      span.css("color", "red");
    } else {
      span.css("color", "black");
    }
    span.text(len);
  });
});


