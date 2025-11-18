// VARIÁVEIS GLOBAIS
var acertos = 0; 
var perdidos = 0; 
var errados = 0; 
var intervalo = 5000; 
var janela = 2000; 
var timer = null;

window.onload = function () {
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('idGramado').addEventListener('mousedown', marteloBaixo);
    document.getElementById('idGramado').addEventListener('mouseup', marteloCima);
    document.getElementById('buraco0').addEventListener('click', martelada);
    document.getElementById('buraco1').addEventListener('click', martelada);
    document.getElementById('buraco2').addEventListener('click', martelada);
    document.getElementById('buraco3').addEventListener('click', martelada);
    document.getElementById('buraco4').addEventListener('click', martelada);
};

function start () {
    var botao = document.getElementById('start');
    botao.removeEventListener('click', start);
    botao.disabled = true;
    sobeToupeira();
}

function sobeToupeira() {
    var buraco = Math.floor(Math.random() * 5);
    var objBuraco = document.getElementById('buraco' + buraco);
    objBuraco.src = 'img/hole-mole.png';
    timer = setTimeout(tiraToupeira, janela, buraco);
    setTimeout(sobeToupeira, intervalo);
}

function tiraToupeira(buraco) {
    var objBuraco = document.getElementById('buraco' + buraco);
    objBuraco.src = 'img/hole.png';
    perdidos++;
    mostraPontuacao();
}

function mostraPontuacao() {
    mostraPontuacaoDe('acertos', acertos);
    mostraPontuacaoDe('perdidos', perdidos);
    mostraPontuacaoDe('errados', errados);
    mostraPontuacaoDe('saldo', Math.max(acertos - perdidos - errados, 0));
}

function mostraPontuacaoDe(display, valor) {
    var objCentena = document.getElementById(display).firstChild;
    var objDezena = objCentena.nextSibling;
    var objUnidade = objDezena.nextSibling;

    var centena = parseInt(valor / 100);
    var dezena = parseInt((valor / 10) % 10);
    var unidade = valor % 10;

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
        acertos++;
        evento.target.src = 'img/hole.png';
        clearTimeout(timer);
    } else {
        errados++;
    }
    mostraPontuacao();
}

