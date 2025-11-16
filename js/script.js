// VARIAVEIS GLOBAIS
// armazenam valores para serem usados por todo o programa
// e compartilhados por varias funcoes

let acertos = 0; // quantidade de acertos do jogador
let perdidos = 0; // quantidade de toupeiras que o jogador deixou passar
let errados = 0; // quantidade de marteladas dadas fora das toupeiras
let intervalo = 5000; // Intervalo entre o aparecimento das toupeiras (valor inicial igual a 5000, indicando um intervalo de 5000 milissegundos, ou seja, 5 segundos entre os aparecimentos das toupeiras).
let janela = 2000; // Janela de tempo que o jogador tem para acertar na toupeira (valor inicial de 2000, indicando 2000 milissegundos, ou 2 segundos, que será o tempo que a toupeira ficará fora do buraco).
let timer = null // timer que controla o tempo que a toupeira fica fora do buraco


// EVENTOS
/* 

load (onload): o evento load, associado ao atributo onload, acontece quando um elemento HTML termina de ser carregado pelo navegador. Será usado o evento load na página para iniciar o script. Essa é uma boa prática, pois evita que o programa comece antes de todos os elementos HTML serem carregados. Se o script tentar acessar algum elemento HTML que ainda não está disponível, vai disparar uma exceção (erro).
click (onclick): o evento click, associado ao atributo onclick, acontece quando o usuário clica com o botão esquerdo do mouse em um elemento HTML. Esse evento será usado em duas situações distintas: (1) associado ao botão Start, para começar o jogo quando o usuário clicar no botão; e (2) associado a cada um dos cinco buracos do gramado, para realizar a contabilidade do jogo.
mousedown (onmousedown): o evento mousedown, associado ao atributo onmousedown, acontece quando o usuário mantém pressionado o botão esquerdo do mouse. Sempre que o cursor do mouse estiver sobre o gramado e o usuário apertar o botão esquerdo, mantendo-o pressionado, o cursor será alterado para um martelo abaixado, simbolizando uma martelada.
mouseup (onmouseup): o evento mouseup, associado ao atributo onmouseup, acontece quando o usuário solta o botão esquerdo do mouse, depois de tê-lo pressionado. Quando o cursor do mouse estiver sobre o gramado e o usuário liberar o botão esquerdo, devemos trocar o cursor para um martelo levantado, indicando que o usuário levantou o martelo.

*/

// Associar eventos a elementos HTML

/*
Uma maneira mais moderna de associar eventos é usar o método addEventListener. Esse método permite adicionar um listener a um elemento HTML de forma mais flexível.

Por exemplo, pode-se usar o JavaScript para adicionar um evento click a um botão identificado por idButton

De forma mais compacta, pode-se também criar uma função anônima ao associar o evento

*/

/*
Para adicionar um listener a um elemento HTML, deve-se trazer o elemento HTML para o mundo JavaScript. O objeto document representa o documento HTML com todos os seus elementos. Esse objeto tem o método getElementById, que, como o nome sugere, pega um elemento HTML pela sua identificação.

*/

onload = function () {
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('idGramado').addEventListener('mousedown', marteloBaixo);
    document.getElementById('idGramado').addEventListener('mouseup', marteloCima);
    document.getElementById('buraco0').addEventListener('click', martelada);
    document.getElementById('buraco1').addEventListener('click', martelada);
    document.getElementById('buraco2').addEventListener('click', martelada);
    document.getElementById('buraco3').addEventListener('click', martelada);
    document.getElementById('buraco4').addEventListener('click', martelada);
} // associa a função anônima descrita logo a seguir ao evento load da janela.

/*

Em JavaScript, o objeto que representa a janela do navegador se chama window, e é o objeto default (padrão). Isso significa que não é necessário escrever o nome do objeto, ou seja, a linha 15 é equivalente a escrever:

window.onload = function() {
    ...
}

*/

function start () {
    let botaoStart = document.getElementById('start');

    botaoStart.removeEventListener('click', start); // remover o evento do botão Start para que o usuário não possa inicializar o jogo várias vezes;
    botaoStart.disabled = true;
    sobeToupeira();
}

