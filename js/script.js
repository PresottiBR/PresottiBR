// VARIÁVEIS GLOBAIS
var acertos = 0; 
var perdidos = 0; 
var errados = 0; 
var intervalo = 5000; 
var janela = 2000; 


<button onclick="minhafunção()">Clique Aqui</button>
document.getElementById("idyButton").addEventListener("click", minhafunção);
document.getElementById("idButton").onclick = function() {
        alert("O botão foi clicado!");
};
var botao = document.getElementById("idButton");
botao.addEventListener("click", trataCick) 
{
    alert("O botão foi clicado!");
}
document.getElementById("idButton").addEventListener("click", trataCick) 
window.onload = function() {
    document.getElementById('idGramado').addEventListener('mousedown', marteloBaixo);
}
onload = function () {
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('idGramado').addEventListener('mousedown', marteloBaixo);
    document.getElementById('idGramado').addEventListener('mouseup', marteloCima);
    document.getElementById('buraco0').addEventListener('click', martelada);
    document.getElementById('buraco1').addEventListener('click', martelada);
    document.getElementById('buraco2').addEventListener('click', martelada);
    document.getElementById('buraco3').addEventListener('click', martelada);
    document.getElementById('buraco4').addEventListener('click', martelada);
} 
  
function start () {
    var botao = document.getElementById('start');

    botao.removeEventListener('click', start); // remover o evento do botão Start para que o usuário não possa inicializar o jogo várias vezes;
    botao.disabled = true;
    sobeToupeira();
}

function sobeToupeira() {
    var buraco = Math.floor(Math.random() * 5); // floor arredonda o numero escolhido no intervalo para baixo
    var objBuraco = document.getElementById('buraco' + buraco); // ele concatena o numero aleatorio obtido com a palavra buraco, formando o id dos buracos (buraco0, buraco1, buraco2, buraco3, buraco4). Armazena a referência desse elemento na variável objBuraco
    objBuraco.src = 'img/hole-mole.png'; // altera o atributo src da imagem (tag img) pela imagem com a toupeira (hole-mole.png)
    timer = setTimeout(tiraToupeira, janela, buraco);
    setTimeout(sobeToupeira, intervalo);
}


function tiraToupeira(buraco) {
    const objBuraco = document.getElementById('buraco' + buraco);
    objBuraco.src='img/hole.png';
    perdidos++; // perdidos = perdidos +1
    mostraPontuacao();
}


function mostraPontuacao() {
    mostraPontuacaoDe('acertos', acertos);
    mostraPontuacaoDe('perdidos', perdidos);
    mostraPontuacaoDe('errados', errados);
    mostraPontuacaoDe('saldo', Math.max(acertos - perdidos - errados, 0));
}

function mostraPontuacaoDe(display, valor) {
    // pega as imagens
    let objCentena = document.getElementById(display).firstChild;
    let objDezena = objCentena.nextSibling;
    let objUnidade = objDezena.nextSibling;

    // calcula o valor de cada algarismo
    let centena = parseInt(valor / 100);
    let dezena = parseInt((valor / 10) % 10);
    let unidade = valor % 10;

    // muda a img e o valor do atributo para o leitor de tela
    objCentena.src = 'img/caractere_' + centena + '.gif';
    objCentena.alt = centena;
    objDezena.src = 'img/caractere_' + dezena + '.gif';
    objDezena.alt = dezena;
    objUnidade.src = 'img/caractere_' + unidade + '.gif';
    objUnidade.alt = unidade; 
}

function marteloBaixo() {
    document.getElementById('idGramado').style.cursor = 'url(img/hammerDown.png), default';
}

function marteloCima() {
    document.getElementById('idGramado').style.cursor = 'url(img/hammer.png), default';
}

function martelada(evento) {
    if (evento.target.src.includes('hole-mole')) {
        // acertou
        acertos ++;
        evento.target.src = 'img/hole.png';
        clearTimeout(timer);
    }
    else {
        errados ++;
    }
    mostraPontuacao();
}
