var current_level = 0;

const form = {
  pageTitle           : () => document.getElementById("page-title"          ),
  inputAnswer         : () => document.getElementById("input-answer"        ),
  buttonOk            : () => document.getElementById("button-ok"           ),
  labelTitle          : () => document.getElementById("label-title"         ),
  imgLevel            : () => document.getElementById("img-level"           ),
  labelTip            : () => document.getElementById("label-tip"           ),
  labelCharRemaining  : () => document.getElementById("label-char-remaining"),
  labelAnswFormat     : () => document.getElementById("label-answ-format"   ),
  hiddenComments      : () => document.getElementById("comments-container"  ),
  inputContainer      : () => document.getElementById("input-container"     )
}

const levelTitle     = 0;
const levelImg       = 1;
const levelTip       = 2;
const levelFormatAns = 3;
const levelAnswer    = 4;
const levelAlt       = 5;
const levelComments  = 6;

form.inputAnswer().addEventListener("keypress", function(event) {  
  if (event.key === "Enter") {    
    //event.preventDefault();    
    form.buttonOk().click();
  }
});

function onChangeAnsw() {       
  
  const answerValue  = form.inputAnswer().value;
  const answerMaxLen = form.inputAnswer().maxLength;
  
  if (!answerValue) {
      form.labelCharRemaining().innerHTML = 'Caracteres restantes: ' + answerMaxLen;
  } else {
      form.labelCharRemaining().innerHTML = 'Caracteres restantes: ' + (answerMaxLen - answerValue.length);
  }
  
}

function loadLevel(id) {
  if ((id >-1) && (id < level.length)) {
    form.pageTitle().innerHTML = 'Parlenda - Nível '+id;
    form.labelTitle().innerHTML = 'Nível '+id+': '+level[id][levelTitle];
    form.imgLevel().src = level[id][levelImg];
    form.imgLevel().alt = level[id][levelAlt];
    form.labelTip().innerHTML = level[id][levelTip];
    form.inputAnswer().value ='';
    form.inputAnswer().maxLength = level[id][levelAnswer].length;
    form.labelCharRemaining().innerHTML = 'Caracteres restantes: ' + form.inputAnswer().maxLength;
    form.labelAnswFormat().innerHTML = 'Formato da resposta: '+level[id][levelFormatAns];
    form.hiddenComments().innerHTML = '<!-- '+level[id][levelComments]+' -->';
    if (level[id][levelAnswer].length > 0) {
      form.inputContainer().style.display = 'block';
    } else {
      form.inputContainer().style.display = 'none';
    }
    if (level[id][levelComments] == "h2.text-align:justify") {
      form.labelTitle().style.textAlign = 'justify';
    } else {
      form.labelTitle().style.textAlign = 'center';
    }
  } else {
    form.pageTitle().innerHTML = 'Parlenda - Nível (-1)';
    form.labelTitle().innerHTML = 'Nível (-1): Oops! Deu ruim...';
    form.imgLevel().src = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDllOWhpYXJsenpuZWVtMmR0OXRveHZ5bDdkc2prYXhvNGRxZzlhNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8EmeieJAGjvUI/giphy.webp';
    form.imgLevel().alt = 'deu ruim...';
    form.labelTip().innerHTML = 'Algo de errado não está certo... Nenhuma parlenda foi carregada.';
    form.inputAnswer().value ='';
    form.inputAnswer().maxLength = 0;
    form.labelCharRemaining().innerHTML = 'Caracteres restantes: ?';
    form.labelAnswFormat().innerHTML = 'Formato da resposta: não há :(';
    form.hiddenComments().innerHTML = '';    
    form.inputContainer().style.display = 'none';
  }
}

function testAns() {
  if (form.buttonOk().textContent == 'Próxima') {
    document.querySelector("#input-answer").disabled = false;
    form.buttonOk().textContent = 'Verificar';
    current_level++;
    loadLevel(current_level); 
    clearAllConffetis();
    return;   
  }

  const answerValue  = form.inputAnswer().value;    
  if (!answerValue) {
      alert("Resposta incorreta...  :'(");
  } else if (answerValue == level[current_level][levelAnswer]) {
      //current_level++;
      //loadLevel(current_level);
      document.querySelector("#input-answer").disabled = true;
      createConfetti();
      form.buttonOk().textContent = 'Próxima';
  } else {
      alert("Resposta incorreta...  :'(");
  }
}


/*
[ levelTitle, 
  levelImg, 
  levelTip, 
  levelFormatAns, 
  levelAnswer, 
  levelAlt, 
  levelComments],
*/


