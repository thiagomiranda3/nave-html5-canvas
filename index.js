let canvas = document.getElementById("meu_canvas")
let context = canvas.getContext("2d")

const musicaAcao = new Audio()

let engine = {},
    sprites = {},
    criadorInimigos = {},
    imagens = {},
    imgCarregadas = 0
    totalImagens = 0

carregarImagens()
carregarMusicas()

function carregarImagens() {
    imagens = {
        espaco: "fundo-espaco.png",
        estrelas: "fundo-estrelas.png",
        nuvens: "fundo-nuvens.png",
        nave: "nave-spritesheet.png",
        ovni: "ovni.png",
        explosao: "explosao.png"
    }

    for(i in imagens) {
        var img = new Image()
        img.src = "img/" + imagens[i]
        img.onload = carregando
        totalImagens++
        imagens[i] = img
    }
}

function carregarMusicas() {
    musicaAcao.src = "snd/musica-acao.mp3"
    musicaAcao.load()
    musicaAcao.volume = 0.8
    musicaAcao.loop = true
}

function carregando() {
    imgCarregadas++
    context.save()
    context.drawImage(imagens.espaco, 0, 0, canvas.width, canvas.height)

    // Texto "Carregando"
    context.fillStyle = 'white'
    context.strokeStyle = 'black'
    context.font = '50px sans-serif'
    context.fillText("Carregando...", 100, 200)
    context.strokeText("Carregando...", 100, 200)

    const tamanhoTotal = 300
    const tamanho = imgCarregadas / totalImagens * tamanhoTotal
    context.fillStyle = 'yellow'
    context.fillRect(100, 250, tamanho, 50)

    context.restore()

    if(imgCarregadas == totalImagens) {
        iniciarObjetos()
        mostrarLinkJogar()
    }
}

function mostrarLinkJogar() {
    document.getElementById("link_jogar").style.display = "block"
}

function iniciarJogo() {
    document.getElementById("link_jogar").style.display = "none"
    configuracoesIniciais()
    musicaAcao.play()
    engine.animacao.ligar()
}

function iniciarObjetos() {
    engine.teclado = new Teclado(document)
    engine.animacao = new Animacao(context)
    engine.colisor = new Colisor()
    
    sprites.espaco = new Fundo(context, imagens.espaco)
    sprites.estrelas = new Fundo(context, imagens.estrelas)
    sprites.nuvens = new Fundo(context, imagens.nuvens)
    sprites.nave = new Nave(context, engine.teclado, imagens.nave, imagens.explosao)
    sprites.painel = new Painel(context, sprites.nave)

    engine.animacao.novoSprite(sprites.espaco)
    engine.animacao.novoSprite(sprites.estrelas)
    engine.animacao.novoSprite(sprites.nuvens)
    engine.animacao.novoSprite(sprites.nave)
    engine.animacao.novoSprite(sprites.painel)

    engine.colisor.novoSprite(sprites.nave)
    engine.animacao.novoProcessamento(engine.colisor)
}

function configuracoesIniciais() {
    sprites.espaco.velocidade = 10
    sprites.estrelas.velocidade = 5
    sprites.nuvens.velocidade = 40

    sprites.nave.posicionar()
    sprites.nave.velocidade = 350

    sprites.nave.acabaramVidas = function () {
        animacao.desligar()
        alert("GAME OVER")
    }

    ativarTiro(true)

    engine.teclado.disparou(ENTER, function() {
        if(engine.animacao.ligado) {
            criadorInimigos.ultimoOvni = new Date().getTime()
            engine.animacao.desligar()
            ativarTiro(false)
            musicaAcao.pause()

            // escrever pausado
            context.save()
            context.fillStyle = 'white'
            context.strokeStyle = 'black'
            context.font = '50px sans-serif'
            context.fillText('Pausado', 160, 200)
            context.strokeText('Pausado', 160, 200)
            context.restore()
        } else {
            engine.animacao.ligar()
            ativarTiro(true)
            musicaAcao.play()
        }
    })

    criacaoInimigos()
}

function ativarTiro(ativar) {
    if(ativar)
        engine.teclado.disparou(ESPACO, function() {
            sprites.nave.atirar()
        })
    else
        engine.teclado.disparou(ESPACO, null)
}

function criacaoInimigos() {
    criadorInimigos = {
        ultimoOvni: new Date().getTime(),
        processar: function () {
            const agora = new Date().getTime()
            const decorrido = agora - this.ultimoOvni

            if(decorrido > 1000) {
                novoOvni()
                this.ultimoOvni = agora
            }
        }
    }

    engine.animacao.novoProcessamento(criadorInimigos)
}

function novoOvni() {
    let ovni = new Ovni(context, imagens.ovni, imagens.explosao)

    ovni.velocidade = Math.floor(150 + Math.random() * (600 - 150 + 1))
    ovni.x = Math.floor(Math.random() * (canvas.width - imagens.ovni.width + 1))
    ovni.y = -imagens.ovni.height

    engine.animacao.novoSprite(ovni)
    engine.colisor.novoSprite(ovni)
}