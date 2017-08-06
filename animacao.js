function Animacao (ctx) {
    this.ctx = ctx
    this.sprites = []
    this.spritesExcluir = []
    this.processamentosExcluir = []
    this.ligado = false
    this.processamentos = []
}

Animacao.prototype.novoProcessamento = function (processamento) {
    this.processamentos.push(processamento)
    processamento.animacao = this
}

Animacao.prototype.excluirProcessamento = function (processamento) {
    this.processamentosExcluir.push(processamento)
}

Animacao.prototype.novoSprite = function (sprite) {
    sprite.animacao = this
    this.sprites.push(sprite)
}

Animacao.prototype.excluirSprite = function (sprite) {
    this.spritesExcluir.push(sprite)
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
    
    // Atualiza e desenha os sprites
    this.sprites.forEach((sprite) => sprite.atualizar())
    this.sprites.forEach((sprite) => sprite.desenhar())

    // faz os processamentos necessários
    this.processamentos.forEach((processamento) => processamento.processar())

    this.processarExclusoes()

    var animacao = this
    requestAnimationFrame(() => animacao.proximoFrame())
}

Animacao.prototype.limparTela = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
}

Animacao.prototype.processarExclusoes = function () {
    let novosSprites = []
    let novosProcessamentos = []

    this.sprites.forEach((sprite) => {
        if(this.spritesExcluir.indexOf(sprite) == -1)
            novosSprites.push(sprite)
    })

    this.processamentos.forEach((processamento) => {
        if(this.processamentosExcluir.indexOf(processamento) == -1)
            novosProcessamentos.push(processamento)
    })

    this.spritesExcluir = []
    this.processamentosExcluir = []

    this.sprites = novosSprites
    this.processamentos = novosProcessamentos
}