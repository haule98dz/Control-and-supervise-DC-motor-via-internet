const FPS = 30

// load canvas
canvas = document.getElementById("gc")
if (isMobile) {
    canvas.height = screen.width * window.devicePixelRatio
    canvas.width = screen.height * window.devicePixelRatio
}
else {
    canvas.height = screen.height
    canvas.width = screen.width
}
var h = canvas.height
var w = canvas.width
context = canvas.getContext("2d")

let spdMeter = new SpeedMeter(context, w * 0.3, h * 0.25, w * 0.1)
spdMeter.maxValue = 1200
spdMeter.stepIndex = 100


let ammeter = new Ammeter(context, w * 0.3, h * 0.66, w * 0.14)
ammeter.maxValue = 2
ammeter.majorTick = 0.5
ammeter.minorTick = 0.1

let chart1 = new Chart(context, w * 0.47, h * 0.065, h * 0.5, w * 0.5, "#111111")
chart1.axes.x.lineColor = "white"
chart1.axes.x.lineColor = "white"
chart1.axes.y.lineColor = "white"
chart1.axes.y2.lineColor = "white"
chart1.axes.x.min = 0
chart1.axes.x.max = 5
chart1.axes.y.max = 1200
chart1.axes.y.period = 200
chart1.axes.y.minorPeriod = 40
chart1.axes.y.fontSize = 12
chart1.axes.y.textColor = "white"
chart1.axes.y2.max = 2
chart1.axes.y2.period = 0.25
chart1.axes.y2.minorPeriod = 0.05
chart1.axes.y2.majorGrid.enabled = false
chart1.axes.y2.minorGrid.enabled = false
chart1.axes.y2.textColor = "yellow"
chart1.lines.push(new chartLine())
chart1.lines[0].color = "white"
chart1.lines[1].y = 2
chart1.lines[1].color = "yellow"
chart1.lines[1].enabled = true

chart1.interval = 10

let chart2 = new Chart(context, w * 0.47, h * 0.065, h * 0.5, w * 0.5, "#111111")
chart2.axes.x.lineColor = "white"
chart2.axes.x.lineColor = "white"
chart2.axes.x.max = 100
chart2.axes.x.period = 5
chart2.axes.x.minorPeriod = 1
chart2.axes.x.toFixed = 0
chart2.axes.y.enabled = false
chart2.axes.y2.lineColor = "white"
chart2.axes.y2.max = 50
chart2.axes.y2.period = 5
chart2.axes.y2.minorPeriod = 1
chart2.axes.y2.majorGrid.enabled = true
chart2.axes.y2.minorGrid.enabled = true
chart2.lines[0].color = "red"
chart2.lines[0].y = 2

var chartSelect = 1
function selectChanged() {
    switch (document.getElementById("charts-title").value) {
        case "speed":
            chartSelect = 1
            break
        case "temperature":
            chartSelect = 2
    }
}

let clock = new Clock(context, w * 0.913, h * 0.833, w * 0.063)
let thermometer = new Thermometer(context, w * 0.05, h * 0.1, h * 0.7)
thermometer.labelColor = "white"
thermometer.min = 0
thermometer.max = 40

//mouse events
var mousePosition = {
    x: 0,
    y: 0
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect()
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    }
}

canvas.addEventListener('mousemove', function (evt) {
    mousePosition = getMousePos(canvas, evt)
}, false)

// set up interval (game loop)
setInterval(update, 1000 / FPS)

function update() {
    // draw background
    //context.fillStyle = "#E5F0FC"
    context.fillStyle = "#333333"
    context.fillRect(0, 0, w, h)

    //background of the speed meter and the ammeter
    context.fillStyle = "#222222"
    context.fillRect(w * 0.185, h * 0.051, w * 0.23, h * 0.925)
    context.strokeStyle = "#C0D2E5"
    context.strokeRect(w * 0.185, h * 0.511, w * 0.23, h * 0.465)
    context.strokeStyle = "#C0D2E5"
    context.strokeRect(w * 0.185, h * 0.051, w * 0.23, h * 0.46)

    //background of the thermometer
    context.fillStyle = "#222222"
    context.fillRect(w * 0.02, h * 0.051, w * 0.15, h * 0.925)
    context.strokeStyle = "#C0D2E5"
    context.strokeRect(w * 0.02, h * 0.051, w * 0.15, h * 0.925)

    spdMeter.draw()
    ammeter.draw()

    switch (chartSelect) {
        case 1:
            chart1.draw()
            break
        case 2:
            chart2.draw()
    }
    clock.draw()
    thermometer.draw()

    context.fillStyle = "#363359"
    context.fillRect(0, 0, w, h * 0.034)
}
