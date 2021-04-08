//grid as class (to create grid objects)
class chartGrid {
    constructor(enabled = true, lineWidth = 1, lineDash = [], color = "black") {
        this.enabled = enabled
        this.lineWidth = lineWidth
        this.lineDash = lineDash
        this.color = color
    }
}
//line as class
class chartLine {
    constructor(enabled = true, color = "red", lineWidth = 2, style = "line", lineDash = []) {
        this.enabled = enabled
        this.lineWidth = lineWidth
        this.style = style
        this.lineDash = lineDash
        this.color = color
        this.points = [[0, 0]]
        this.y = 1
    }

    draw(context, xRatio, yRatio, xmin, ymin) {
        context.beginPath()
        context.lineWidth = this.lineWidth
        context.strokeStyle = this.color
        context.setLineDash(this.lineDash)
        var firstPoint = true
        this.points.forEach((value) => {
            var x = (value[0] - xmin) * xRatio
            var y = -(value[1] - ymin) * yRatio

            if (firstPoint) {
                context.moveTo(x, y)
                firstPoint = false
            } else context.lineTo(x, y)
        })
        context.stroke()
    }
}

class chartAxis {
    constructor(enabled = true, horizontal = true, position = 0, min = 0, max = 10, period = 1, minorTicks = false, minorPeriod = 0.2, lineWidth = 2, lineColor = "black", arrow = true, arrowSize = 12, tickRight = true, tickLength = 10) {
        this.arrowSize = arrowSize
        this.enabled = enabled
        this.horizontal = horizontal
        this.position = position
        this.min = min
        this.max = max
        this.period = period
        this.minorTicks = minorTicks
        this.minorPeriod = minorPeriod
        this.lineWidth = lineWidth
        this.lineColor = lineColor
        this.arrow = arrow
        this.tickRight = tickRight
        this.tickLength = tickLength
        this.majorGrid = new chartGrid(true, 1, [3, 1], "#666666")
        this.minorGrid = new chartGrid(true, 0.3, [1, 1], "#444444")
        this.toFixed = 2
        this.fontSize = 15
        this.textColor = "white"
    }
}

class Chart {
    constructor(context, positionX = 20, positionY = 350, height = 400, width = 800, background = "white") {
        this.context = context
        this.positionX = positionX
        this.positionY = positionY
        this.height = height
        this.width = width
        this.axes = {
            x: new chartAxis(true, true, 1),
            y: new chartAxis(true, false, 0),
            y2: new chartAxis(true, false, 0.94)
        }
        this.axes.y.tickRight = false
        this.lines = [
            new chartLine()
        ]
        this.extendRatio = 0.06

        this.realPositionAxisX = this.axes.x.position * this.width
        this.realPositionAxisY = this.axes.y.position * this.height

        this.background = background
        this.interval = 30
    }

    draw() {
        this.xRatio = this.width * (1 - this.extendRatio) / (this.axes.x.max - this.axes.x.min)
        this.yRatio = this.height * (1 - this.extendRatio) / (this.axes.y.max - this.axes.y.min)
        this.y2Ratio = this.height * (1 - this.extendRatio) / (this.axes.y2.max - this.axes.y2.min)
        //update axis

        //draw background and border
        this.context.translate(this.positionX, this.positionY)
        this.context.fillStyle = this.background
        this.context.fillRect(-60, -10, this.width + 80, this.height * 1.25)
        this.context.strokeStyle = "#C0D2E5"
        this.context.strokeRect(-60, -10, this.width + 80, this.height * 1.25)
        //draw axes (include grid, ticks and number, line)
        this.drawAxis(this.axes.x)
        this.drawAxis(this.axes.y)
        this.drawAxis(this.axes.y2)
        //draw line
        this.context.translate(0, this.height)
        for (i in this.lines) {
            this.lines[i].draw(this.context, this.xRatio, this.lines[i].y == 1? this.yRatio : this.y2Ratio, this.axes.x.min, this.axes.y.min)
        }
        this.context.translate(0, -this.height)

        this.context.translate(-this.positionX, -this.positionY)
    }

