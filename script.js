'use strict';
let guess = [];
let random = [];
let a = 0;
let b = 0;
let time = 0;
let best = 8;
let restart = document.querySelector('.right-block');

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

const play = document.querySelector('.play');
play.addEventListener('click', function () {
  document.querySelector('.best').style.display = 'block';
  document.querySelector('.left').style.display = 'block';
  document.querySelector('.right').style.display = 'block';
  this.style.display = 'none';
  random = produseRandom();
  console.log(random);
});
//重置所有
function reset() {
  while (restart.firstChild) {
    restart.removeChild(restart.firstChild);
  }
  document.querySelector('.guess').value = '';
  a = 0;
  b = 0;
  time = 0;
  random = produseRandom();
  document.querySelectorAll('.number').forEach(function (elem) {
    elem.style.color = '#fff';
  });
}

document.querySelector('.check').addEventListener('click', function () {
  guess = String(document.querySelector('.guess').value);
  document.querySelector('.guess').value = ''; //取得值後才清空輸入框
  guess = Array.from(guess); //字串轉成陣列
  let work = true;
  //判斷輸入是否為四位數字
  if (guess.length < 4) {
    work = false;
  }
  //判斷輸入是否有重複數字
  for (let i = 3; i > 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      if (guess[i] == guess[j]) {
        work = false;
      }
    }
  }
  //判斷幾A幾B
  if (work) {
    for (let i = 0; i < 4; i++) {
      if (guess[i] == random[i]) {
        a++;
      } else {
        for (let j = 0; j < 4 + 1; j++) {
          if (guess[i] == random[j]) {
            b++;
          }
        }
      }
    }
    time++;
    const itemBlock = document.createElement('div');
    itemBlock.setAttribute('class', 'item-block');
    itemBlock.textContent = `第${time}次 (${guess.join('')}): ${a}A${b}B`;
    restart.appendChild(itemBlock);
    if (a == 4) {
      alert('恭喜你答對了!!');
      if (time < best) {
        best = time;
        document.querySelector('.best-count').textContent = best;
      }
      reset();
    }
    if (time == 8 && a !== 4) {
      alert('次數已達8次，你輸了');
      reset();
    }
  } else {
    alert('請輸入0~9不重複4位數字');
  }

  a = 0;
  b = 0;
});
document.querySelector('.restart').addEventListener('click', function () {
  reset();
});
function changeColor(elem) {
  if (elem.style.color == 'rgb(255, 255, 255)') {
    elem.style.color = '#8E8E8E';
  } else {
    elem.style.color = '#fff';
  }
}
