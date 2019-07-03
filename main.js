var sol = [
    [1,2,3,
     5,8,4,
     9,6,7],[6,7,8,
             2,3,9,
             1,4,5],[9,4,5,
                     7,6,1,
                     3,2,8],
    [3,7,2,
     6,9,1,
     4,5,8],[4,6,1,
             5,8,3,
             7,9,2],[5,8,9,
                     2,7,4,
                     6,1,3],
    [8,3,6,
     2,1,9,
     7,4,5],[9,2,4,
             8,5,7,
             3,1,6],[1,5,7,
                     4,3,6,
                     8,9,2]
  ];
  var solRows = [[],[],[],[],[],[],[],[],[]];
  var clock,clear,timer,min,sec,isTicking=false;
  
  sol.forEach(function(item,i){
    var base;
    if (i<3)      {base=0;}
    else if (i<6) {base=3;}
    else          {base=6;}
    var firstLayer = []; var secondLayer = []; var thirdLayer = [];
    for (var j=0;j<9;j++) {
      if (j<3)      {firstLayer.push(item[j]);}
      else if (j<6) {secondLayer.push(item[j]);}
      else          {thirdLayer.push(item[j]);}
    }
    solRows[0+base].push(firstLayer);
    solRows[1+base].push(secondLayer);
    solRows[2+base].push(thirdLayer);
  }); //put solution in rows (solRows)
  
  function showSol() {
    $('table').each(function(index){
      var curSqNums = sol[index];
      $(this).find('td').each(function(subindex) {
        if (!$(this).hasClass('shown')) {
          var storeMe = $(this).find('input').val();
          $(this).attr('data-store',storeMe);
          $(this).text(curSqNums[subindex]);
          $(this).removeClass('incorrect');
          $(this).addClass('correct');
        }
      });
    });
    addClickListenerToCells();
  }
  function checkProgress() {
    $('table').each(function(index){
      var curSqNums = sol[index];
      $(this).find('td').each(function(subindex) {
        var check = Number($(this).find('input').val());
        if (typeof check == 'number' && !isNaN(check) && check!==0) {
          $(this).text(check);
          $(this).attr('data-store',check);
        }
        else {
          var check = Number($(this).text());
        }
        if (!$(this).hasClass('shown') && typeof check == 'number' && check!==0) {
          console.log(['check: '+check,'correct: '+curSqNums[subindex]]);
          if (check == curSqNums[subindex]) {
            $(this).removeClass('incorrect');
            $(this).addClass('correct');
          }
          else {
            $(this).removeClass('correct');
            $(this).addClass('incorrect');
          }
        }
      })
    });
    addClickListenerToCells();
  }
  function addClickListenerToCells(){
    $('table td').click(function(){
      $('table td').each(function(){
        if (!$(this).hasClass('shown')) {
          $(this).text("\u00A0");
          var extract = Number($(this).attr('data-store'));
          if (extract == 0 || isNaN(extract)) {
            extract = '';
          }
          $(this).append('<input type="text" maxlength="1" value="' + extract + '"/>');
        }
      });
      $('table td').off('click');
    })
  }
  function restart() {
    stopClock();
    resetClock();
    startClock();
    $('.overlay').hide();
    $('table').each(function(index){
      var curSqNums = sol[index];
      $(this).find('td').each(function(subindex) {
        $(this).removeClass('incorrect correct');
        if (!$(this).hasClass('shown')) {
          console.log($(this).find('input'));
          $(this).text('\u00A0');
          $(this).append('<input type="text" maxlength="1" />');
        }
      })
    })
  }
  function startClock() {
    clock = setInterval(ticClock,1000);
    isTicking = true;
  }
  function stopClock() {
    clear = clearInterval(clock);
    isTicking = false;
  }
  function resetClock() {
    timer = min = sec = 0;
  }
  function ticClock() {
    timer++;
    min = Math.floor(timer / 60);
    sec = timer % 60;
    $('.time').html(min + " minutes, " + sec + " seconds");
  }
  function pauseGame() {
    stopClock();
    $('.overlay').show();
  }
  function resumeGame() {
    if (!isTicking) {
      startClock();
    }
    $('.overlay').hide();
  }
  function init(){
    $('table td').each(function(){
      if (!$(this).hasClass('shown')) {
        $(this).text("\u00A0"); // unicode literal for space prevents weird spacing issue
        $(this).append('<input type="text" maxlength="1" />');
      }
    })
    resetClock();
    startClock();
    $('.restart').click(restart);
    $('.pause').click(pauseGame);
    $('.resume').click(resumeGame);
    $('.check').click(checkProgress);
    $('.solve').click(showSol);
  }
  
  init();