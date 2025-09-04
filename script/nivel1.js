
duracao = 1 * 60 + 30;

function main() {

    window.addEventListener('load', function () {
        comecarJogo();
        botaoOkRegra.addEventListener("click", () => {

            document.getElementById("regra").remove();
            document.getElementById("perdeu").classList.remove("modal-escondido");
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
                    handleGameOver(100);
                }
            }, 100);
            timerInterval = setInterval(() => {
                atualizarTimer(duracao)

            }, 1000);
        });


    })


}

main();