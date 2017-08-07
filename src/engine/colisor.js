function Colisor () {
    this.sprites = []
    this.spritesExcluir = []
    this.aoColidir = null
}

Colisor.prototype.novoSprite = function (sprite) {
    this.sprites.push(sprite)
    sprite.colisor = this
}

Colisor.prototype.excluirSprite = function (sprite) {
    this.spritesExcluir.push(sprite)
}

Colisor.prototype.processar = function () {
    let jaTestados = []

    for(let i in this.sprites) {
        for(let j in this.sprites) {
            // não colidir um sprite com ele mesmo
            if(i === j) continue

            let id1 = this.stringUnica(this.sprites[i])
            let id2 = this.stringUnica(this.sprites[j])

            if(!jaTestados[id1]) jaTestados[id1] = []
            if(!jaTestados[id2]) jaTestados[id2] = []

            if(!(jaTestados[id1].indexOf(id2) >= 0 || jaTestados[id2].indexOf(id1) >= 0)) {
                this.testarColisao(this.sprites[i], this.sprites[j])
                jaTestados[id1].push(id2)
                jaTestados[id2].push(id1)
            }
        }
    }

    this.processarExclusoes()
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

                !!this.aoColidir && this.aoColidir(sprite1, sprite2)
                
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

Colisor.prototype.stringUnica = function (sprite) {
    let retangulos = sprite.retangulosColisao()

    return retangulos.reduce((a, b) => {
        return a + `x: ${b.x}, y: ${b.y}, l: ${b.largura}, a: ${b.altura}\n`
    }, "")
}

Colisor.prototype.processarExclusoes = function () {
    let novoArray = []

    this.sprites.forEach((sprite) => {
        if(this.spritesExcluir.indexOf(sprite) == -1)
            novoArray.push(sprite)
    })

    this.spritesExcluir = []

    this.sprites = novoArray
}