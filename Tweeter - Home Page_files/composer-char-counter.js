$( document ).ready(function() {
  var $input = $('#tweet-text')
  var $counter = $('#counter')

  $input.on("input", function(ev){
    $counter.html(140 - $input.val().length);

    if(Number($counter.text()) < 0){
    $counter.addClass("hilighted")
    }
    else
    $counter.removeClass("hilighted")
  });

});