/*
A função que irá mostrar a toupeira em um buraco deve escolher aleatoriamente um dos cinco buracos e colocar a imagem do buraco com a toupeira no lugar da imagem do buraco sem a toupeira.
depois, a função deve ativar dois temporizadores (timers): um para remover a toupeira do buraco e o outro para subir a próxima toupeira.

*/



function sobeToupeira() {
    let buraco = Math.floor(Math.random() * 5); // floor arredonda o numero escolhido no intervalo para baixo
    let objBuraco = document.getElementById('buraco' + buraco); // ele concatena o numero aleatorio obtido com a palavra buraco, formando o id dos buracos (buraco0, buraco1, buraco2, buraco3, buraco4). Armazena a referência desse elemento na variável objBuraco
    objBuraco.src = 'images/hole-mole.png'; // altera o atributo src da imagem (tag img) pela imagem com a toupeira (hole-mole.png)
    timer = setTimeout(tiraToupeira, janela, buraco);
    setTimeout(sobeToupeira, intervalo);
}

/*

Agenda a remoção da toupeira:

setTimeout cria um temporizador que executa uma função após um tempo
Após janela milissegundos (2000ms = 2 segundos), chama a função tiraToupeira
Passa o número do buraco como parâmetro para a função tiraToupeira saber qual buraco limpar
Armazena a referência do timer na variável timer (permitindo cancelá-lo se necessário)

setTimeout(sobeToupeira, intervalo);
Agenda o próximo aparecimento de toupeira:

Após intervalo milissegundos (5000ms = 5 segundos), chama novamente a função sobeToupeira
Isso cria um loop recursivo: a função se chama continuamente, fazendo toupeiras aparecerem indefinidamente

*/

/*

Resumo do fluxo:

Sorteia um buraco aleatório (0-4)
Mostra a toupeira nesse buraco
Agenda para esconder essa toupeira depois de 2 segundos
Agenda para mostrar uma nova toupeira depois de 5 segundos
O ciclo continua infinitamente!

*/

function tiraToupeira(buraco) {
    const objBuraco = document.getElementById('buraco' + buraco);
    objBuraco.src='images/hole.png';
    perdidos++; // perdidos = perdidos +1
    mostraPontuacao();
}

/*

A função mostraPontuacao exibe a pontuação do jogador chamando quatro vezes a função mostraPontuacaoDe, cada uma para um tipo de valor a ser exibido: marteladas certas, toupeiras que não foram acertadas, marteladas erradas e pontuação total. Como a pontuação total não deve ser mostrada com valores negativos, pois o display do placar não tem números negativos, então sempre será exibido o maior valor entre zero e a pontuação do usuário. Se a pontuação for menor do que zero, o valor exibido será zero.

Veja que cada um dos quatro valores do display é composto 
por três imagens colocadas dentro de uma célula de tabela.
As imagens são filhas de células identificadas pelos 
seguintes valores de seus respectivos atributos 
id: acertos, perdidos, errados e saldo. 
A centena é o primeiro filho, a dezena é o primeiro irmão
do primeiro filho e a unidade é o primeiro irmão da dezena. 
Você vai se lembrar disso quando implementarmos a função mostraPontuacaoDe?

*/

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
    objCentena.src = 'images/caractere_' + centena + '.gif';
    objCentena.alt = centena;
    objDezena.src = 'images/caractere_' + dezena + '.gif';
    objDezena.alt = dezena;
    objUnidade.src = 'images/caractere_' + unidade + '.gif';
    objUnidade.alt = unidade; 
}

function marteloBaixo() {
    document.getElementById('idGramado').style.cursor = 'url(images/hammerDown.png), default';
}

function marteloCima() {
    document.getElementById('idGramado').style.cursor = 'url(images/hammer.png), default';
}

function martelada(evento) {
    if (evento.target.src.includes('hole-mole')) {
        // acertou
        acertos ++;
        evento.target.src = 'images/hole.png';
        clearTimeout(timer);
    }
    else {
        errados ++;
    }
    mostraPontuacao();
}