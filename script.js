'use strict';

const $ = function (elem) {
  return document.querySelector(elem);
};

let answer = [];
let random = [];
let a = 0;
let b = 0;
let time = 0;
let time2 = 0;
let best = 8;
let restart = $('.right-block');
//生成隨機數
function produseRandom() {
  const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  random = []; //重置
  for (let i = 10; i > 6; i--) {
    let j = Math.trunc(Math.random() * i);
    random.push(number[j]);
    number.splice(j, 1); // splice(第幾個開始刪除,刪除幾個)
  }
  return random;
}
//play按鈕
const play = $('.play');
play.addEventListener('click', function () {
  $('.best').style.display = 'block';
  $('.left').style.display = 'block';
  $('.right').style.display = 'block';
  this.style.display = 'none';
  random = produseRandom();
});
//重置所有
function reset() {
  while (restart.firstChild) {
    restart.removeChild(restart.firstChild);
  }
  $('.answer').value = '';
  a = 0;
  b = 0;
  time = 0;
  time2 = 0;
  random = produseRandom();
  document.querySelectorAll('.number').forEach(function (elem) {
    elem.style.color = '#fff';
  });
}

//按鈕輸入
function inputNumber(elem) {
  let elemid = elem.id;
  if (time2 < 4) {
    time2++;
    switch (elemid) {
      case 'one':
        $('.answer').value += 1;
        break;
      case 'two':
        $('.answer').value += 2;
        break;
      case 'three':
        $('.answer').value += 3;
        break;
      case 'four':
        $('.answer').value += 4;
        break;
      case 'five':
        $('.answer').value += 5;
        break;
      case 'six':
        $('.answer').value += 6;
        break;
      case 'seven':
        $('.answer').value += 7;
        break;
      case 'eight':
        $('.answer').value += 8;
        break;
      case 'nine':
        $('.answer').value += 9;
        break;
      case 'zero':
        $('.answer').value += 0;
        break;
    }
  }
  switch (elemid) {
    case 're':
      $('.answer').value = '';
      time2 = 0;
      break;
    case 'backspace':
      let answerValue = $('.answer').value;
      $('.answer').value = answerValue.slice(0, -1);

      console.log(answerValue);
      time2 = 0;
      break;
  }
}

//check按鈕
const check = $('.check').addEventListener('click', function () {
  answer = String($('.answer').value);
  $('.answer').value = ''; //取得值後才清空輸入框
  answer = Array.from(answer); //字串轉成陣列
  let work = true;
  //判斷輸入是否為四位數字
  time2 = 0;
  if (answer.length < 4) {
    work = false;
  }
  //判斷輸入是否有重複數字
  for (let i = 3; i > 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      if (answer[i] == answer[j]) {
        work = false;
      }
    }
  }
  //判斷幾A幾B
  if (work) {
    for (let i = 0; i < 4; i++) {
      if (answer[i] == random[i]) {
        a++;
      } else {
        for (let j = 0; j < 4 + 1; j++) {
          if (answer[i] == random[j]) {
            b++;
          }
        }
      }
    }
    time++;
    const itemBlock = document.createElement('div');
    itemBlock.setAttribute('class', 'item-block');
    itemBlock.textContent = `第${time}次 (${answer.join('')}): ${a}A${b}B`;
    restart.appendChild(itemBlock);
    if (a == 4) {
      alert('恭喜你答對了!! 答案為: ' + answer.join(''));
      if (time < best) {
        best = time;
        $('.best-count').textContent = best;
      }
      reset();
    }
    if (time == 8 && a !== 4) {
      alert('次數已達8次，你輸了。 ' + '答案為: ' + random.join(''));
      reset();
    }
  } else {
    alert('請輸入0~9不重複4位數字');
  }

  a = 0;
  b = 0;
});
//restart按鈕
$('.restart').addEventListener('click', function () {
  reset();
});
//輔助數字列
function changeColor(elem) {
  if (elem.style.color == 'rgb(255, 255, 255)') {
    elem.style.color = '#8E8E8E';
  } else {
    elem.style.color = '#fff';
  }
}
