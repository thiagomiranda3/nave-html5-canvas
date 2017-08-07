function Explosao(context, imagem, x, y) {
    let explosao = this
    this.context = context
    this.imagem = imagem
    this.spritesheet = new Spritesheet(context, imagem, 1, 5)
    this.spritesheet.intervalo = 75
    this.spritesheet.fimDoCiclo = function () {
        explosao.animacao.excluirSprite(explosao)
        if(explosao.fimDaExplosao) explosao.fimDaExplosao()
    }
    this.x = x
    this.y = y
}

Explosao.prototype.atualizar = function () {

}

Explosao.prototype.desenhar = function () {
    this.spritesheet.desenhar(this.x, this.y)
    this.spritesheet.proximoQuadro()
}