class Thermometer {
    constructor(context, positionX = 0, positionY = 0, height = 450, min = 0, max = 100, majorPeriod = 10, minorPeriod = 2) {
        this.context = context
        this.positionX = positionX
        this.positionY = positionY
        this.height = height
        this.min = min
        this.max = max
        this.width = height * 0.23
        this.majorPeriod = majorPeriod
        this.minorPeriod = minorPeriod
        this.value = 0
        this.label = "Nhiệt độ\ntừ cảm biến"
        this.labelColor = "black"
    }

    draw() {
        //draw body
        this.context.translate(this.positionX, this.positionY)
        this.context.strokeStyle = "#C0D2E5"
        this.context.strokeRect(0, 0, this.width, this.height)
        var grd = this.context.createLinearGradient(0, 0, this.width, 0)
        grd.addColorStop(0, "#BBBBBB")
        grd.addColorStop(0.05, "#666666")
        grd.addColorStop(0.4, "#CCCCCC")
        grd.addColorStop(0.6, "#CCCCCC")
        grd.addColorStop(0.95, "#666666")
        grd.addColorStop(1, "#BBBBBB")
        this.context.fillStyle = grd
        this.context.fillRect(0, 0, this.width, this.height)

        //initiating
        this.context.translate(this.width * 0.6, this.height*0.9)
        var length = this.height * 0.65
        var extend = this.height * 0.1
        var factor = length/(this.max - this.min)
        var temp, i = 0

        //draw liquid inside
        this.context.lineCap = "round"
            //container
        this.context.beginPath()
        this.context.lineWidth = this.width * 0.12
        var grad = this.context.createLinearGradient(0, 0, this.width * 0.09, 0)
        grad.addColorStop(0, "#333333")
        grad.addColorStop(1, "#DDDDDD")
        this.context.strokeStyle = grad
        this.context.moveTo(0,0)
        this.context.lineTo(0,-length - extend - this.height * 0.036)
        this.context.stroke()
            
        var grad = this.context.createLinearGradient(0, 0, this.width * 0.24, -this.width*0.1)
        grad.addColorStop(0, "#444444")
        grad.addColorStop(1, "#DDDDDD")
        this.context.fillStyle = grad
        this.context.beginPath()
        this.context.arc(0,0,this.height*0.056, 0, 2*Math.PI)
        this.context.fill()
        this.context.lineCap = "butt"

            //red liquid
        var grad = this.context.createLinearGradient(-this.width * 0.04, 0, this.width * 0.04, 0)
        grad.addColorStop(0, "red")
        grad.addColorStop(0.35, "#FF8888")
        grad.addColorStop(0.4, "#FFaaaa")
        grad.addColorStop(1, "red")
        this.context.beginPath()
        this.context.lineWidth = this.width * 0.08
        this.context.strokeStyle = grad
        this.context.moveTo(0,0)
        this.context.lineTo(0, - this.value * factor - extend)
        this.context.stroke()
        
        //the scale
        this.context.strokeStyle = "black"
            //major tick marks:
        this.context.lineWidth = 1.5
        this.context.beginPath()
        while (true) {
                //draw tick marks
            temp = i * this.majorPeriod
            if (temp > this.max) break
            this.context.translate(-15, -temp * factor - extend)
            this.context.moveTo(0, 0)
            this.context.lineTo(-15,0)
                //draw numbers
            drawText(this.context, temp, -this.width*0.14, 0, this.height * 0.035, "", "black", "middle", "right")

            this.context.translate(15, temp * factor + extend)
            i++
        }
        this.context.stroke()
            //minor tick marks:
        i = 0
        this.context.lineWidth = 1
        this.context.beginPath()
        while (true) {
                //draw tick marks
            temp = i * this.minorPeriod
            if (temp > this.max) break
            this.context.translate(-15, -temp * factor - extend)
            this.context.moveTo(0, 0)
            this.context.lineTo(-10,0)
            this.context.translate(15, temp * factor + extend)
            i++
        }
        this.context.stroke()

        //red circle
        this.context.fillStyle = "red"
        this.context.beginPath()
        this.context.arc(0,0,this.height*0.05, 0, 2*Math.PI)
        this.context.fill()

        var grad = this.context.createLinearGradient(-this.width * 0.14, -this.width * 0.14, this.width * 0.1, this.width * 0.1)
        grad.addColorStop(0, "white")
        grad.addColorStop(0.35, "#FF2222")
        grad.addColorStop(0.6, "#FF1111")

        this.context.fillStyle = grad
        this.context.beginPath()
        this.context.arc(0,0,this.height*0.044, 0, 2*Math.PI)
        this.context.fill()
        
        this.context.translate(-this.width * 0.6, -this.height*0.9)
        
        drawText(this.context, "°C", this.width * 0.28, this.height * 0.08, this.height * 0.045, "", "black")

        // HUMG copyright (^_^)
        var grad = this.context.createLinearGradient(0, this.height * 0.005, 0, this.height * 0.1)
        grad.addColorStop(0, "#333333")
        grad.addColorStop(0.35, "#666666")
        drawText(this.context, "HUMG-NCKH", this.width * 0.5, this.height * 0.02, this.height * 0.025, "bold", grad)

        //draw label
        this.context.translate(this.width * 0.5, this.height*1.05)
        drawText(this.context, this.label, 0, 0, this.height * 0.05, "bold", this.labelColor)
        this.context.translate(-this.width * 0.5, -this.height*1.05)

        this.context.translate(-this.positionX, -this.positionY)
    }
}