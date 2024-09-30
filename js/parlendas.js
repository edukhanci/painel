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
    form.labelTitle().innerHTML = 'Nível '+id+' - '+level[id][levelTitle];
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
    form.labelTitle().innerHTML = 'Nível (-1) - Oops! Deu ruim...';
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

  document.querySelector("#input-answer").focus();
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
  } else if (answerValue.toLowerCase() == level[current_level][levelAnswer]) {
      //current_level++;
      //loadLevel(current_level);
      document.querySelector("#input-answer").disabled = true;
      createConfetti();
      form.buttonOk().textContent = 'Próxima';
      form.buttonOk().focus();
  } else {
      alert("Resposta incorreta...  :'(");
  }
}



