
var el = ""
function css(prop, k) {
    var px = 0
    if (prop == "top" || prop == "height" || prop == "margin-top") px = k * h * 0.01
    else px = k * w * 0.01
    $(el).css(prop, px.toFixed(1) + "px")
}

el = "#buttonFullscreen"
css("width", 10.98)
css("height", 2.6)
css("top", 0.6)
css("left", 88)

el = "#buttonPassword"
css("width", 14)
css("height", 2.6)
css("top", 0.6)
css("left", 73)

el = "#submit-setpoint"
css("height", 3.38)

el = "#submit-control-parameters"
css("top", 12.37)
css("left", 20.5)
css("width", 5.85)
css("height", 11.85)

el = "#charts-title"
css("top", 62.5)
css("left", 60.4)
css("font-size", 1.464)

el = "#labelsetpoint"
css("top", 78.125)
css("left", 60.4)

el = ".grid-container"
css("top", 70.31)
css("left", 42.53)
css("width", 40)
css("height", 27.45)
//$(".grid-container").css("grid-template-rows", "auto auto")

el = ".grid-item"
css("font-size", 1)

el = "input"
css("height", 3.9)
css("font-size", 1.317)

el = "#control-panel"
css("margin-top", 0)
css("margin-left", 1)

el = "#control-panel2"
css("margin-top", 0)
css("margin-left", 1)
