class SpeedMeter {
    constructor(context, positionX = 200, positionY = 200, radius = 150, maxValue = 1600, stepIndex = 200, indexAngle = 4 * Math.PI / 3 ) {
        this.ctx = context;
        this.positionX = positionX;
        this.positionY = positionY;
        this.radius = radius;
        this.indexAngle = indexAngle;
        this.indexRadius = this.radius * 0.825;
        this.maxValue = maxValue;
        this.stepIndex = stepIndex;
        this.stepAngle = this.indexAngle / this.maxValue;
        this.value = 0;
        this.label = "Tốc độ động cơ"
        this.labelColor = "white"
    }

    draw() {
        this.indexRadius = this.radius * 0.825;
        this.stepAngle = this.indexAngle / this.maxValue;
        this.ctx.translate(this.positionX, this.positionY);

        this.drawFace(this.ctx);
        this.drawNumbers(this.ctx, this.indexRadius * 0.78);
        this.drawHand(this.ctx, this.indexRadius * 0.9);

        drawText(this.ctx, this.label, 0, this.radius *1.2, this.radius *0.2, "bold", this.labelColor)
        this.ctx.translate(-this.positionX, -this.positionY);
    }

    drawFace(ctx) {
        //thick circle border
        var grad = ctx.createLinearGradient(-this.radius, -this.radius, this.radius, this.radius)
        grad.addColorStop(0, "#FFFFFF")
        grad.addColorStop(0.5, "#999999")
        grad.addColorStop(0.7, "#888888")
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = grad;
        ctx.fill();

        //thin circle border
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.stroke();

        //background
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(0, 0, this.radius * 0.93, 0, 2 * Math.PI);
        ctx.fill();

        //the scale
        var indexExtendAngle = 0.02;
        ctx.beginPath();
        ctx.arc(0, 0, this.indexRadius, - this.indexAngle / 2 - Math.PI / 2 - indexExtendAngle, this.indexAngle / 2 - Math.PI / 2 + indexExtendAngle);
        ctx.lineWidth = this.radius / 25;
        ctx.strokeStyle = "white";
        ctx.stroke();

        //unit
        ctx.font = "italic bold " + this.radius * 0.1 + "px arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "#cca351";
        ctx.fillText("Vòng/phút", 0, -this.radius * 0.25);

        // draw digital displayer
        ctx.translate(0, this.radius * 0.4);
        var rectHeight = this.radius * 0.2;
        var rectWeight = this.radius * 0.5;
        ctx.fillStyle = "#A5AE99";
        ctx.fillRect(-rectWeight / 2, -rectHeight / 2, rectWeight, rectHeight);
        ctx.font = this.radius * 0.15 + "px arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "right";
        ctx.fillStyle = "black";
        ctx.fillText(this.value, 0.9 * rectWeight / 2, 0);
        ctx.translate(0, - this.radius * 0.4);

        // HUMG copyright (^_^)
        const meterTitleSize = this.radius * 0.07;
        ctx.font = meterTitleSize + "px arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "#C4C4C8";
        const meterTitle = "HUMG-NCKH";
        const meterTitleStepAngle = meterTitleSize * 0.008;
        var idx;
        for (idx = 0; idx < meterTitle.length; idx++) {
            var ang = (meterTitle.length - idx - 1) * meterTitleStepAngle - meterTitleStepAngle * (meterTitle.length - 1) / 2;
            ctx.rotate(ang);
            ctx.fillText(meterTitle.charAt(idx), 0, 0.84 * this.radius);
            ctx.rotate(-ang);
        }
    }

    drawNumbers(ctx, radius) {
        //color and font of numbers
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";
        var ang;
        var num;
        ctx.font = radius * 0.15 + "px arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        //draw tick marks
        var isMajorTick = true;
        for (num = 0; num <= this.maxValue; num += this.stepIndex / 2) {
            ang = num * this.stepAngle - this.indexAngle / 2;
            ctx.beginPath();
            ctx.rotate(ang);
            ctx.translate(0, - radius);
            ctx.moveTo(0, - this.indexRadius + radius);
            if (isMajorTick) {
                ctx.lineWidth = this.radius / 40;
                ctx.lineTo(0, - this.indexRadius + radius + this.radius * 0.05)
            } else {
                ctx.lineWidth = this.radius / 80;
                ctx.lineTo(0, - this.indexRadius + radius + this.radius * 0.05);
            }

            ctx.moveTo(0, - this.indexRadius + radius)
            ctx.lineTo(0, - this.indexRadius + radius + this.radius * 0.05)
            ctx.stroke();
            //draw numbers at major tick marks
            if (isMajorTick) {
                ctx.rotate(-ang);
                ctx.fillText(num.toString(), 0, 0);
                ctx.rotate(ang);
            }
            isMajorTick = !isMajorTick;

            ctx.translate(0, radius);
            ctx.rotate(-ang);
        }
    }

    //draw the pointer
    drawHand(ctx, radius) {
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.lineWidth = this.radius / 85;
        var ang = this.stepAngle * this.value - this.indexAngle / 2 - Math.PI;
        ctx.rotate(ang);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, radius);
        ctx.stroke();
        ctx.rotate(-ang);
        var smallRadius = radius * 0.10;
        var grd = ctx.createLinearGradient(-smallRadius * 1.5, -smallRadius * 1.5, smallRadius, smallRadius);
        grd.addColorStop(0, "white");
        grd.addColorStop(1, "#707070");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.15, 0, 2 * Math.PI);
        ctx.fill();
    }
}