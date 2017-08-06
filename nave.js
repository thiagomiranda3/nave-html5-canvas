function Nave(context, teclado, imagem) {
    this.context = context
    this.teclado = teclado
    this.imagem = imagem
    this.x = 0
    this.y = 0
    this.velocidade = 0

    // objetos ganham referências na classes Animacao e Colisor
    this.animacao = null
    this.colisor = null
}

Nave.prototype.atualizar = function () {
    if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0)
        this.x -= this.velocidade * this.animacao.decorrido / 1000;

    if(this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - this.imagem.width)
        this.x += this.velocidade * this.animacao.decorrido / 1000;

    if(this.teclado.pressionada(SETA_ACIMA) && this.y > 0)
        this.y -= this.velocidade * this.animacao.decorrido / 1000;

    if(this.teclado.pressionada(SETA_ABAIXO) && this.y < this.context.canvas.height - this.imagem.height)
        this.y += this.velocidade * this.animacao.decorrido / 1000;
}

Nave.prototype.desenhar = function () {
    this.context.drawImage(this.imagem, this.x, this.y, this.imagem.width, this.imagem.height)
}

Nave.prototype.atirar = function () {
    let t = new Tiro(this.context, this)
    this.animacao.novoSprite(t)
    this.colisor.novoSprite(t)
}

Nave.prototype.retangulosColisao = function () {
    return [
        {
            x: this.x + 2,
            y: this.y + 19,
            largura: 9,
            altura: 13
        },
        {
            x: this.x + 13,
            y: this.y + 3,
            largura: 10,
            altura: 33
        },
        {
            x: this.x + 25,
            y: this.y + 19,
            largura: 9,
            altura: 13
        }
    ]
}

Nave.prototype.colidiuCom = function (outro) {
    if(outro instanceof Ovni) {
        this.animacao.desligar()
        alert("Game Over!")
    }
}