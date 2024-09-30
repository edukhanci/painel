
var user_perfil = {    
    displayName: "",
    userName: "",
    iconSrc: "",
    score: [],
    spent: [],
    bonus: [],
    attendance: [],
    accScore: function(){},
    accGold: function(){},
    accBonus: function(){},
    accSpent: function(){},
    streak: function(){},
    load: function(){}
}

function loadUser(perfil) {
    this.displayName = perfil[studentColName];
    this.userName = perfil[studentColUserName];
    this.iconSrc = perfil[studentColSrcIco];
    this.score = perfil[studentColScore];
    this.spent = perfil[studentColSpent];
    this.bonus = perfil[studentColBonus];
    this.attendance = perfil[studentColAttendance];
}
user_perfil.load = loadUser;

function getScore() {
    const last_score_index = this.score.length - 1;
    return this.score[ last_score_index ][scScore];    
}
user_perfil.accScore = getScore;

function getStreak() {
    let att_counter = 0;
    for (let i = 0; i < this.attendance.length; i++) {
        if (this.attendance[i][scaValue] > 0) {
            att_counter++;
        } else {
            att_counter = 0;
        }
    }
    return att_counter;
}
user_perfil.streak = getStreak;

function getSpent() {
    let sum = 0;
    for (let i = 0; i < this.spent.length; i++) {
        sum += this.spent[i][scScore];        
    }
    return sum;
}
user_perfil.accSpent = getSpent;

function getBonus() {
    let sum = 0;
    for (let i = 0; i < this.bonus.length; i++) {
        sum += this.bonus[i][scScore];        
    }
    return sum;
}
user_perfil.accBonus = getBonus;

function getGold() {
    return ( this.accScore() + this.accBonus() - this.accSpent() );
}
user_perfil.accGold = getGold;

function getDayState(day_str) {
    const data_referencia = new Date(day_str);

    
    

    for (let i = 0; i < user_perfil.attendance.length; i++) {
        const data_ocorrencia = new Date(user_perfil.attendance[i][scDate]);        
        if (
            (data_ocorrencia.getFullYear() == data_referencia.getFullYear()) &&
            (data_ocorrencia.getMonth() == data_referencia.getMonth()) &&
            (data_ocorrencia.getDate() == data_referencia.getDate())
        ) {
            return user_perfil.attendance[i][scaValue];
        }
    }    
    return -1;
}