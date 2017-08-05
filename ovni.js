function Ovni (context, imagem) {
    this.context = context
    this.imagem = imagem
    this.x = 0
    this.y = 0
    this.velocidade = 0
}

Ovni.prototype.atualizar = function () {
    this.y += this.velocidade
}

Ovni.prototype.desenhar = function () {
    this.context.drawImage(this.imagem, this.x, this.y, this.imagem.width, this.imagem.height)
}