const level = [
  
  // NIVEL 0 - BOLO
  [ "Leia o texto:", 
    "./imgs/parlendas/bolo.png", 
	  "Quem levou o bolo foi:", 
    "utilize apenas letras minúsculas.", 
    "vanessa", 
    "", 
    ""
  ],

  // NIVEL 1 - BOLO
  [ "Leia o texto:", 
    "./imgs/parlendas/bolo.png", 
	  "A festa era para o:", 
    "utilize apenas letras minúsculas.", 
    "vovô",
    "", 
    ""
  ],

  // NIVEL 2 - BOLO
  [ "Leia o texto:", 
    "./imgs/parlendas/bolo.png", 
	  "Vovô soprou tão forte que o bolo:", 
    "utilize apenas letras minúsculas.", 
    "espatifou",
    "", 
    ""
  ],    

  // NIVEL 3 - RETRATO DE PATO
  [ "Leia o texto:", 
    "./imgs/parlendas/retrato-pato.png", 
	  "O pato ganhou:", 
    "utilize apenas letras minúsculas.", 
    "sapato",
    "", 
    ""
  ],     

  // NIVEL 4 - RETRATO DE PATO
  [ "Leia o texto:", 
    "./imgs/parlendas/retrato-pato.png", 
	  "O retratista era o:", 
    "utilize apenas letras minúsculas.", 
    "macaco",
    "", 
    ""
  ],   
  
  // NIVEL 5 - RETRATO DE PATO
  [ "Leia o texto:", 
    "./imgs/parlendas/retrato-pato.png", 
	  "O artista era o:", 
    "utilize apenas letras minúsculas.", 
    "macaco",
    "", 
    ""
  ],   

  // NIVEL 6 - O RATO TATAU
  [ "Leia o texto:", 
    "./imgs/parlendas/rato_tatau.png", 
	  "Qual é o nome do rato?", 
    "utilize apenas letras minúsculas.", 
    "tatau",
    "", 
    ""
  ], 
  
  // NIVEL 7 - O RATO TATAU
  [ "Leia o texto:", 
    "./imgs/parlendas/rato_tatau.png", 
	  "Tatau é um rato:", 
    "utilize apenas letras minúsculas.", 
    "levado",
    "", 
    ""
  ],    

  // NIVEL 8 - O RATO TATAU
  [ "Leia o texto:", 
    "./imgs/parlendas/rato_tatau.png", 
	  "Tatau vive na casa de:", 
    "utilize apenas letras minúsculas.", 
    "malu",
    "", 
    ""
  ],    

  // NIVEL 9 - CONFUSÃO
  [ "Leia o texto:", 
    "./imgs/parlendas/confusao.png", 
	  "O cão viu o:", 
    "utilize apenas letras minúsculas.", 
    "gato",
    "", 
    ""
  ],     
  
  // NIVEL 10 - CONFUSÃO
  [ "Leia o texto:", 
    "./imgs/parlendas/confusao.png", 
	  "O gato viu o:", 
    "utilize apenas letras minúsculas.", 
    "rato",
    "", 
    ""
  ],   
  
    // NIVEL 11 - CONFUSÃO
  [ "Leia o texto:", 
    "./imgs/parlendas/confusao.png", 
	  "O que o rato fez?", 
    "utilize apenas letras minúsculas.", 
    "fugiu",
    "", 
    ""
  ],  

  // NIVEL 12 - GATO XADREZ
  [ "Leia o texto:", 
    "./imgs/parlendas/gato-xadrez.png", 
    "O gato é:", 
    "utilize apenas letras minúsculas.", 
    "xadrez",
    "", 
    ""
  ],    

  // NIVEL 13 - GATO XADREZ
  [ "Leia o texto:", 
    "./imgs/parlendas/gato-xadrez.png", 
    "O gato caiu da:", 
    "utilize apenas letras minúsculas.", 
    "janela",
    "", 
    ""
  ],  
  
  // NIVEL 14 - JACARÉ DE BONÉ
  [ "Leia o texto:", 
    "./imgs/parlendas/jacare-de-bone.png", 
    "Qual o título do texto?", 
    "palavra1 palavra2 palavra3; utilize apenas letras minúsculas.", 
    "jacaré de boné",
    "", 
    ""
  ],   
  
  // NIVEL 15 - JACARÉ DE BONÉ
  [ "Leia o texto:", 
    "./imgs/parlendas/jacare-de-bone.png", 
    "O que o jacaré gostava de fazer?", 
    "palavra1 palavra2; utilize apenas letras minúsculas.", 
    "tomar sol",
    "", 
    ""
  ], 
  
  // NIVEL 16 - JACARÉ DE BONÉ
  [ "Leia o texto:", 
    "./imgs/parlendas/jacare-de-bone.png", 
    "Como era o jacaré?", 
    "palavra1 palavra2; utilize apenas letras minúsculas.", 
    "muito lelé",
    "", 
    ""
  ],   

  // NIVEL 17 - JACARÉ DE BONÉ
  [ "Observe o desenho:", 
    "./imgs/parlendas/jacare-de-bone_jacare.png", 
    "Escreva o nome do animal que você vê neste desenho.", 
    "utilize apenas letras minúsculas.", 
    "jacaré",
    "", 
    ""
  ],  
  
  // NIVEL 18 - JACARÉ DE BONÉ
  [ "Observe o desenho:", 
    "./imgs/parlendas/jacare-de-bone_bone.png", 
    "Escreva o nome do objeto que você vê no desenho.", 
    "utilize apenas letras minúsculas.", 
    "boné",
    "", 
    ""
  ],    

  // NIVEL 19 - JACARÉ DE BONÉ
  [ "Observe o desenho:", 
    "./imgs/parlendas/jacare-de-bone_sol.png", 
    "Escreva o nome do que você vê no desenho desenho.", 
    "utilize apenas letras minúsculas.", 
    "sol",
    "", 
    ""
  ],  

  // NIVEL 20 - O SAPO SABINO
  [ "Leia o texto:", 
    "./imgs/parlendas/sapo-sabino.png", 
    "Qual o nome do sapo?", 
    "utilize apenas letras minúsculas.", 
    "sabino",
    "", 
    ""
  ],    

  // NIVEL 21 - O SAPO SABINO
  [ "Leia o texto:", 
    "./imgs/parlendas/sapo-sabino.png", 
    "Qual o título do texto?", 
    "palavra1 palavra2 palavra3; utilize apenas letras minúsculas.", 
    "o sapo sabino",
    "", 
    ""
  ],    

  // NIVEL 22 - O SAPO SABINO
  [ "Leia o texto:", 
    "./imgs/parlendas/sapo-sabino.png", 
    "Como ele era?", 
    "palavra1 palavra2 palavra3; utilize apenas letras minúsculas.", 
    "sabido e sapeca",
    "", 
    ""
  ],     
  
  // NIVEL 23 - O SAPO SABINO
  [ "Leia o texto:", 
    "./imgs/parlendas/sapo-sabino.png", 
    "Qual o instrumento musical o sapo Sabino tocava?", 
    "utilize apenas letras minúsculas.", 
    "rabeca",
    "", 
    ""
  ],    

  // NIVEL 24 - O SAPO SABINO
  [ "Observe o desenho:", 
    "./imgs/parlendas/sapo-sabino-no-lago.png", 
    "O sapo sabino mora no:", 
    "utilize apenas letras minúsculas.", 
    "lago",
    "", 
    ""
  ],   

  // NIVEL 25 - O SAPO SABINO
  [ "Observe o desenho:", 
    "./imgs/parlendas/sapo-sabino_sapo.png", 
    "Qual o nome deste animal?", 
    "utilize apenas letras minúsculas.", 
    "sapo",
    "", 
    ""
  ],    

  // NIVEL 26 - O SAPO SABINO
  [ "Observe o desenho:", 
    "./imgs/parlendas/sapo-sabino_rabeca.png", 
    "Qual o nome deste instrumento?", 
    "utilize apenas letras minúsculas.", 
    "rabeca",
    "", 
    ""
  ],      

  // NIVEL 27 - O UNICÓRNIO
  [ "Leia o texto:", 
    "./imgs/parlendas/unicornio-balu.png", 
    "Qual o nome do unicórnio?", 
    "utilize apenas letras minúsculas.", 
    "balu",
    "", 
    ""
  ],        

  // NIVEL 28 - O UNICÓRNIO
  [ "Leia o texto:", 
    "./imgs/parlendas/unicornio-balu.png", 
    "O unicórnio Balu queria um dia poder:", 
    "utilize apenas letras minúsculas.", 
    "voar",
    "", 
    ""
  ],       

  // NIVEL 29 - GATO DENGOSO
  [ "Leia o texto:", 
    "./imgs/parlendas/gato-dengoso.png", 
    "O texto refere-se a qual animal?", 
    "utilize apenas letras minúsculas.", 
    "gato",
    "", 
    ""
  ],       
  
  // NIVEL 30 - GATO DENGOSO
  [ "Leia o texto:", 
    "./imgs/parlendas/gato-dengoso.png", 
    "Qual era o nome do gato?", 
    "utilize apenas letras minúsculas.", 
    "manhoso",
    "", 
    ""
  ],      

  // NIVEL 31 - GATO DENGOSO
  [ "Leia o texto:", 
    "./imgs/parlendas/gato-dengoso.png", 
    "O gato era muito?", 
    "utilize apenas letras minúsculas.", 
    "dengoso",
    "", 
    ""
  ],      

  // NIVEL 32 - GATO DENGOSO
  [ "Leia o texto:", 
    "./imgs/parlendas/gato-dengoso.png", 
    "Manhoso gostava de:", 
    "palavra1 palavra2 palavra3; utilize apenas letras minúsculas.", 
    "leite com biscoito",
    "", 
    ""
  ],  
  
  // NIVEL 33 - LEAO LEITOR
  [ "Leia o texto:", 
    "./imgs/parlendas/leao-leitor.png", 
    "De qual animal o texto está falando?", 
    "utilize apenas letras minúsculas.", 
    "leão",
    "", 
    ""
  ],     

  // NIVEL 34 - LEAO LEITOR
  [ "Leia o texto:", 
    "./imgs/parlendas/leao-leitor.png", 
    "Qual o nome do leão?", 
    "utilize apenas letras minúsculas.", 
    "leonardo",
    "", 
    ""
  ],   
  
  // NIVEL 35 - LEAO LEITOR
  [ "Leia o texto:", 
    "./imgs/parlendas/leao-leitor.png", 
    "Leonardo esqueceu de:", 
    "utilize apenas letras minúsculas.", 
    "comer",
    "", 
    ""
  ],   

  // NIVEL 36 - FORMAÇÃO DE FRASES SOM SÍLABAS I
  [ "Junte as sílabas e forme palavras, seguindo a numeração.", 
    "./imgs/parlendas/silabas-numeracao-1.png", 
    "1 - 15 - 21 :", 
    "utilize apenas letras minúsculas.", 
    "cebola",
    "", 
    ""
  ],   

  // NIVEL 37 - FORMAÇÃO DE FRASES SOM SÍLABAS I
  [ "Junte as sílabas e forme palavras, seguindo a numeração.", 
    "./imgs/parlendas/silabas-numeracao-1.png", 
    "9 - 4 - 23 :", 
    "utilize apenas letras minúsculas.", 
    "cenoura",
    "", 
    ""
  ],     

  // NIVEL 38 - FORMAÇÃO DE FRASES SOM SÍLABAS I
  [ "Junte as sílabas e forme palavras, seguindo a numeração.", 
    "./imgs/parlendas/silabas-numeracao-1.png", 
    "10 - 17 - 24 :", 
    "utilize apenas letras minúsculas.", 
    "cinema",
    "", 
    ""
  ],     

  // NIVEL 39 - FORMAÇÃO DE FRASES SOM SÍLABAS I
  [ "Junte as sílabas e forme palavras, seguindo a numeração.", 
    "./imgs/parlendas/silabas-numeracao-1.png", 
    "22 - 8 - 20 :", 
    "utilize apenas letras minúsculas.", 
    "cimento",
    "", 
    ""
  ],     

  // NIVEL 40 - FORMAÇÃO DE FRASES SOM SÍLABAS I
  [ "Junte as sílabas e forme palavras, seguindo a numeração.", 
    "./imgs/parlendas/silabas-numeracao-1.png", 
    "13 - 2 - 18 :", 
    "utilize apenas letras minúsculas.", 
    "cabeça",
    "", 
    ""
  ],       

  // NIVEL 41 - FORMAÇÃO DE FRASES SOM SÍLABAS I
  [ "Junte as sílabas e forme palavras, seguindo a numeração.", 
    "./imgs/parlendas/silabas-numeracao-1.png", 
    "6 - 14 - 16 :", 
    "utilize apenas letras minúsculas.", 
    "coelho",
    "", 
    ""
  ],       

  // NIVEL 42 - FORMAÇÃO DE FRASES SOM SÍLABAS I
  [ "Junte as sílabas e forme palavras, seguindo a numeração.", 
    "./imgs/parlendas/silabas-numeracao-1.png", 
    "3 - 25 - 11 :", 
    "utilize apenas letras minúsculas.", 
    "coroa",
    "", 
    ""
  ],     

  // NIVEL 43 - FORMAÇÃO DE FRASES SOM SÍLABAS I
  [ "Junte as sílabas e forme palavras, seguindo a numeração.", 
    "./imgs/parlendas/silabas-numeracao-1.png", 
    "19 - 7 - 8 - 20 :", 
    "utilize apenas letras minúsculas.", 
    "documento",
    "", 
    ""
  ],       

  // NIVEL ÚLTIMO - MOSTRA ESSA TELA QUANDO PASSOU POR TODOS OS NÍVEIS
  [ "Não há mais nada aqui...", 
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWZsb2kyenFicGFwMzFvNnpmMHAxZmw1OWVvdGtxMnRvd2t5eWZoYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BSx6mzbW1ew7K/giphy.webp", 
    "Parabéns, você chegou ao final!", 
    "", 
    "", 
    "Festa", 
    ""]    //h2.text-align:justify
	
  


]














function createConfetti() {
  const confettiContainer = document.getElementById('confetti-container');

  for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');

      // Posiciona o confete aleatoriamente na tela
      confetti.style.left = Math.random() * 80 + 'vw';
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