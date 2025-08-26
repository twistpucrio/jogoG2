var animais = ["Cachorrinho", "Coelhinho", "Gatinho", "Pintinho", "Raposinha", "Ursinho"];
var board = [];
var linhas = 9;
var colunas = 9;

var quadradoAtual;
var quadradoOutro;


window.addEventListener('load', function() {
    comecarJogo();
    window.setInterval(function(){
        matchAnimal();
        deslizarAnimais();
        gerarAnimais();
    },100);
});

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
            



    
            document.getElementById("board").append(quadrado); // adiciona quadrado ao board que será visualizado
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
    }

}

function matchAnimal(){
    matchCinco();
    matchQuatro();
    matchTres();
}

function matchCinco(){
    //verifica linhas
    for (let l = 0; l < linhas; l++){/*Loop de para cada linha do board */
        for (let c = 0; c < colunas - 4; c++){
            let animal1 = board[l][c];
            let animal2 = board[l][c+1];
            let animal3 = board[l][c+2];
            let animal4 = board[l][c+3];
            let animal5 = board[l][c+4];
            if (animal1.src == animal2.src && animal2.src == animal3.src && animal3.src == animal4.src && animal4.src == animal5.src && !animal1.src.includes("Vazio")){
                animal1.src = "./img/Vazio.png"
                animal2.src = "./img/Vazio.png"
                animal3.src = "./img/Vazio.png"
                animal4.src = "./img/Vazio.png"
                animal5.src = "./img/Vazio.png"
                // colocar pontuação aqui
            }
        }
    
    } 
    //verifica colunas
    for (let c = 0; c < colunas; c++){
        for(let l = 0; l < linhas - 4; l++){
            let animal1 = board[l][c];
            let animal2 = board[l+1][c];
            let animal3 = board[l+2][c];
            let animal4 = board[l+3][c];
            let animal5 = board[l+4][c];
            if (animal1.src == animal2.src && animal2.src == animal3.src && animal3.src == animal4.src && animal4.src == animal5.src && !animal1.src.includes("Vazio")){
                animal1.src = "./img/Vazio.png"
                animal2.src = "./img/Vazio.png"
                animal3.src = "./img/Vazio.png"
                animal4.src = "./img/Vazio.png"
                animal5.src = "./img/Vazio.png"
                // colocar pontuação aqui
            } 
        }
    }

}




function matchQuatro(){
    //verifica linhas
    for (let l = 0; l < linhas; l++){/*Loop de para cada linha do board */
        for (let c = 0; c < colunas - 3; c++){
            let animal1 = board[l][c];
            let animal2 = board[l][c+1];
            let animal3 = board[l][c+2];
            let animal4 = board[l][c+3];
            if (animal1.src == animal2.src && animal2.src == animal3.src && animal3.src == animal4.src && !animal1.src.includes("Vazio")){
                animal1.src = "./img/Vazio.png"
                animal2.src = "./img/Vazio.png"
                animal3.src = "./img/Vazio.png"
                animal4.src = "./img/Vazio.png"
                // colocar pontuação aqui
            }
        }
    
    } 
    //verifica colunas
    for (let c = 0; c < colunas; c++){
        for(let l = 0; l < linhas - 3; l++){
            let animal1 = board[l][c];
            let animal2 = board[l+1][c];
            let animal3 = board[l+2][c];
            let animal4 = board[l+3][c];
            if (animal1.src == animal2.src && animal2.src == animal3.src && animal3.src == animal4.src && !animal1.src.includes("Vazio")){
                animal1.src = "./img/Vazio.png"
                animal2.src = "./img/Vazio.png"
                animal3.src = "./img/Vazio.png"
                animal4.src = "./img/Vazio.png"
                // colocar pontuação aqui
            } 
        }
    }

}



function matchTres(){
    //verifica linhas
    for (let l = 0; l < linhas; l++){/*Loop de para cada linha do board */
        for (let c = 0; c < colunas - 2; c++){
            let animal1 = board[l][c];
            let animal2 = board[l][c+1];
            let animal3 = board[l][c+2];
            if (animal1.src == animal2.src && animal2.src == animal3.src && !animal1.src.includes("Vazio")){
                animal1.src = "./img/Vazio.png"
                animal2.src = "./img/Vazio.png"
                animal3.src = "./img/Vazio.png"
                // colocar pontuação aqui
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
                animal1.src = "./img/Vazio.png"
                animal2.src = "./img/Vazio.png"
                animal3.src = "./img/Vazio.png"
                // colocar pontuação aqui
            } 
        }
    }

}


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
let duracao = 1 * 60 + 10 ; 
let inicio = Date.now();   

    function atualizarTimer() {
        let agora = Date.now();
        let decorrido = Math.floor((agora - inicio) / 1000);
        let restante = duracao - decorrido;
        let relogio = document.getElementById("timer");
        let min, seg;
        let segundo;
        let minuto;

        console.log(restante)

        if (restante <= 0) {
            console.log("Acabou")
            relogio.innerHTML= "⏰ Acabou!";
            return; 
        }

        min = Math.floor((restante / 60));
        minuto = min < 10 ? `0${min}` : min;
        seg = restante % 60;
        segundo = seg < 10 ? `0${seg}` : seg;

        // Atualizar timer na tela
        relogio.innerHTML= `<p>${minuto}:${segundo} </p>`;
    }
    
    // Atualizar timer na tela a função é chamada de 
    setInterval(() => {
                atualizarTimer()
        }, 1000);
    
