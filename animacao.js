function Animacao (ctx) {
    this.ctx = ctx
    this.sprites = []
    this.ligado = false
}

Animacao.prototype.novoSprite = function (sprite) {
    sprite.animacao = this
    this.sprites.push(sprite)
}

Animacao.prototype.ligar = function () {
    this.ligado = true
    this.proximoFrame()
}

Animacao.prototype.desligar = function () {
    this.ligado = false
}

Animacao.prototype.proximoFrame = function () {
    if(!this.ligado)
        return

    this.limparTela()
    
    // Atualiz e desenha os sprites
    this.sprites.forEach((sprite) => sprite.atualizar())
    this.sprites.forEach((sprite) => sprite.desenhar())

    var animacao = this
    requestAnimationFrame(() => animacao.proximoFrame())
}

Animacao.prototype.limparTela = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
}