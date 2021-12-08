export function scrollMove(el,tagert,delay){
  let distance = el.scrollTop
  let intervalTime = 30
  let itemDistance = distance/(delay/intervalTime)
  let intervalId = setInterval(()=>{
    distance -= itemDistance
    if(distance<=tagert){
      distance = tagert
      clearInterval(intervalId)
    }
    el.scrollTop = distance
  },intervalTime)
}
// let intervalId 
// export function scorllMoveTwo(el,tagert,delay){
//   clearInterval(intervalId)
//   let distance = el.scrollTop
//   let intervalTime = 50
//   let itemDistance = tagert/(delay/intervalTime) // 得到每次滚动的距离
//    intervalId = setInterval(()=>{
//     distance += itemDistance
//     if(distance>=tagert){
//       distance = tagert
//       clearInterval(intervalId)
//     }
//     el.scrollTop = distance

//   },intervalTime)
// }