    drawAxis(axis) {
        if (!axis.enabled) return
        var length = this.width
        var realPosition = this.height * axis.position
        //if this axis is horizontal (x axis)
        if (!axis.horizontal) {
            this.context.rotate(-Math.PI / 2)
            this.context.translate(-this.height, 0)
            length = this.height
            realPosition = this.width * axis.position
        }

        if (true) {
            this.context.translate(0, realPosition)
            this.context.lineWidth = axis.lineWidth
            this.context.strokeStyle = axis.lineColor
            //axis line
            this.context.beginPath()
            this.context.moveTo(0, 0)
            this.context.lineTo(length, 0)
            this.context.stroke()
            //arrow
            if (axis.arrow) {
                this.context.beginPath()
                this.context.translate(length, 0)
                this.context.rotate(Math.PI / 6)
                this.context.moveTo(-axis.arrowSize, 0)
                this.context.lineTo(0, 0)
                this.context.rotate(-Math.PI / 3)
                this.context.lineTo(-axis.arrowSize, 0)
                this.context.rotate(Math.PI / 6)
                this.context.translate(-length, 0)
                this.context.stroke()
            }

            //major tick marks & grid
            var extend = length * this.extendRatio
            var tickLength = axis.tickLength
            var iAbsolute = Math.floor(axis.min / axis.period) + 1
            var offset = iAbsolute * axis.period - axis.min
            var iRelative = 0
            var tempVal = 0
            var tick = 0
            var ratio = (length - extend) / (axis.max - axis.min)
            this.context.lineWidth = 2
            var textPos = tickLength + axis.fontSize * 0.25
            while (true) {
                tempVal = axis.period * iAbsolute
                tick = (offset + axis.period * iRelative) * ratio
                if (tempVal > axis.max) break
                this.context.translate(tick, 0)
                //draw tick mark
                this.context.beginPath()
                this.context.strokeStyle = axis.lineColor
                this.context.lineWidth = 2
                this.context.moveTo(0, 0)
                this.context.lineTo(0, axis.tickRight ? tickLength : -tickLength)
                this.context.stroke()
                //draw number
                var xtemp, ytemp, baseline, align
                var temp = axis.tickRight ? textPos : -textPos
                if (!axis.horizontal) {
                    this.context.rotate(Math.PI / 2)
                    xtemp = temp
                    ytemp = 0
                    baseline = "middle"
                    align = axis.tickRight ? "left" : "right"
                } else {
                    xtemp = 0
                    ytemp = temp
                    baseline = "top"
                    align = "center"
                }

                drawText(this.context, tempVal.toFixed(axis.toFixed), xtemp, ytemp, axis.fontSize, "", axis.textColor, baseline, align)
                if (!axis.horizontal) {
                    this.context.rotate(-Math.PI / 2)
                }

                //draw grid line
                this.drawGridLines(axis.majorGrid, 0, axis.horizontal, realPosition)
                this.context.translate(-tick, 0)
                iRelative++
                iAbsolute++
            }

            //minor tick marks & grid & numbers
            var extend = length * 0.06
            var tickLength = tickLength * 0.5
            var iAbsolute = Math.floor(axis.min / axis.minorPeriod) + 1
            var offset = iAbsolute * axis.minorPeriod - axis.min
            var iRelative = 0

            while (true) {
                tempVal = axis.minorPeriod * iAbsolute
                tick = (offset + axis.minorPeriod * iRelative) * ratio
                if (tempVal > axis.max) break
                this.context.translate(tick, 0)
                //draw tick mark
                this.context.beginPath()
                this.context.strokeStyle = axis.lineColor
                this.context.lineWidth = 1
                this.context.moveTo(0, 0)
                this.context.lineTo(0, axis.tickRight ? tickLength : -tickLength)
                this.context.stroke()

                //draw grid line
                this.drawGridLines(axis.minorGrid, 0, axis.horizontal, realPosition)

                this.context.translate(-tick, 0)
                iRelative++
                iAbsolute++
            }

            this.context.stroke()
            this.context.translate(0, -realPosition)
        }

        if (!axis.horizontal) {
            this.context.translate(this.height, 0)
            this.context.rotate(Math.PI / 2)
        }
    }

    drawGridLines(grd, pos, horizontal, trans) {
        if (grd.enabled) {
            this.context.translate(0, -trans)
            this.context.beginPath()
            this.context.setLineDash(grd.lineDash)
            this.context.lineWidth = grd.lineWidth
            this.context.strokeStyle = grd.color
            this.context.moveTo(pos, horizontal ? this.height * 0.05 : 0)
            this.context.lineTo(pos, horizontal ? this.height : this.width * 0.95)
            this.context.stroke()
            this.context.setLineDash([])
            this.context.translate(0, trans)
        }
    }
}

/*
MAP OF OBJECTS AND PROPERTIES IN THIS FILE:

chart
    context
    position
    height
    width
    axes = {x, y, y2}
        enabled
        horizontal?
        position
        min
        max
        period
        minorTicks
        minorPeriod
        lineWidth
        lineColor
        arrow
        majorGrid, minorGrid
            enabled
            lineWidth
            lineStyle
            color
*/