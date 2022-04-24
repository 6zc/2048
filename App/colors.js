function getColor (value) {
  const colorDict = {
    2: '#FFFFF0',
    4: '#FFFACD',
    8: '#FFDEAD',
    16: '#FFDAB9',
    32: '#E0EEE0',
    64: '#AFEEEE',
    128: '#BFEFFF',
    256: '#7FFFD4',
    512: '#8470FF',
    1024: '#FFE4E1',
    2048: '#FF82AB',
    4096: '#F08080',
    8192: '#FF4500',
    16384: '#FF0000'
  };
  const res = colorDict[value];
  return res ? res : '#ffffff';
};

function getHorizontalBound (pos, itemList) {
  let curPos = pos
  const i = pos - pos%4
  const j = i+3
  let leftCount = 0
  let rightCount = 0
  let stack = [itemList[curPos]]
  while(curPos>i){
    if(!itemList[curPos-1]){
      leftCount++
    }else if(itemList[curPos-1]===stack[stack.length-1]){
      stack.pop()
      leftCount++
    }else{
      stack.push(itemList[curPos-1])
    }      
    curPos--
  }
  curPos = pos
  stack = [itemList[curPos]]
  while(curPos<j){
    if(!itemList[curPos+1]){
      rightCount++
    }else if(itemList[curPos+1]===stack[stack.length-1]){
      stack.pop()
      rightCount++
    }else{
      stack.push(itemList[curPos+1])
    }      
    curPos++
  }
  
  return [-leftCount*80, rightCount*80]
}

function getVerticalBound (pos, itemList) {
  let curPos = pos
  const i = pos%4
  const j = pos%4 + 12
  let upCount = 0
  let downCount = 0
  let stack = [itemList[curPos]]
  while(curPos>i){
    if(!itemList[curPos-4]){
      upCount++
    }else if(itemList[curPos-4]===stack[stack.length-1]){
      stack.pop()
      upCount++
    }else{
      stack.push(itemList[curPos-4])
    }      
    curPos-=4
  }
  curPos = pos
  stack = [itemList[curPos]]
  while(curPos<j){
    if(!itemList[curPos+4]){
      downCount++
    }else if(itemList[curPos+4]===stack[stack.length-1]){
      stack.pop()
      downCount++
    }else{
      stack.push(itemList[curPos+4])
    }      
    curPos+=4
  }
  
  return [-upCount*80, downCount*80]
}

export {getColor, getHorizontalBound, getVerticalBound}