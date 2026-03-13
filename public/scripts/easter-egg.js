(function () {
  var codes = [38, 38, 40, 40, 37, 39, 37, 39, 65, 66];
  var index = 0;
  var timer;

  window.addEventListener("keydown", function (e) {
    if (codes[index] === e.keyCode) {
      index++;
      if (index >= codes.length) {
        index = 0;
        activate();
      }
    } else {
      index = 0;
    }
  });

  function activate() {
    clearInterval(timer);
    var el = document.createElement("div");
    el.className = "EasterEgg";
    el.innerHTML = '<img alt="" src="/images/buni.gif"/>';
    document.body.appendChild(el);
    var pos = 0;
    timer = setInterval(function () {
      pos += 3;
      el.style.transform = "translateX(" + pos + "px)";
      if (pos > document.body.offsetWidth) {
        clearInterval(timer);
        el.remove();
      }
    }, 17);
  }
})();
