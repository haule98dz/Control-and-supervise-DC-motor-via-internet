class Ammeter {
    constructor(context, positionX = 600, positionY = 200, side = 200, maxValue = 1, majorTick = 0.2, minorTick = 0.04) {
        this.context = context
        this.positionX = positionX
        this.positionY = positionY
        this.side = side
        this.maxValue = maxValue
        this.majorTick = majorTick
        this.minorTick = minorTick
        this.centerBias = 0
        this.value = 0
        this.label = "Dòng làm việc\ncủa động cơ"
        this.labelColor = "white"
    }

    draw() {
        this.centerBias = this.side * 0.35
        this.context.translate(this.positionX, this.positionY)
        this.drawFace()
        this.drawTicksAndHand()

        this.context.translate(0, this.side * 0.9)
        drawText(this.context, this.label, 0, 0, this.side*0.14, "bold", this.labelColor)
        this.context.translate(0, -this.side * 0.9)

        this.context.translate(-this.positionX, -this.positionY)
    }

    drawFace() {
        // fill the background
        this.context.fillStyle = "#DDDDDD"
        this.context.fillRect(-this.side / 2, -this.side / 2, this.side, 1.25 * this.side)

        // stroke the border
        this.context.strokeStyle = "black"
        this.context.lineWidth = this.side * 0.03
        this.context.strokeRect(-this.side / 2, -this.side / 2, this.side, 1.25 * this.side)
        this.context.lineWidth = 1

        // Ampere unit
        this.context.font = "bold " + this.side * 0.15 + "px arial"
        this.context.textBaseline = "middle"
        this.context.textAlign = "center"
        this.context.fillStyle = "black"
        this.context.fillText("A", -this.side * 0.33, -this.side * 0.33)

        // HUMG copyright ^^
        this.context.font = "bold " + this.side * 0.08 + "px arial"
        this.context.fillStyle = "black"
        this.context.fillText("Ammeter", this.side * 0.12, this.side * 0.08)
        this.context.font = "italic " + this.side * 0.05 + "px arial"
        this.context.fillStyle = "black"
        this.context.fillText("HUMG-NCKH", this.side * 0.12, this.side * 0.16)

        // draw digital displayer
        var ddPosition = this.side * 0.6
        this.context.translate(0, ddPosition);
        //background
        var rectHeight = this.side * 0.15
        var rectWeight = this.side * 0.6
        this.context.fillStyle = "#A5AE99"
        this.context.fillRect(-rectWeight / 2, -rectHeight / 2, rectWeight, rectHeight)
        //display value
        this.context.font = rectHeight * 0.8 + "px arial"
        this.context.textBaseline = "middle";
        this.context.textAlign = "right";
        this.context.fillStyle = "black";
        this.context.fillText(this.value, 0.9 * rectWeight / 2, 0);
        //border
        this.context.strokeStyle = "black"
        this.context.lineWidth = 1;
        this.context.strokeRect(-1.05 * rectWeight / 2, -1.2 * rectHeight / 2, 1.05 * rectWeight, 1.2 * rectHeight);

        this.context.translate(0, - ddPosition);
    }

    drawTicksAndHand() {
        //draw Ticks
        var marksRadius = this.side * 0.77
        var period = Math.round(this.majorTick / this.minorTick);
        this.context.translate(this.centerBias, this.centerBias)
        var count = 0
        this.context.strokeStyle = "black"
        var n = Math.round(this.maxValue / this.minorTick);
        //draw color
        var colorAngles = [-Math.PI, -Math.PI + 0.7 * Math.PI / 2, -Math.PI + 0.9 * Math.PI / 2, -Math.PI / 2]
        var colorRadius = marksRadius * 0.97
        this.context.lineWidth = this.side * 0.048
        //safe color
        this.context.strokeStyle = "#c4fcc4"
        this.context.beginPath()
        this.context.arc(0, 0, colorRadius, colorAngles[0], colorAngles[1])
        this.context.stroke()
        //warning color
        this.context.strokeStyle = "#ffb638"
        this.context.beginPath()
        this.context.arc(0, 0, colorRadius, colorAngles[1], colorAngles[2])
        this.context.stroke()
        //danger color
        this.context.strokeStyle = "#ff6d6d"
        this.context.beginPath()
        this.context.arc(0, 0, colorRadius, colorAngles[2], colorAngles[3])
        this.context.stroke()

        this.context.lineWidth = 1

        //draw ticks and numbers
        this.context.strokeStyle = "black"
        for (count = 0; count <= n; count++) {
            var temp = count * this.minorTick
            var ang = 0.5 * Math.PI * temp / this.maxValue - Math.PI / 2
            this.context.rotate(ang)
            var tickLength
            var isMajorTick = count % period == 0
            if (isMajorTick) {
                //prepare to draw major ticks
                this.context.translate(0, - marksRadius * 0.8)
                this.context.rotate(-ang)
                //then draw numbers
                this.context.font = marksRadius * 0.1 + "px arial";
                this.context.textAlign = "center"
                this.context.fillStyle = "black"
                this.context.fillText(temp.toString(), 0, 0);
                this.context.rotate(ang)
                this.context.translate(0, marksRadius * 0.8)
                tickLength = this.side * 0.08
                this.context.lineWidth = 2
            }
            else {
                //prepare to draw minor ticks
                tickLength = this.side * 0.04
                this.context.lineWidth = 1
            }
            //draw ticks
            this.context.beginPath()
            this.context.moveTo(0, -marksRadius)
            this.context.lineTo(0, -marksRadius + tickLength)
            this.context.stroke()
            this.context.rotate(-ang)
        }

        //draw the pointer
        this.context.strokeStyle = "red"
        this.context.lineWidth = 2
        this.context.rotate((this.value / this.maxValue - 1) * Math.PI / 2)
        this.context.beginPath()
        this.context.moveTo(0, 0)
        this.context.lineTo(0, -this.side * 0.75)
        this.context.stroke()
        this.context.rotate(-(this.value / this.maxValue - 1) * Math.PI / 2)

        this.context.fillStyle = "red"
        this.context.beginPath()
        this.context.arc(0, 0, this.side * 0.03, 0, 2 * Math.PI)
        this.context.fill()

        //now let's translate back to the position at the beginning ^_^
        this.context.translate(-this.centerBias, -this.centerBias)
    }
}
