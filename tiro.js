function Tiro (context, nave) {
    this.context = context
    this.nave = nave

    // posiciona o tiro no bico da nave
    this.largura = 4
    this.altura = 20
    this.x = nave.x + nave.imagem.width / 2 - this.largura / 2
    this.y = nave.y - this.altura
    this.velocidade = 10

    this.cor = "red"
}

Tiro.prototype.atualizar = function () {
    this.y -= this.velocidade
}

Tiro.prototype.desenhar = function () {
    this.context.save()
    this.context.fillStyle = this.cor
    this.context.fillRect(this.x, this.y, this.largura, this.altura)
    this.context.restore()
}