// import { prizeItem } from './prizes-list.js';

/*
        // Animação suave ao rolar a página
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
*/
        // Atualização dinâmica da pontuação do usuário
        
//let userScore = 1250;
        /*
        const userScoreElement = document.querySelector('.user-score');
        setInterval(() => {
            userScore += Math.floor(Math.random() * 10);
            userScoreElement.innerHTML = `<span class="animated-lightning">⚡</span> ${userScore}<br><span class="energy-points">pontos de energia</span>`;
        }, 5000);
        */

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}        


let student_id = 0;

const urlParams = new URLSearchParams(window.location.search);
const valor_get = urlParams.get('id');
if (valor_get) {
    student_id = valor_get;
}


user_perfil.load(student[student_id]);
//console.log('Nome: '+user_perfil.displayName);
//console.log('Score: '+user_perfil.accScore());
//console.log('Diamonds: '+user_perfil.accGold());
//console.log('Streak: '+user_perfil.streak());
document.getElementById("user-photo").src = user_perfil.iconSrc;
document.getElementById("display-name").innerText = user_perfil.displayName;
document.getElementById("user-score").innerText = formatNumber( user_perfil.accScore() );
document.getElementById("user-diamonds").innerText = formatNumber( user_perfil.accGold() );
const streak_days = user_perfil.streak();
if (streak_days > 2) {
    document.getElementById("streak-badge").style.display = 'block';
} else {
    document.getElementById("streak-badge").style.display = 'none';
}
document.getElementById("display-streak").innerText = streak_days + " dias seguidos";

const eloUserImgForm = document.getElementById("img-usr-elo");
eloUserImgForm.style.width  = '24px';
eloUserImgForm.style.height = '15px'; 
const eloUserInfo = getEloInfo(user_perfil.accScore());
const nextEloUserInfo = getNextEloInfo(user_perfil.accScore());
eloUserImgForm.src = eloUserInfo[elIcoSrc];
eloUserImgForm.title = eloUserInfo[elName]+' - Ultrapasse '+formatNumber(nextEloUserInfo[elScore])+' pontos para alcançar o nível '+nextEloUserInfo[elName]+'!';

data_display = new Date();
document.getElementById('calendar-title').innerText = mesExtenso[data_display.getMonth()] +' '+data_display.getFullYear();
fillCalendarMap(data_display);
feedHtmlCalendar(data_display);



const formPrizeItem = document.getElementById("prizes-list");
for (let i = 0; i < prizeItem.length; i++) {

    const prizeItemContainer = document.createElement("div");
        prizeItemContainer.className = 'prize-item';
    const prizeItemImg = document.createElement("img");
        prizeItemImg.className = 'prize-photo';
        prizeItemImg.src = prizeItem[i][itemSrc];
        prizeItemImg.alt = prizeItem[i][itemAlt];
    const prizeItemInfo = document.createElement("div");
        prizeItemInfo.className = 'prize-info';      
    const prizeItemName = document.createElement("p");
        prizeItemName.className = 'prize-name';        
        const prizeItemNameText = document.createTextNode(prizeItem[i][itemTitle]);
        prizeItemName.appendChild(prizeItemNameText);
    const prizeItemDescription = document.createElement("p");
        prizeItemDescription.className = 'prize-description';        
        const prizeItemDescriptionText = document.createTextNode(prizeItem[i][itemDescription]);
        prizeItemDescription.appendChild(prizeItemDescriptionText);
    const prizeItemQuantity = document.createElement("p");              
        const prizeItemQuantityText = document.createTextNode("Quantidade: "+prizeItem[i][itemQuantity]);
        prizeItemQuantity.appendChild(prizeItemQuantityText);              
    const prizeItemPoints = document.createElement("p");
        prizeItemPoints.className = 'prize-points';   
    const prizeItemBolt = document.createElement("span");    
        prizeItemBolt.className = 'static-lightning';
        const prizeItemBoltText = document.createTextNode('💎 ');
        const prizeItemPointsText = document.createTextNode(prizeItem[i][itemPoints]+' ');//pontos
        prizeItemPoints.appendChild(prizeItemBoltText);
        prizeItemPoints.appendChild(prizeItemPointsText);

    prizeItemInfo.appendChild(prizeItemName);
    prizeItemInfo.appendChild(prizeItemDescription);
    prizeItemInfo.appendChild(prizeItemQuantity);
    prizeItemInfo.appendChild(prizeItemPoints);
    prizeItemContainer.appendChild(prizeItemImg);
    prizeItemContainer.appendChild(prizeItemInfo);

    formPrizeItem.appendChild(prizeItemContainer);
}





let rankingRow = [];
for (let i = 0; i < student.length; i++) {
    const last_score_index = student[i][studentColScore].length - 1;
    const score_ranking_row = student[i][studentColScore][ last_score_index ][scScore];
    const display_name_ranking_row = student[i][studentColName];
    const icon_src_ranking_row = student[i][studentColSrcIco];    
    rankingRow.push( [display_name_ranking_row, score_ranking_row, icon_src_ranking_row] );
}
rankingRow.sort((a, b) => b[1] - a[1]); //deixa o array na ordem crescente em pontos de energia


