var animais = ["Cachorrinho", "Coelhinho", "Gatinho", "Pintinho", "Raposinha", "Ursinho"];
var board = [];
var linhas = 9;
var colunas = 9;

var quadradoAtual;
var quadradoOutro;

let controle = 0;

let scoreElement = document.getElementById("score");
scoreElement.innerHTML = 0;
let score= 0; 

let duracao; 
let restante;
let inicio; 

let gameOver = false;
let ganhou = false;

let mainInterval;
let timerInterval;

let proxnivel = document.getElementById("proxNivel");
let boardElem = document.getElementById("board");

let botaoOkRegra = document.getElementById("botao_ok_regra");
 

let somScore = new Audio("./sound/somScore.mp3");

function contabiliza (pontos){
    if (controle == 1 ){
        score += pontos; 
        scoreElement.innerHTML = `${score}`;
    }
}



function animalAleatorio(){
    return animais[Math.floor(Math.random() * animais.length)];
}


function comecarJogo(){
    for (let l = 0; l < linhas; l++){ /*Loop de para cada linha do board */
        let linha = []; // Cria linha que será colocada no board
        for (let c = 0; c < colunas; c++){ /*Loop de para cada coluna do board */
            let quadrado = document.createElement("img"); // cria quadrado que será usado para abrigar imagem do animal
            quadrado.id = l + "-" + c // identificação quadrado
            quadrado.src = "./img/" + animalAleatorio() + ".png" // atribui um animal ao quadrado


            
            quadrado.addEventListener("dragstart", dragStart); // clicar no animal para arrastar
            quadrado.addEventListener("dragover", dragOver); // segurando e movendo o mouse para levar o animal
            quadrado.addEventListener("dragenter", dragEnter); // pairando animal encima de outro
            quadrado.addEventListener("dragleave", dragLeave); // deixando animal encima de outro
            quadrado.addEventListener("drop", dragDrop); // animal cai encima de outro
            quadrado.addEventListener("dragend", dragEnd); // troca dos animais
            
    
            boardElem.append(quadrado); // adiciona quadrado ao board que será visualizado
            linha.push(quadrado); //adiciona quadrado a linha para calcular combinações
        }
        board.push(linha);
    }
    console.log(board);
}


function dragStart(){
    // o quadrado que foi clickado
    quadradoAtual = this;
}

function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
}

function dragLeave(){

}
function dragDrop(){
    quadradoOutro = this;
}

function dragEnd(){

    if (quadradoAtual.src.includes("Vazio") || quadradoOutro.src.includes("Vazio")){
        return;
    } // verifica se o jogador está tentando mover peça para um quadrado vazio e impede isso


    // coordenadas para calculos de adjacencia
    let coordenadasAtual = quadradoAtual.id.split("-"); // id="0-0" -> ["0","0"]
    let l1 = parseInt(coordenadasAtual[0]) // coord linha
    let c1 = parseInt(coordenadasAtual[1]) // coord coluna

    let coordenadasOutro = quadradoOutro.id.split("-"); // id="0-0" -> ["0","0"]
    let l2 = parseInt(coordenadasOutro[0]) // coord linha
    let c2 = parseInt(coordenadasOutro[1]) // coord coluna



    // uso das coordenadas dos quadrados de origem e destino para determinar adjacencia 
    let moveEsquerda = c2 == c1-1 && l1 == l2;
    let moveDireita = c2 == c1+1 && l1 == l2;

    let moveCima = l2 == l1-1 && c1==c2;
    let moveBaixo = l2 == l1+1 && c1==c2;

    let verificaAdjacente = moveEsquerda || moveDireita || moveCima || moveBaixo;

    //faz a troca das imagens
    if (verificaAdjacente){ // verifica se o movimento das imagens é adjacente para permitir que ocorra
        let imagemAtual = quadradoAtual.src; // imagem atual é a do quadrado da peça que pegamos com o mouse
        let imagemOutra = quadradoOutro.src; // image outra é a do quadrado da peça de destino, aonde queremos colocar a peça que pegamos com o mouse
        quadradoAtual.src = imagemOutra; // faz o quadrado inicial ter a imagem do quadrado destino, inversão
        quadradoOutro.src = imagemAtual; // faz o quadrado de destino ter a imagem do quadrado inicial, inversão
        
        
        let movimentoValido = verificaValido(); // verifica se a inversão das imagems causou um alinhamento de 3 peças ou mais
        if (!movimentoValido){ // se não houve alinhamento, o if é ativado e as imagens voltam a posição inicial delas usando o mesmo mecanismo de antes
            imagemAtual = quadradoAtual.src;
            imagemOutra = quadradoOutro.src;
            quadradoAtual.src = imagemOutra;
            quadradoOutro.src = imagemAtual;
        } 
        else if(controle === 0){
            controle = 1;
            
        }
    }

}



