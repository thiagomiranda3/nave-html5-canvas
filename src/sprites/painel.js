function Painel(context, nave) {
    this.context = context;
    this.nave = nave;
    this.spritesheet = new Spritesheet(context, nave.imagem, 3, 2)
    this.spritesheet.linha = 0
    this.spritesheet.coluna = 0
    this.pontuacao = 0
}
Painel.prototype.atualizar = function () {

}

Painel.prototype.desenhar = function () {
    let x = 20,
        y = 20

    // diminui pela metade o tamanho das próximas plotagens
    this.context.scale(0.5, 0.5)

    for(let i = 0; i < this.nave.vidasExtras; i++) {
        this.spritesheet.desenhar(x, y)
        x += 40
    }

    // volta ao normal
    this.context.scale(2, 2)

    // Pontuação
    this.context.save();
    this.context.fillStyle = 'white';
    this.context.font = '18px sans-serif';
    this.context.fillText(this.pontuacao, 100, 27);
    this.context.restore();
}