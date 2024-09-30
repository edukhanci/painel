//adicionar antes do </body> :
//<div id="confetti-container"></div>

function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
  
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
  
        // Posiciona o confete aleatoriamente na tela
        confetti.style.left = Math.random() * 95 + 'vw';
        confetti.style.top = Math.random() * -10 + 'vh'; // Permite criar acima da tela para cair logo
  
        // Define um tempo de duração aleatório para a queda
        const duration = Math.random() * 3 + 2; // entre 2 e 5 segundos
        confetti.style.animationDuration = `${duration}s`;
  
        confettiContainer.appendChild(confetti);
  
        // Monitora o confete para removê-lo ao passar 80% da altura da tela
        monitorPosition(confetti);
  
        /*
        // Remove o confete do DOM após a animação terminar para não sobrecarregar a página
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
        */
    }
  }    
  
  function monitorPosition(confetti) {
    const windowHeight = window.innerHeight; // Altura da tela
  
    function checkPosition() {
        const rect = confetti.getBoundingClientRect(); // Pega a posição do confete
        if (rect.top > windowHeight * 0.9) { // Verifica se passou de 80% da altura
            confetti.remove(); // Remove o confete do DOM
        } else {
            requestAnimationFrame(checkPosition); // Continua monitorando até a remoção
        }
    }
  
    requestAnimationFrame(checkPosition); // Inicia o monitoramento
  }
  
  function getRandomColor() {
    const colors = ['#ff6b6b', '#feca57', '#1dd1a1', '#5f27cd', '#48dbfb'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  //muda a cor dos confetes
  setInterval(() => {
    const confettis = document.querySelectorAll('.confetti');
    confettis.forEach(confetti => {
        confetti.style.backgroundColor = getRandomColor();
    });
  }, 500);
  
  function clearAllConffetis(){
    const confettis = document.querySelectorAll('.confetti');
    confettis.forEach(confetti => {
      confetti.remove(); // Remove o confete do DOM
    });  
  }
  
  const style = document.createElement('style');
  style.innerHTML = `
  .confetti {
    position: absolute;
    width: 10px;
    height: 30px;
    background-color: red;
    opacity: 0.7;
    /* animation: fall 5s linear infinite; */
    animation: fall linear infinite;
    transform: rotate(${Math.random() * 360}deg);
  }
  
  @keyframes fall {
    0% {
        transform: translateY(-100vh) rotate(0deg);
    }
    100% {
        transform: translateY(100vh) rotate(${Math.random() * 360}deg);
    }
  }
  `;
  document.head.appendChild(style);