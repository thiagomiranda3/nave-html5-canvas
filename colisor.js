function Colisor () {
    this.sprites = []
}

Colisor.prototype.novoSprite = function (sprite) {
    this.sprites.push(sprite)
}

Colisor.prototype.processar = function () {
    for(let i in this.sprites) {
        for(let j in this.sprites) {
            // não colidir um sprite com ele mesmo
            if(i === j) continue
            
            this.testarColisao(this.sprites[i], this.sprites[j])
        }
    }
}

Colisor.prototype.testarColisao = function(sprite1, sprite2) {
    // obtém os retângulos de colisão de cada sprite
    let rets1 = sprite1.retangulosColisao()
    let rets2 = sprite2.retangulosColisao()

    // testa a colisão entre eles
    for(let i in rets1) {
        for(let j in rets2) {
            if(this.retangulosColidem(rets1[i], rets2[j])) {
                // se colidirem, notificamos os sprites
                sprite1.colidiuCom(sprite2)
                sprite2.colidiuCom(sprite1)
                
                return
            }
        }
    }
}

Colisor.prototype.retangulosColidem = function (ret1, ret2) {
    // fórmula que calcula a intersecção de retângulos
    return (ret1.x + ret1.largura) > ret2.x &&
           ret1.x < (ret2.x + ret2.largura) &&
           (ret1.y + ret1.altura) > ret2.y &&
           ret1.y < (ret2.y + ret2.altura)
}