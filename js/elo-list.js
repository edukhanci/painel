const eloList = [
    ['Pintinho'                 , './imgs/elos/littlechick.png'                 ,  0],
    ['Martelo de Madeira'       , './imgs/elos/woodenaxe.png'                   ,  25000],
    ['Martelo Duplo de Madeira' , './imgs/elos/doublewoodenaxe.png'             ,  50000],
    ['Martelo de Pedra'         , './imgs/elos/stoneaxe.png'                    ,  100000],
    ['Martelo Duplo de Pedra'   , './imgs/elos/doublestoneaxe.png'              ,  140000],
    ['Machado de Metal'         , './imgs/elos/metalaxe.png'                    ,  250000],
    ['Machado Duplo de Metal'   , './imgs/elos/doublemetalaxe.png'              ,  300000],
    ['Machado de Prata'         , './imgs/elos/silveraxe.png'                   ,  350000],
    ['Machado Duplo de Prata'   , './imgs/elos/doublesilveraxe.png'             ,  400000],
    ['Machado de Ouro'          , './imgs/elos/goldenaxe.png'                   ,  450000],
    ['Machado Duplo de Ouro'    , './imgs/elos/doublegoldenaxe.png'             ,  500000],
    ['Lábris de Metal'          , './imgs/elos/doublesidedaxe.png'              ,  550000],
    ['Lábris de Metal+'         , './imgs/elos/doublesidedaxeplus.png'          ,  600000],
    ['Lábris de Prata'          , './imgs/elos/doublesidedsilveraxe.png'        ,  650000],
    ['Lábris de Prata+'         , './imgs/elos/doublesidedsilveraxeplus.png'    ,  700000],
    ['Lábris de Ouro'           , './imgs/elos/doublesidedgoldenaxe.png'        ,  750000],
    ['Lábris de Ouro+'          , './imgs/elos/doublesidedgoldenaxeplus.png'    ,  800000],
    ['Cetro Violeta'            , './imgs/elos/violetwand.png'                  ,  850000],
    ['Cetro Azul'               , './imgs/elos/bluewand.png'                    ,  900000],
    ['Cetro Vermelho'           , './imgs/elos/redwand.png'                     ,  950000]
];

function getEloInfo(user_score) {
    let elo = eloList[0];
    for (let i = 0; i < eloList.length ; i++) {
        if (user_score > eloList[i][elScore]) {
            elo = eloList[i];
        }
    }
    return elo;
}

function getNextEloInfo(user_score) {
    let elo = eloList[0];
    let nextElo = 0;
    for (let i = 0; i < eloList.length ; i++) {
        if (user_score > eloList[i][elScore]) {
            elo = eloList[i];
            nextElo++;
        }
    }
    if (eloList.length > nextElo) {
        return eloList[nextElo];
    }
    return eloList[eloList.length - 1 ];
        
}
