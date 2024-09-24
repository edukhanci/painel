
        // Animação suave ao rolar a página
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Atualização dinâmica da pontuação do usuário
        
        let userScore = 1250;
        /*
        const userScoreElement = document.querySelector('.user-score');
        setInterval(() => {
            userScore += Math.floor(Math.random() * 10);
            userScoreElement.innerHTML = `<span class="animated-lightning">⚡</span> ${userScore}<br><span class="energy-points">pontos de energia</span>`;
        }, 5000);
        */

        // Gráfico de progresso do usuário
        const ctx = document.createElement('canvas');
        ctx.id = 'progressChart';
        document.querySelector('.user-info').appendChild(ctx);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Progresso',
                    data: [300, 600, 900, 1100, 1250, userScore],
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


const itemTitle         = 0;
const itemDescription   = 1;
const itemQuantity      = 2;
const itemPoints        = 3;
const itemSrc           = 4;
const itemAlt           = 5;

const prizeItem = [
    [   
        'Uno!',
        'Um clássico jogo de cartas.',
        '5',
        '500',
        './imgs/prizes/uno.webp',
        'Uno'
    ],
    [   
        'Bombom',
        'Uma unidade do bombom a sua escolha.',
        '10',
        '100',
        './imgs/prizes/bombons.jpg',
        'Bombons Sortidos'
    ]    
]

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
        const prizeItemBoltText = document.createTextNode('⚡ ');
        const prizeItemPointsText = document.createTextNode(prizeItem[i][itemPoints]+' pontos');
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





const rrName    = 0;
const rrScore   = 1;
const rrSrc     = 2;

const rankingRow = [
    [           
        'Maria Oliveira',
        '2500',
        './imgs/avatars/area-52-purple.svg'
    ],
    [           
        'Pedro Santos',
        '2000',
        './imgs/avatars/aqualine-seed.svg'
    ],
    [           
        'Ana Rodrigues',
        '1500',
        './imgs/avatars/blobby-purple.svg'
    ],
    [           
        'Lucas Ferreira',
        '500',
        './imgs/avatars/eggleston-green.svg'
    ]
]


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
    const   rankingPosText = document.createTextNode(i);
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
    const   rankingPointsText = document.createTextNode(rankingRow[i][rrScore]+" pontos");
            rankingPoints.appendChild(rankingPointsText);

    rankingInfo.appendChild(rankingName);
    rankingInfo.appendChild(rankingPoints);
    rankingItem.appendChild(rankingPos);
    rankingItem.appendChild(rankingImg);
    rankingItem.appendChild(rankingInfo);

    formRanking.appendChild(rankingItem);
}

