class Clock {
    constructor(context, positionX = 0, positionY = 0, radius = 100) {
        this.positionX = positionX
        this.positionY = positionY
        this.context = context
        this.radius = radius
        this.now = new Date()
    }

    draw() {
        this.context.translate(this.positionX, this.positionY)
        this.drawFace()
        this.drawNumbers()
        this.drawTime()
        this.context.translate(-this.positionX, -this.positionY)
    }

    drawFace() {
        //draw background and border
        this.context.beginPath()
        this.context.arc(0, 0, this.radius, 0, 2 * Math.PI)
        this.context.fillStyle = '#eeeeee'
        this.context.fill()
        this.context.strokeStyle = "black"
        this.context.lineWidth = this.radius * 0.1
        this.context.stroke()
        //center circle
        this.context.beginPath()
        this.context.arc(0, 0, this.radius * 0.1, 0, 2 * Math.PI)
        this.context.fillStyle = 'black'
        this.context.fill()
    }

    drawNumbers() {
        var ang  //angular (0 to 2 pi)
        var num  //number (1 to 12)
        this.context.font = this.radius * 0.17 + "px arial"
        this.context.textBaseline = "middle"
        this.context.textAlign = "center"
        for (num = 1; num < 13; num++) {
            ang = num * Math.PI / 6
            this.context.rotate(ang)
            this.context.translate(0, -this.radius * 0.82)
            this.context.rotate(-ang)
            this.context.fillText(num.toString(), 0, 0)
            this.context.rotate(ang)
            this.context.translate(0, this.radius * 0.82)
            this.context.rotate(-ang)
        }
    }

    //draw hands of the clock:
    drawTime() {
        var hour = this.now.getHours()
        var minute = this.now.getMinutes()
        var second = this.now.getSeconds()
        //hour
        hour = hour % 12;
        hour = (hour * Math.PI / 6) +
            (minute * Math.PI / (6 * 60)) +
            (second * Math.PI / (360 * 60))
        this.drawHand(hour, this.radius * 0.5, this.radius * 0.068)
        //minute
        minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60))
        this.drawHand(minute, this.radius * 0.8, this.radius * 0.045)
        // second
        second = (second * Math.PI / 30)
        this.drawHand(second, this.radius * 0.9, this.radius * 0.02)
    }

    drawHand(pos, length, width) {
        // this is a single function to draw all three hands of the clock
        this.context.beginPath()
        this.context.lineWidth = width
        this.context.lineCap = "round"
        this.context.moveTo(0, 0)
        this.context.rotate(pos)
        this.context.lineTo(0, -length)
        this.context.stroke()
        this.context.rotate(-pos)
        this.context.lineCap = "butt"
    }
}