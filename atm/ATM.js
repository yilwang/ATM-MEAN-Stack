
//Loading Keyboard Numbers
function load() {
  var array = new Array();

  while (array.length < 10) {
      var temp = Math.round(Math.random() * 9);
      if (!contain(array, temp)) {
          array.push(temp);
      }
  }
  for (i = 0; i < 10; i++) {
      var btn = document.getElementById("btn" + i);
      btn.value = array[i];
  }
}

function checkPin(pin) {
    if (pin == 1234) {

    }



}

var otherWindow;
function openOther() {
    otherWindow = window.open("valid.html", "otherWindow");

}

function otherFunc() {
    otherWindow.postMessage("otherFunc", "*");
}