let score = 0

const moveUp = itemList => {
  //向上滑动
  for (let i = 4; i < 16; i++) {
    if (!itemList[i]) continue;
    const curValue = itemList[i];
    let curIndex = i;
    while (curIndex - 4 >= 0 && itemList[curIndex - 4] === 0) {
      curIndex -= 4;
    }
    itemList[i] = 0;
    if (itemList[curIndex - 4] === curValue) {
      itemList[curIndex - 4] = 2 * curValue;
      score += curValue
    } else {
      itemList[curIndex] = curValue;
    }
  }
  return itemList;
};

const moveDown = itemList => {
  for (let i = 11; i >= 0; i--) {
    if (!itemList[i]) continue;
    const curValue = itemList[i];
    let curIndex = i;
    while (curIndex + 4 <= 15 && itemList[curIndex + 4] === 0) {
      curIndex += 4;
    }
    itemList[i] = 0;
    if (itemList[curIndex + 4] === curValue) {
      itemList[curIndex + 4] = 2 * curValue;
      score += curValue
    } else {
      itemList[curIndex] = curValue;
    }
  }
  return itemList;
};

const moveLeft = itemList => {
  for (let i = 1; i < 4; i++) {
    //从第1列开始，从右往左进行检查
    for (let j = 0; j < 4; j++) {
      //从第一行开始，从上往下进行检查
      const index = i + j * 4
      const curValue = itemList[index];
      let curIndex = i + j * 4;
      if (!itemList[curIndex]) continue;
      while (curIndex - 1 >= j * 4 && itemList[curIndex - 1] === 0) {
        curIndex--;
      }
      itemList[index] = 0;
      if (curIndex - 1 >= j * 4 && itemList[curIndex - 1] === curValue) {
        itemList[curIndex - 1] = 2 * curValue;
        score += curValue
      } else {
        itemList[curIndex] = curValue;
      }
    }
  }
  return itemList;
};

const moveRight = itemList => {
  for (let i = 2; i >= 0; i--) {
    //从第3列开始，从右往左进行检查
    for (let j = 0; j < 4; j++) {
      //从第一行开始，从上往下进行检查
      const index = i + j * 4
      const curValue = itemList[index];
      let curIndex = i + j * 4;
      if (!itemList[curIndex]) continue;
      while (curIndex + 1 <= (j + 1) * 4 - 1 && itemList[curIndex + 1] === 0) {
        curIndex++;
      }
      itemList[index] = 0;
      if (curIndex + 1 <= (j + 1) * 4 - 1 && itemList[curIndex + 1] === curValue) {
        itemList[curIndex + 1] = 2 * curValue;
        score += curValue
      } else {
        itemList[curIndex] = curValue;
      }
    }
  }
  return itemList;
};

const generateRandom = itemList => {
  let emptyList = [];
  itemList.map((value, index) => {
    if (!value) emptyList.push(index);
  });
  if(!emptyList.length){
    return null
  }
  itemList[emptyList[Math.floor(Math.random() * emptyList.length)]] =
    Math.random() > 0.6 ? 2 : 4;
  return itemList;
};

const onFailing = () => {
  score = 0
}

const getScore = () => {
  return score
}

const updater = {
  getScore: getScore,
  onFailing: onFailing,
  moveUp: moveUp,
  moveDown: moveDown,
  moveLeft: moveLeft,
  moveRight: moveRight,
  generateRandom: generateRandom,
};

export default updater;
