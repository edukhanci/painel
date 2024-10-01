
//ano:yyyy, mes:1..12, dia:1..31, tipo:0..1(mês de interesse), status: 0..2(sem aula, presente, faltou)
let calendar_map = 
[
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []]                    
];

function clearCalendarMap(){
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 6; j++) {
            for (let k = 0; k < 4; k++) {
                calendar_map[j][i][k] = 0; 
            }
        }
    }
}

function iso8661(year_number, month_number, day_number) {
    const year_str  = year_number.toString();
    const month_str = month_number > 9 ? month_number.toString() : ('0'+month_number.toString()) ;
    const day_str   = day_number   > 9 ? day_number.toString()   : ('0'+day_number.toString()  ) ;
    return year_str+'-'+month_str+'-'+day_str;
}

function fillCalendarMap(selectedDate) {
    //preenche o mapeamento do calendário, com os dias do mês de interesse, e
    //continua preenchendo até encerrar a matriz com o mês seguinte.    
    data_auxiliar = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    primeiro_dia_semana = data_auxiliar.getDay();
    for (let j = 0; j < 6; j++) {
        for (let i = 0; i < 7; i++) {
            if ((j==0) && (i >= primeiro_dia_semana)) {
                calendar_map[j][i] = [data_auxiliar.getFullYear(), data_auxiliar.getMonth()+1, data_auxiliar.getDate(), 0];             
                data_auxiliar.setDate(data_auxiliar.getDate()+1);
            } else if (j > 0) {
                calendar_map[j][i] = [data_auxiliar.getFullYear(), data_auxiliar.getMonth()+1, data_auxiliar.getDate(), 0]; 
                data_auxiliar.setDate(data_auxiliar.getDate()+1);
            }
            
        }
    }

    //preenche o mapeamento restante com os dias antes do dia um, referente ao mes de interesse.
    data_auxiliar = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0);        
    const ultimo_dia_mes = data_auxiliar.getDate();    
    data_auxiliar = new Date(selectedDate.getFullYear(), selectedDate.getMonth()-1, ultimo_dia_mes);        
    for (let i = primeiro_dia_semana; i >= 0; i--) {
        if (i < primeiro_dia_semana) {
            calendar_map[0][i] = [data_auxiliar.getFullYear(), data_auxiliar.getMonth()+1, data_auxiliar.getDate(), 0];             
            data_auxiliar.setDate(data_auxiliar.getDate()-1);
        }    
    }
}

//alimenta (html) o calendário com o mapeamento feito.
function feedHtmlCalendar(selectedDate) {
    const hoje = new Date();
    const selectedMonth = selectedDate.getMonth()+1;
    const selectedYear = selectedDate.getFullYear();

    for (let j = 0; j < 6; j++) {
        for (let i = 0; i < 7; i++) {
            let calendar_cell = document.getElementById("c"+ j.toString() + i.toString());            
            calendar_cell.innerText = calendar_map[j][i][cmDay];            
            calendar_cell.style = '';
            calendar_cell.classList = '';
            /*
            if ("c"+ j.toString() + i.toString() == "c00") {
                console.log(calendar_map[0][0]);
                console.log(selectedMonth);
                console.log(selectedYear);
            }
            */
            if (
                (calendar_map[j][i][cmMonth] == selectedMonth) &&
                (calendar_map[j][i][cmYear] == selectedYear)
            ) {
                
            } else {
                //se entrou aqui, pinta o fundo da celula, indicando que não é o mês de interesse.
                calendar_cell.classList.add('other-month');                
            }
            
            if ( 
                (calendar_map[j][i][cmYear] == hoje.getFullYear()) &&
                (calendar_map[j][i][cmMonth] == (hoje.getMonth()+1)) &&
                (calendar_map[j][i][cmDay] == hoje.getDate()) 
            ) { 
                //se entrou aqui, significa que trata-se de hoje, e destacará o dia.
                calendar_cell.classList.add('highlighted-day');
            }

            //getDayState -> user-perfil.js
            const presenca = getDayState(iso8661(calendar_map[j][i][cmYear], calendar_map[j][i][cmMonth], calendar_map[j][i][cmDay]) ); 
            if (presenca == 0) {
                calendar_cell.classList.add('calendar-block-background');
            } else if (presenca == 1) {
                calendar_cell.classList.add('calendar-streak-background');
            }
        }
    }
    //console.log(calendar_map);
}


function calendarPrev(event) {    
    event.preventDefault();
    let month = data_display.getMonth();
    let year = data_display.getFullYear();
    month--;
    if (month < 0) { //o primeiro mês, é o mês "0"
        month = 11;
        year--;
    }
    data_display = new Date(year, month, 1);

    document.getElementById('calendar-title').innerText = mesExtenso[data_display.getMonth()] +' '+data_display.getFullYear();
    clearCalendarMap();
    fillCalendarMap(data_display);
    feedHtmlCalendar(data_display);    
}

function calendarNext(event) {
    event.preventDefault();
    let month = data_display.getMonth();
    let year = data_display.getFullYear();
    month++;
    if (month > 11) { //o primeiro mês, é o mês "0"
        month = 0;
        year++;
    }
    data_display = new Date(year, month, 1);

    document.getElementById('calendar-title').innerText = mesExtenso[data_display.getMonth()] +' '+data_display.getFullYear();
    clearCalendarMap();
    fillCalendarMap(data_display);
    feedHtmlCalendar(data_display);    
}

function calendarToday(event) {
    event.preventDefault();
    data_display = new Date();

    document.getElementById('calendar-title').innerText = mesExtenso[data_display.getMonth()] +' '+data_display.getFullYear();
    clearCalendarMap();
    fillCalendarMap(data_display);
    feedHtmlCalendar(data_display);    
}