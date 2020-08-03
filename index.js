'use strict';

{
  var txts = [
    '赤パジャマ青パジャマ黄パジャマ',
    '生麦生米生卵',
    '赤巻紙青巻紙黄巻紙',
    'バスガス爆発',
    '裏庭には二羽にわとりがいる',
    '坊主が屏風に上手に坊主の絵を書いた',
    '貨客船の旅客と旅客機の旅客',
    '東京特許許可局長',
    '青は藍より出でて藍より青し',
  ]
  var txt;
  var loc;
  var miss;
  var count;
  var timeLimit = 20 * 1000;
  var startTime;
  var isPlaying = false;


  var sentence = document.getElementById('sentence');
  var timerLabel = document.getElementById('timer');



  // 時間制限についての処理
  function updateTimer() {
    var timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);

    var timeoutId = setTimeout(() => {
      updateTimer()
    }, 10);

    if (count > 4) {
      clearTimeout(timeoutId);
      timerLabel.textContent = '0.00';
      isPlaying = false;
    } 


    
    if (timeLeft < 0) {
      count++;
      var txtNum = sentence.textContent.length;
      miss += txtNum;
      nextTxt(timeoutId);
      
    }

  }

    function nextTxt(timeoutId) {
    txt = txts[Math.floor(Math.random() * txts.length)];
    sentence.textContent = txt;
    answer.focus();
    answer.value = '';
    startTime = Date.now();
    updateTimer();

    if (count > 4) {
      clearTimeout(timeoutId);
      timerLabel.textContent = '0.00';
      sentence.textContent = 'replay';
      isPlaying = false;
      result();
      
    }

    

  }


  // okボタンを押した時
  var btnok = document.getElementById('btnok');
  btnok.addEventListener('click', function() {
    if (isPlaying !== true) {
      return;
    }

    count++;

    checkAnswer();
    
    
    if (count > 4) {
      isPlaying = false;

      setTimeout(() => {
        result();
      }, 100);

    } else {
      nextTxt();
    }


  })

  function checkAnswer() {
    // 早口言葉の文字数
    var txtNum = sentence.textContent.length
    

    for (var i = 0; i < txtNum; i++) {
      // 早口言葉を1文字づつ取得
      var txt1 = sentence.textContent.charAt(i);
      // 入力された文字を1文字づつ取得
      var answer1 = answer.value.charAt(i);
      if (txt1 !== answer1) {
        miss++;
      }
    }

  }

  // 結果表示
  function result() {
    sentence.textContent = 'replay';

    if (miss === 0) {
      return alert('完璧！');
    } else if (1 <= miss && miss <= 3 ) {
      return alert('おしい！');
    } else if (4 <= miss && miss <= 8) {
      return alert('まだまだです。');
    } else if (9 <= miss) {
      return alert('頑張りましょう。');
    }
  }
  

  // クリックしてスタートする時
  sentence.addEventListener('click', function() {
    if (isPlaying === true) {
      return;
    }
    isPlaying = true;

    // ゲーム開始時の初期化
    loc = 0;
    miss = 0;
    count = 0;
    answer.value = '';
    txt = txts[Math.floor(Math.random() * txts.length)];

    answer.focus();
    sentence.textContent = txt;
    startTime = Date.now();
    updateTimer();
  });

}