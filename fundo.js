function Fundo(context, imagem) {
    this.context = context
    this.imagem = imagem
    this.velocidade = 0
    this.posicaoEmenda = 0
}

Fundo.prototype.atualizar = function () {
    // atualiza a posição da emenda
    this.posicaoEmenda += this.velocidade

    // emenda passou do fim da tela
    if(this.posicaoEmenda > this.imagem.height)
        this.posicaoEmenda = 0
}

Fundo.prototype.desenhar = function () {
    let img = this.imagem

    // primeira cópia
    let posicaoY = this.posicaoEmenda - img.height
    this.context.drawImage(img, 0, posicaoY, img.width, img.height)

    //segunda cópia
    posicaoY = this.posicaoEmenda
    this.context.drawImage(img, 0, posicaoY, img.width, img.height)
}