function matchAnimais(numMatch){
    // verifica linhas
        for (let l = 0; l < linhas; l++){/*Loop de para cada linha do board */
            for (let c = 0; c < colunas - (numMatch-1); c++){
                let animaisMatch = [board[l][c]]
                for (let i = 1; i < numMatch; i++){
                    animaisMatch.push(board[l][c+i])
                }
                let verificaImagens = true;
                for (let i = 0; i < numMatch-1; i++){
                    if (animaisMatch[i].src != animaisMatch[i+1].src){
                        verificaImagens = false;
                    }
                }

                if (verificaImagens == true){
                    somScore.play();
                    for (let i = 0; i<numMatch; i++){
                        animaisMatch[i].src ="./img/Vazio.png";

                    }
                    contabiliza(numMatch);
                    

                }   
    } 
    //verifica colunas
            for (let c = 0; c < colunas ; c++){/*Loop de para cada linha do board */
                for (let l = 0; l < linhas - (numMatch-1); l++){
                    let animaisMatch = [board[l][c]]
                    for (let i = 1; i < numMatch; i++){
                        animaisMatch.push(board[l+i][c])
                    }
                    let verificaImagens = true;
                    for (let i = 0; i < numMatch-1; i++){
                        if (animaisMatch[i].src != animaisMatch[i+1].src){
                            verificaImagens = false;
                        }
                    }

                    if (verificaImagens == true){
                        somScore.play();
                        for (let i = 0; i<numMatch; i++){
                            animaisMatch[i].src ="./img/Vazio.png";                           
                        }
                    contabiliza(numMatch);
                    
                }   
    }  
     }


        }}

function verificaValido(){
    //verifica linhas
    for (let l = 0; l < linhas; l++){/*Loop de para cada linha do board */
        for (let c = 0; c < colunas - 2; c++){
            let animal1 = board[l][c];
            let animal2 = board[l][c+1];
            let animal3 = board[l][c+2];
            if (animal1.src == animal2.src && animal2.src == animal3.src && !animal1.src.includes("Vazio")){
                return true
            }
        }
    
    } 
    //verifica colunas
    for (let c = 0; c < colunas; c++){
        for(let l = 0; l < linhas - 2; l++){
            let animal1 = board[l][c];
            let animal2 = board[l+1][c];
            let animal3 = board[l+2][c];
            if (animal1.src == animal2.src && animal2.src == animal3.src && !animal1.src.includes("Vazio")){
                return true;
            } 
        }
    }

    return false
}


function deslizarAnimais(){
    // verifica as colunas
    for (let c = 0; c < colunas; c++){
        let ind = linhas - 1 ; // linhas com numero alto estão encima, ind começa embaixo então 
        for (let l = colunas-1; l>=0; l--){
            if (!board[l][c].src.includes("Vazio")){ // verifica se a posição não é vazia antes de continuar
                board[ind][c].src = board[l][c].src;
                ind -= 1;
            }    
        }
        for (let l = ind; l >= 0; l--){
            board[l][c].src = "./img/Vazio.png";
        }
    }
}

function gerarAnimais(){
    for (let c = 0; c < colunas; c++){
        if (board[0][c].src.includes("Vazio")){
            board[0][c].src = "./img/" + animalAleatorio() + ".png";
        }
    }

}
// no inicio do jogo ->   quando voltar do pause -> atualizarTimer(restante);

inicio = Date.now();   
//CHAMAR NO CASO 1 O inicio = date.now()  

    function atualizarTimer(duracao) {
        let agora = Date.now();
        let decorrido = Math.floor((agora - inicio) / 1000);
        restante = duracao - decorrido;
        let relogio = document.getElementById("timer");
        let min, seg;
        let segundo;
        let minuto;

        console.log(restante)

        if (restante <= 0) {
            console.log("Acabou")
            relogio.innerHTML= "⏰";
            gameOver = true;
            return; 
        }

        min = Math.floor((restante / 60));
        minuto = min < 10 ? `0${min}` : min;
        seg = restante % 60;
        segundo = seg < 10 ? `0${seg}` : seg;

        // Atualizar timer na tela
        relogio.innerHTML= `<p>${minuto}:${segundo} </p>`;
    }
    

//parte de Score/Game Over (nao tem muita coisa feita-se precisar pode apagar a partir daqui!)       


function handleGameOver(n) {
    clearInterval(mainInterval);
    clearInterval(timerInterval);
    let texto;
     if (score>= n){
        ganhou=true; 
        texto = "Voce ganhou";
    }
    else{
        ganhou= false; 
        texto = "Voce perdeu";
    }
    if (confirm( texto + ", proximo nivel?")){
        proxnivel.click();
    }
    else{
        controle=0;
        location.reload();
    }    
}


/*function btnPause(){
        controle=2;  
        let conf = confirm("deseja voltar jogar???");
        if (conf == true){
            controle=1; 
        }
        else{
           gameOver = true;
        }
}*/

function btnPause(){
    boardElem.style.visibility = 'hidden';
    setTimeout(() => {
        controle =2;
        let agora = Date.now();
        alert("Jogo pausado "); 
        let decorrido = Date.now() - agora;
        inicio += decorrido;
        boardElem.style.visibility = 'visible';
        controle = 1;
    }, 0);// setTimout para renderizar o css    
}





