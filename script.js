window.onload = function () {    //as coisas so vao acontecer com a janela carregada
    const palco = document.getElementById('arena');
    const contexto = palco.getContext("2d");
    const pontuacao = document.getElementById('pontos'); 

    let score = 0;
   
    //imagem da maçã
    const appleImg = new Image();
    appleImg.src = './assets/maca.png';

    
    setInterval(game, 1000/15); //serve pra chamar uma função varias vezes com aquele intervalo (1000 milisegundos / 15)
    
    const vel = 1 //1 casa que anda a cada vez que a cobra mexe

    let vx = 0;   //velocidade no eixo x e y 
    let vy = 0;
    let px = 10;  //ponto onde começa no eixo x e y
    let py = 15;
    let tp = 20;  //tamanho de cada quadradinho do palco
    let ax = 15;
    let qp = 20;  //qntde de peças quadradas
    let ay = 15;  // onde a maçã aparece

    let trail = []; //rastro da cobra
    let tail = 3; //tamanho da cauda

    function game() {
        px += vx; 
        py += vy;
        if (px < 0) {   //se a cobra chegar na borda final da esquerda(0), ela precisa passar pro outro lado
            px = qp - 1
        }  
        if (px > qp - 1) {  // ao contrario do de cima - borda final direita, vai pra esquerda
            px = 0
        }
        if (py < 0) {   // mesma coisa pro eixo y
            py = qp - 1
        }  
        if (py > qp - 1) {  
            py = 0
        }

        contexto.fillStyle = 'black'; //estilo de preenchimento
        contexto.fillRect(0,0, palco.width, palco.height); //começando do ponto 0,0 -- preenchendo altura e largura do palco


        contexto.drawImage(appleImg, ax*tp, ay*tp, tp,tp); //preenchimento da maçã com imagem

        
        for(let i = 0; i < trail.length; i++) {
            contexto.fillStyle = 'green'; //preenchimento cobra
            contexto.fillRect(trail[i].x*tp, trail[i].y*tp, tp-2,tp-2) //looping do rastro, pintar o rastro

            if(trail[i].x == px && trail[i].y == py) {  //o rastro ta batendo na cabeça e no rabo?
                vx = 0;
                vy = 0;
                tail = 3;
                score = 0;
                pontuacao.innerHTML = 0;
               
            }
        }

       


        // se nao tiver batendo, ela vai se movimentar:
        trail.push({x:px, y:py}) // x vai ser a posicao atual do px, y do py
        while(trail.length > tail) {   //retirar o rastro de trás, quando come uma maçã
            trail.shift();  //retirando o 1º elemento do array
        }

        
        
        
        
        

        //aumentando a cauda:
        if(ax == px && ay == py) {  // se a posição da maçã for igual a psição da cabeça da cobra
            tail ++;
            ax = Math.floor(Math.random() * qp);
            ay = Math.floor(Math.random() * qp);  //posicionando a maçã para outro lugar do palco
            pontuacao.innerHTML = ++score;
            
        }
    }

    document.addEventListener("keydown", keyPush);

    //controlando a cobra
    let lastEvent = "";
    
    function keyPush(event) {

        switch(event.keyCode) {
            case 37:   //tecla left
            if(lastEvent != 'right') {
                vx = -vel;
                vy = 0;
                lastEvent = 'left';
            }
            break;

            case 38:   //tecla up
            if(lastEvent != 'down') {
                vx = 0;
                vy = -vel;
                lastEvent = 'up';
            }
            break;

            case 39:   //tecla right
            if(lastEvent != 'left') {
                vx = vel;
                vy = 0;
                lastEvent = 'right';
            }
            break;

            case 40:   //tecla down
            if(lastEvent != 'up') {
                vx = 0;
                vy = vel
                lastEvent = 'down';
            }
            break;
            
        }
    }

}

