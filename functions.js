var isFullscreen = false
var isMobile = false;

//get fullscreen
function fullscreen() {
  let elem = document.documentElement
  if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if (elem.mozRequestFullScreen) { // Firefox
    elem.mozRequestFullScreen()
  } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
    elem.webkitRequestFullscreen()
  } else if (elem.msRequestFullscreen) { // Microsoft IE/Edge
    elem.msRequestFullscreen()
  }
}

//exit fullscreen mode
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

//switch between fullscreen and windowed mode
function clickFullscreen() {
  if (isFullscreen) {
    exitFullscreen()
    if (isMobile) isFullscreen = false
    document.getElementById("buttonFullscreen").innerHTML = "Xem toàn màn hình"
  }
  else {
    fullscreen()
    if (isMobile) {
      screen.orientation.lock("landscape-primary")
    }
    if (isMobile) isFullscreen = true
    document.getElementById("buttonFullscreen").innerHTML = "Chế độ cửa sổ"
  }
}

//detect when in full screen mode
window.addEventListener("resize", () => {
  setTimeout(() => {
    const windowWidth = window.innerWidth * window.devicePixelRatio
    const windowHeight = window.innerHeight * window.devicePixelRatio
    const screenWidth = window.screen.width
    const screenHeight = window.screen.height
    if (((windowWidth / screenWidth) >= 0.95) && ((windowHeight / screenHeight) >= 0.95)) {
      isFullscreen = true
      if (!isMobile) document.getElementsByTagName('body')[0].style.overflow = "hidden"
      document.getElementById("buttonFullscreen").innerHTML = "Chế độ cửa sổ"
    }
    else {
      isFullscreen = false
      if (!isMobile) document.getElementsByTagName('body')[0].style.overflow = "visible"
      document.getElementById("buttonFullscreen").innerHTML = "Xem toàn màn hình"
    }
  }, 100)
})

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  isMobile = true
  //document.getElementById("buttonFullscreen").style.display = "none";
}

var shifted = false
function addPoint(chart, line, y) {
  var len = chart.lines[line].points.length
  var x = chart.lines[line].points[len - 1][0] + chart.interval * 0.001

  if (x > chart.axes.x.max || (shifted && line == 1)) {
    chart.lines[line].points.shift()
    chart.axes.x.min = chart.axes.x.min + x - chart.axes.x.max
    chart.axes.x.max = x
    shifted = true
  }
  chart.lines[line].points.push([x, y])
}
var fst = true;
var shifted2 = false
function addPoint2(chart, line, y) {
  var len = chart.lines[line].points.length
  var x
  if (fst) x = 0
  else x = chart.lines[line].points[len - 1][0] + 1

  if (x > chart.axes.x.max || (shifted2 && line == 1)) {
    chart.lines[line].points.shift()
    chart.axes.x.min = chart.axes.x.min + x - chart.axes.x.max
    chart.axes.x.max = x
    shifted2 = true
  }
  if (fst) {
    chart.lines[line].points[0] = [x, y]
    fst = false
  }
  else
    chart.lines[line].points.push([x, y])
}

function addPoints(chart, line, y_text, first = true) {
  y_json = JSON.parse(y_text)
  for (i in y_json) {
    addPoint(chart, line, y_json[i], first)
  }
}

function lastElementOf(arr) {
  return arr[arr.length - 1]
}

function clickPassword() {
  var els = ["submit-setpoint", "setpoint", "submit-setpoint2", "setpoint2", "cw", "ccw"]
  if (document.getElementById(els[0]).disabled) {
    var password = prompt("Vui lòng nhập mật khẩu để kích hoạt chế độ điều khiển:", "");
    if (password != null) {
      if (password == "humg") {
        for (el of els) {
          document.getElementById(el).disabled = false
        }
        document.getElementById("buttonPassword").innerHTML = "Thoát chế độ điều khiển"
        alert("Thành công!")
      } else {
        alert("Mật khẩu không đúng!")
      }
    }
  } else {
    for (el of els) {
      document.getElementById(el).disabled = true
    }
    document.getElementById("buttonPassword").innerHTML = "Yêu cầu quyền điều khiển"
  }
}