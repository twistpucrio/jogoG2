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
    // coordenadas para calculos de adjacencia
    let coordenadasAtual = quadradoAtual.id.split("-"); // id="0-0" -> ["0","0"]
    let l1 = parseInt(coordenadasAtual[0]) // coord linha
    let c1 = parseInt(coordenadasAtual[1]) // coord coluna

    let coordenadasOutro = quadradoOutro.id.split("-"); // id="0-0" -> ["0","0"]
    let l2 = parseInt(coordenadasOutro[0]) // coord linha
    let c2 = parseInt(coordenadasOutro[1]) // coord coluna


    let moveEsquerda = c2 == c1-1 && l1 == l2;
    let moveDireita = c2 == c1+1 && l1 == l2;

    let moveCima = l2 == l1-1 && c1==c2;
    let moveBaixo = l2 == l1+1 && c1==c2;

    let verificaAdjacente = moveEsquerda || moveDireita || moveCima || moveBaixo;

    //faz a troca das imagens
    if (verificaAdjacente){
        let imagemAtual = quadradoAtual.src;
        let imagemOutra = quadradoOutro.src;
        quadradoAtual.src = imagemOutra;
        quadradoOutro.src = imagemAtual;
    }

}

function matchAnimal(){
    // matchCinco();
    // matchQuatro();
    matchTres();
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
            }
        }
    
    } 
    //verifica colunas
    for (let c = 0; c < colunas, c++;){
        for(let l = 0; l < linhas-2, l++;){
            let animal1 = board[l][c];
            let animal2 = board[l+1][c];
            let animal3 = board[l+2][c];
            if (animal1.src == animal2.src && animal2.src == animal3.src && !animal1.src.includes("Vazio")){
                animal1.src = "./img/Vazio.png"
                animal2.src = "./img/Vazio.png"
                animal3.src = "./img/Vazio.png"
            } 
        }
    }

}