
duracao = 1 * 60 + 10;

function main() {

    window.addEventListener('load', function () {
        comecarJogo();
        boardElem.style.visibility = 'hidden';//esconde o board do jogo
        botaoOkRegra.addEventListener("click", () => {//quando clicar no botao de ok
            boardElem.style.visibility = 'visible';//mostra o board do jogo
            document.getElementById("regra").remove();//remove o modal da regra
            document.getElementById("modal_container").style.zIndex = -1;//coloca o modal container pra tras em relacao ao resto
            
            mainInterval = window.setInterval(function () {

                deslizarAnimais();
                gerarAnimais();
                if (controle === 3) {
                    controle = 0;
                }
                matchAnimais(5);
                matchAnimais(4);
                matchAnimais(3);

                if (gameOver) {
                    controle = 3;
                    handleGameOver(1000);//o parametro é o numero de pontos necessarios para passar de nivel
                }
            }, 100);

            restante = duracao;
            timerInterval = setInterval(() => {//para rodar a funcao a cada 1 segundo
                atualizarTimer()

            }, 1000);
        });

    })


}

main();