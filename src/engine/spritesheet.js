function Spritesheet(context, imagem, linhas, colunas) {
    this.ctx = context
    this.imagem = imagem
    this.numLinhas = linhas
    this.numColunas = colunas
    this.intervalo = 0
    this.linha = 0
    this.coluna = 0
    this.ultimoTempo = new Date().getTime()
    this.fimDoCiclo = null
}

Spritesheet.prototype.proximoQuadro = function () {
    let agora = new Date().getTime()

    // verifica se já pode mudar o quadro de acordo com intervalo definido
    if(agora - this.ultimoTempo < this.intervalo) return

    if(this.coluna < this.numColunas - 1)
        this.coluna++
    else {
        this.coluna = 0
        if(this.fimDoCiclo) this.fimDoCiclo()
    }

    this.ultimoTempo = agora
}

Spritesheet.prototype.desenhar = function (xDestino, yDestino) {
    let tamanhoX = this.imagem.width / this.numColunas
    let tamanhoY = this.imagem.height / this.numLinhas
    let xOrigem = tamanhoX * this.coluna
    let yOrigem = tamanhoY * this.linha

    this.ctx.drawImage(this.imagem,
        xOrigem,
        yOrigem,
        tamanhoX,
        tamanhoY,
        xDestino,
        yDestino,
        tamanhoX,
        tamanhoY
    )
}