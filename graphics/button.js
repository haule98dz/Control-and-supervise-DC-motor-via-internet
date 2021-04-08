//maybe I'm not gonna use this button class
class Button {
    constructor(context, positionX = 600, positionY = 400, width = 60, height = 30, text = "", textColor = "black", backColor = "green", hoverColor = "green", border = true, borderColor = "black", textSize = 0.6, textFont = "arial", textFormat = "") {
        this.context = context
        this.positionX = positionX
        this.positionY = positionY
        this.height = height
        this.width = width
        this.text = text
        this.textColor = textColor
        this.backColor = backColor
        this.hoverColor = hoverColor
        this.border = border
        this.borderColor = borderColor
        this.textSize = height * textSize
        this.textFont = textFont
        this.textFormat = textFormat
        this.halfWidth = width / 2
        this.halfHeight = height / 2
    }

    draw() {
        this.context.translate(this.positionX, this.positionY)
        this.drawButton()
        this.drawText()
        this.context.translate(-this.positionX, -this.positionY)
    }

    drawButton() {
        if (this.hovering()) {
            this.context.fillStyle = this.hoverColor
            document.body.style.cursor = 'pointer'
        }
        
        else {
            this.context.fillStyle = this.backColor
            document.body.style.cursor = 'default'
        }

        this.context.fillRect(-this.halfWidth, -this.halfHeight, this.width, this.height)
        if (this.border) {
            this.context.beginPath()
            this.context.strokeStyle = this.borderColor
            this.context.strokeRect(-this.halfWidth, -this.halfHeight, this.width, this.height)
        }
    }

    drawText() {
        this.context.fillStyle = this.textColor
        this.context.font = this.textFormat + this.textSize + "px " + this.textFont
        this.context.fillText(this.text, 0, 0)
    }

    hovering() {
        var x = mousePosition.x - this.positionX
        var y = mousePosition.y - this.positionY
        return ((x >= -this.halfWidth) && (x <= this.halfWidth) && (y >= -this.halfHeight) && (y <= this.halfHeight))
    }
}
