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
    