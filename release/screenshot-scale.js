function fit() {
  var r = document.querySelector('.root');
  if (!r) return;
  var s = Math.min(window.innerWidth / 1080, window.innerHeight / 1920);
  r.style.transform = 'scale(' + s + ')';
  r.style.marginLeft = ((window.innerWidth - 1080 * s) / 2) + 'px';
}
window.addEventListener('load', fit);
window.addEventListener('resize', fit);
