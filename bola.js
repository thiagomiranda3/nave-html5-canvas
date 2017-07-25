function Bola (ctx) {
    this.ctx = ctx
    this.x = 0
    this.y = 0
    this.velocidadeX = 0
    this.velocidadeY = 0

    this.cor = 'black'
    this.raio = 10
}

Bola.prototype.atualizar = function () {
    let ctx = this.ctx

    if(this.x < this.raio || this.x > ctx.canvas.width - this.raio)
        this.velocidadeX *= -1

    if(this.y < this.raio || this.y > ctx.canvas.height - this.raio)
        this.velocidadeY *= -1

    this.x += this.velocidadeX
    this.y += this.velocidadeY
}

Bola.prototype.desenhar = function () {
    let ctx = this.ctx

    // guarda as configurações padrões do contexto
    ctx.save()

    // configura o contexto de acordo com a Bola
    ctx.fillStyle = this.cor

    ctx.beginPath()
    ctx.arc(this.x, this.y, this.raio, 0, 2 * Math.PI, false)
    ctx.fill()

    // volta às configurações padrões
    ctx.restore()
}