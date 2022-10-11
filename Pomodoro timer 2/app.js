$(document).ready(function() {

  var worktime = 25;
  var resttime = 5;
  var working = true;
  var isRunning = false;
  var interval;
  var getAudio = $('#beep').trigger('load');
  //getAudio.load();
 
  document.getElementById('workrange').disabled = false;
  document.getElementById('restrange').disabled = false;
  
  
  var workrange = $('#workrange');
  var workspan = $('#workspan');
  var restrange = $('#restrange');
  var restspan = $('#restspan');
  var timer = $('#timer');

  //set the default values----------------------------
  timer.text((worktime<10?"0" + worktime: worktime) + ":" + "00");

  workrange.val(25);
  workspan.text(' ' + '25');
  restrange.val(5);
  restspan.text(' ' + '5');

  //update range display when sliding---------------------
  workrange.on("input", function() {
    workspan.text(' ' + workrange.val());
  });

  restrange.on("input", function() {
    restspan.text(' ' + restrange.val());
  });

  //get the user inputs-----------------------------------
  
  workrange.bind('mouseup touchend', function() {
    worktime = $(this).val();
    timer.text((worktime<10?"0"+worktime:worktime) + ":" + "00");
  });

  restrange.bind('mouseup touchend', function() {
    resttime = $(this).val();
  });
  


//function for countdown--------------------------
function countdown(mins, secs) {
  interval = setInterval(function() {
    if(mins == 0 && secs <= 0) {
      clearInterval(interval);
      $('#workProgress, #restProgress').removeClass('ani');
      getAudio.trigger('play');
      if(working) {
        countdown(resttime, secs);
        $('#restProgress').css({'animation-duration': resttime*60+ "s"}).addClass('ani');
        working = false;
      } else {
        countdown(worktime, secs);
        $('#workProgress').css({'animation-duration': worktime*60+ "s"}).addClass('ani');
        working = true;
      }
    }
    if(secs < 0) {
      mins--;
      secs = 59;
    }
    timer.text((mins<10?"0"+mins:mins) + ":" + (secs<10?"0"+secs:secs));
    secs--;
  },1000);
}

//---------------------start the countdown------------------------------------
$('#start').click(function() { 
 
  if(!isRunning) {
    countdown(worktime, 0);
    $('#workProgress').css({'animation-duration': worktime*60+ "s"}).addClass('ani');
    isRunning = true;
  }
  document.getElementById('workrange').disabled = true;
  document.getElementById('restrange').disabled = true;
});

//-------------------------reset the countdown---------------------------------
$('#reset').click(function() {
  if(isRunning) {
    clearInterval(interval);
    $('#workProgress, #restProgress').removeClass('ani');
    timer.text((worktime<10?"0"+worktime:worktime) + ":" + "00");
    isRunning = false;
  }
  document.getElementById('workrange').disabled = false;
  document.getElementById('restrange').disabled = false;
});


});//doc