const colorDict = {2:'#FFFFF0',4:'#FFFACD',8:'#FFDEAD'
,16:'#FFDAB9',32:'#E0EEE0', 64:'#AFEEEE',128:'#BFEFFF',
256:'#7FFFD4', 512:'#8470FF', 1024:'#FFE4E1',2048:'#FF82AB',
4096:'#FF00FF',8192:'	#FF0000'}

const getColor = value => {
  const res = colorDict[value]
  return res ? res : '#ffffff'
}

export default getColor