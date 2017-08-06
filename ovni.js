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

Ovni.prototype.retangulosColisao = function () {
    return [
        {
            x: this.x + 20,
            y: this.y + 1,
            largura: 25,
            altura: 10
        },
        {
            x: this.x + 2,
            y: this.y + 11,
            largura: 60,
            altura: 12
        },
        {
            x: this.x + 20,
            y: this.y + 23,
            largura: 25,
            altura: 7
        }
    ]
}

Ovni.prototype.colidiuCom = function (outro) {
    
}