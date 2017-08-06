function Tiro (context, nave) {
    this.context = context
    this.nave = nave

    // posiciona o tiro no bico da nave
    this.largura = 3
    this.altura = 20
    this.x = nave.x + 16
    this.y = nave.y - this.altura
    this.velocidade = 700

    this.cor = "yellow"

    // objetos ganham referências na classes Animacao e Colisor
    this.animacao = null
    this.colisor = null
}

Tiro.prototype.atualizar = function () {
    this.y -= this.velocidade * this.animacao.decorrido / 1000;

    // excluir o tiro quando sumir da tela
    if(this.y < -this.altura) {
        this.animacao.excluirSprite(this)
        this.colisor.excluirSprite(this)
    }
}

Tiro.prototype.desenhar = function () {
    this.context.save()
    this.context.fillStyle = this.cor
    this.context.fillRect(this.x, this.y, this.largura, this.altura)
    this.context.restore()
}

Tiro.prototype.retangulosColisao = function () {
    return [
        {
            x: this.x,
            y: this.y,
            largura: this.largura,
            altura: this.altura
        }
    ]
}

Tiro.prototype.colidiuCom = function (outro) {

}