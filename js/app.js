

const BouncingApp = {
    version: 1.0,
    author: 'Germán',
    description: 'App para realizar movimientos controlados de rebote gravitatorio con HTML5 Canvas',
    canvasDom: undefined,
    ctx: undefined,
    ball: undefined,
    canvasSizes: {
        w: undefined,
        h: undefined
    },
    init: function (id, imageUrl) {
        this.canvasDom = document.getElementById(id)
        this.ctx = this.canvasDom.getContext('2d')
        this.canvasSizes.w = window.innerWidth
        this.canvasSizes.h = window.innerHeight
        this.setDimensions()
        this.setHandlers()
        this.drawBouncingBall(imageUrl)
        this.setEventListeners()
    },
    setDimensions: function () {
        this.canvasDom.setAttribute('width', this.canvasSizes.w)
        this.canvasDom.setAttribute('height', this.canvasSizes.h)
    },
    setHandlers: function () {
        window.onresize = () => this.setDimensions()
    },
    setEventListeners: function () {
        const buttons = document.getElementsByTagName('button')
        buttons[0].onclick = () => this.ball.speedUp()
        buttons[1].onclick = () => this.ball.speedDown()
        buttons[2].onclick = () => this.ball.bounceNow()
        buttons[3].onclick = () => this.ball.addGravity()
    },
    drawBouncingBall: function (imageUrl) {
        this.ball = new Ball(this.ctx, imageUrl, this.canvasSizes)

        setInterval(() => {
            this.clear()
            this.ball.draw()
        }, 30)
    },
    clear: function () {
        this.ctx.clearRect(0, 0, this.canvasSizes.w, this.canvasSizes.h)
    }

}



class Ball {

    constructor(ctx, url, sizes) {
        this.img = new Image()
        this.img.src = url
        this.ctx = ctx

        this.canvasSizes = {
            w: sizes.w,
            h: sizes.h
        }

        this.posX = 0
        this.posY = 0

        this.velX = 5
        this.velY = 1

        this.gravity = .05
    }

    draw() {
        this.posX += this.velX
        this.posY += this.velY
        this.velY += this.gravity

        if (this.posY <= 0 || this.posY > this.canvasSizes.h - 100) this.changeY()
        if (this.posX <= 0 || this.posX > this.canvasSizes.w - 100) this.changeX()

        this.ctx.drawImage(this.img, this.posX, this.posY, 100, 100)
    }

    changeY() {
        this.velY *= -1
    }

    changeX() {
        this.velX *= -1
    }

    speedUp() {
        this.velX *= 1.1
        this.velY *= 1.1
    }

    speedDown() {
        this.velX *= .9
        this.velY *= .9
    }

    bounceNow() {
        this.changeX()
        this.changeY()
    }

    addGravity() {
        this.gravity *= 1.1
    }

}