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