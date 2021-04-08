
var a = 1.656e-10
var b = -3.94e-07
var c = 0.0003394
var d = -0.1251
var e = 17.67

socket.on('s-dcMotor', (arr) => {
    var data = arr.split(';')
    console.log(data[1])
    jspd = JSON.parse(data[0])
    jcrr = JSON.parse(data[1])

    for (i in jspd) {
        var x = jspd[i]
        addPoint(chart1, 0, jspd[i])
        addPoint(chart1, 1, Math.abs((e + x * (d + x * (c + x * (b + x * a)))) * 0.00812514 * jcrr[i]))
    }

    spdMeter.value = lastElementOf(chart1.lines[0].points)[1] //chart1.lines[0].points[chart1.lines[0].points.length()-1]
    ammeter.value = lastElementOf(chart1.lines[1].points)[1]
})

socket.on('time', (timeString) => {
    clock.now = new Date(timeString)
})

socket.on('s-temperature', (temp) => {
    thermometer.value = temp
    addPoint2(chart2, 0, temp, 1)
})

socket.on('SpdSP', (SP) => {
    document.getElementById("setpoint").value = SP
})

socket.on('TempSP', (SP) => {
    document.getElementById("setpoint2").value = SP
})

socket.on('direction', (dir) => {
    if (dir == "1") document.getElementById("cw").checked = true
    else document.getElementById("ccw").checked = true
})

function sendSpdSP() {
    socket.emit("s-SpdSP", document.getElementById("setpoint").value)
}

function sendTempSP() {
    socket.emit("s-TempSP", document.getElementById("setpoint2").value)
}

function radioChange() {
    var isCw = document.getElementById("cw").checked
    if (spdMeter.value == 0) {
        if (document.getElementById("cw").checked) socket.emit("s-direction", "1")
        if (document.getElementById("ccw").checked) socket.emit("s-direction", "0")
    } else {
        alert("Chỉ được chỉnh chiều quay khi động cơ đã dừng")
        if (isCw) document.getElementById("cw").checked = true
        else document.getElementById("ccw").checked = true
    }
}