const formRanking = document.getElementById("ranking-list");
for (let i = 0; i < rankingRow.length; i++) {
    const   rankingItem = document.createElement("li");
            rankingItem.className = 'ranking-item';
    const   rankingPos = document.createElement("span");
            if (i == 0) {
                rankingPos.className = 'ranking-position gold-medal';
            } else if (i == 1) {
                rankingPos.className = 'ranking-position silver-star';
            } else if (i == 2) {
                rankingPos.className = 'ranking-position bronze-star';
            } else {
                rankingPos.className = 'ranking-position';
            }    
    const   rankingPosText = document.createTextNode(i+1);
            rankingPos.appendChild(rankingPosText);
    const   rankingImg = document.createElement("img");
            rankingImg.className = 'ranking-photo';
            rankingImg.src = rankingRow[i][rrSrc];
            rankingImg.alt = 'Foto de '+rankingRow[i][rrName];
    const   rankingInfo = document.createElement("div");
            rankingInfo.className = 'ranking-info';
    const   rankingName = document.createElement("span");
            rankingName.className = 'ranking-name';
    const   rankingNameText = document.createTextNode(rankingRow[i][rrName]);
            rankingName.appendChild(rankingNameText);
    const   rankingPoints = document.createElement("span");
            rankingPoints.className = 'ranking-score prize-points';
    const   rankingBolt = document.createElement("span");
            rankingBolt.className = 'static-lightning';
    const   rankingBoltText = document.createTextNode("⚡");
            rankingBolt.appendChild(rankingBoltText);
            rankingPoints.appendChild(rankingBolt);
    const   rankingPointsText = document.createTextNode( formatNumber( rankingRow[i][rrScore] )+" "); //pontos
            rankingPoints.appendChild(rankingPointsText);            





    const   eloImg = document.createElement("img");
    eloImg.className = '';
    eloImg.src = getEloInfo(rankingRow[i][rrScore])[elIcoSrc];
    eloImg.title = getEloInfo(rankingRow[i][rrScore])[elName];
    eloImg.style = 'margin-right: 5px;'; // margin-top: 2px;
    eloImg.style.width  = '24px';
    eloImg.style.height = '15px';    
    //eloImg.alt = 'Foto de '+rankingRow[i][rrName];

    const   containerElo = document.createElement("div");
    //containerElo.className = '';
    containerElo.style = 'display: flex; justify-content: left; align-items: center;';    
    containerElo.appendChild(eloImg);
    containerElo.appendChild(rankingName);

    //rankingInfo.appendChild(eloImg);
    //rankingInfo.appendChild(rankingName);

    rankingInfo.appendChild(containerElo);

    rankingInfo.appendChild(rankingPoints);
    rankingItem.appendChild(rankingPos);
    rankingItem.appendChild(rankingImg);
    rankingItem.appendChild(rankingInfo);

    formRanking.appendChild(rankingItem);
}





let progresso_col = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0]
];

//preenche com os ultimos valores de evolução do score
let score_index = user_perfil.score.length-1;
for (let i = progresso_col.length-1; i > -1 ; i--) {
    if (score_index > -1) {
        const pcDate = new Date(user_perfil.score[score_index][scDate]); 
        progresso_col[i][pcMonth] = pcDate.getMonth()+1;
        progresso_col[i][pcDay]   = pcDate.getDate();
        progresso_col[i][pcScore] = user_perfil.score[score_index][scScore];
        score_index--;
    } else {
        progresso_col[i][pcMonth] = -1;
        progresso_col[i][pcDay]   = 0;
        progresso_col[i][pcScore] = 0;        
    }
}

//normaliza os valores, de modo a mostrar a diferença entre o dia atual e o anterior.
for (let i = progresso_col.length-1; i > -1 ; i--) {
    if (i > 0) {
      progresso_col[i][pcScore] -= progresso_col[i-1][pcScore];    
    }
}

function getGraphXLabel(element_col) {
    if (element_col[pcMonth] > -1) {
        const dia = (element_col[pcDay] < 10 ? '0' : '') + element_col[pcDay].toString();
        const mes = (element_col[pcMonth] < 10 ? '0' : '') + element_col[pcMonth].toString();
        return dia +'/'+mes;
    } else {
        return '';
    }
}


       // Gráfico de progresso do usuário
       const ctx = document.createElement('canvas');
       ctx.id = 'progressChart';
       document.querySelector('.user-info').appendChild(ctx);

       new Chart(ctx, {
           type: 'bar',
           data: {
               labels: [getGraphXLabel(progresso_col[1]), getGraphXLabel(progresso_col[2]), getGraphXLabel(progresso_col[3]), getGraphXLabel(progresso_col[4]), getGraphXLabel(progresso_col[5]), getGraphXLabel(progresso_col[6])],
               datasets: [{
                   label: 'Progresso',
                   data: [progresso_col[1][pcScore], progresso_col[2][pcScore], progresso_col[3][pcScore], progresso_col[4][pcScore], progresso_col[5][pcScore], progresso_col[6][pcScore]],
                   borderColor: '#2196F3',
                   tension: 0.1
               }]
           },
           options: {
               responsive: true,
               scales: {
                   y: {
                       beginAtZero: true
                   }
               },
               plugins: {
                   legend: {
                       display: false
                   },
                   title: {
                       display: true,
                       text: 'Progresso',
                       font: {
                           size: 14
                       }
                   }
               }
           }
       });




const containerMaterialApoio = document.createElement("div");
containerMaterialApoio.style = 'display: flex; flex-direction: column; justify-content: left; align-items: flex-start;';

const   elementApoioUrl = document.createElement("a");
elementApoioUrl.href = './parlendas.html';
const   elementApoioUrlText = document.createTextNode('Parlendas');
elementApoioUrl.appendChild(elementApoioUrlText);

const tituloApoio = document.createElement("p");
const tituloApoioText = document.createTextNode('Material de apoio:');
tituloApoio.appendChild(tituloApoioText);
tituloApoio.style = 'margin-top: 10px; margin-bottom: 4px;'

containerMaterialApoio.appendChild(tituloApoio);
containerMaterialApoio.appendChild(elementApoioUrl);

document.querySelector('.user-info').appendChild(containerMaterialApoio);