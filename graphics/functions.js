// a function to quickly draw text on canvas
function drawText(context, text = "", posX, posY, size = 20, style = "", color = "black", baseline = "middle", align = "center", font = "arial") {
    var s = text.toString()
    var lines = s.split("\n")
    for (i in lines) {
        context.font = style + " " + size + "px " + font
        context.textBaseline = baseline
        context.textAlign = align
        context.fillStyle = color
        context.fillText(lines[i], posX, posY + i * size * 1.2)
    }
}
