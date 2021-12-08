// 进入全屏
export function fullScreen(element) {

  let rfs = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;
  if (typeof rfs != "undefined" && rfs) {
      rfs.call(element);
  };
  return;
}
// 退出全屏
export function exitScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
}
else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
}
else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
}
else if (document.msExitFullscreen) {
    document.msExitFullscreen();
}
if (typeof cfs != "undefined" && cfs) {
    cfs.call(el);
}
}
// 判断是否为全屏
export function isFullScreen() {
  return  !! (
    document.fullscreen || 
    document.mozFullScreen ||                         
    document.webkitIsFullScreen ||       
    document.webkitFullScreen || 
    document.msFullScreen 
  );
}
