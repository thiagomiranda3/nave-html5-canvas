const SETA_ESQUERDA = 37
const SETA_DIREITA = 39
const ESPACO = 32

function Teclado(elemento) {
    this.elemento = elemento

    // Array com as teclas pressionadas
    this.pressionadas = []

    // Array de teclas disparadas
    this.disparadas = []

    // Funções de disparo
    this.funcoesDisparo = []

    var teclado = this

    elemento.addEventListener('keydown', function(evento) {
        let tecla = evento.keyCode
        teclado.pressionadas[tecla] = true

        // disparar somente se for o primeiro keydown da tecla
        if(teclado.funcoesDisparo[tecla] && !teclado.disparadas[tecla]) {
            teclado.disparadas[tecla] = true
            teclado.funcoesDisparo[tecla]()
        }
    })

    elemento.addEventListener('keyup', function(evento) {
        let tecla = evento.keyCode
        teclado.pressionadas[tecla] = false
        teclado.disparadas[tecla] = false
    })
}

Teclado.prototype.pressionada = function (tecla) {
    return this.pressionadas[tecla]
}

Teclado.prototype.disparou = function (tecla, callback) {
    this.funcoesDisparo[tecla] = callback
}