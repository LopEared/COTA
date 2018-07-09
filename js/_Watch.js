function startTime() {
	// Задаем  переменной сегодняшнюю дату
    var today = new Date();
    
	//Определяем год, месяц, день сегодняшней даты в локальном формате
    var yy = today.getFullYear();
    var mm = today.getMonth()+1;
    var dd = today.getDate();
    //Определяем час, минуту, секунду сегодняшней даты в локальном формате
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
	//Определяем год, месяц, день сегодняшней даты и час в UTC формате
	var u_yy = today.getUTCFullYear();
    var u_mm = today.getUTCMonth()+1;
    var u_dd = today.getUTCDate();
    var u_h = today.getUTCHours();
	
    // Добавляем нолик если число меньше 10
    mm = checkTime(mm);
    dd = checkTime(dd);
    h = checkTime(h);
	m = checkTime(m);
    s = checkTime(s);
		
    u_mm = checkTime(u_mm);
    u_dd = checkTime(u_dd);
	u_h = checkTime(u_h);
		
	var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var n = weekday[today.getDay()];

	var r_weekday = new Array(7);
    r_weekday[0] = "Воскресенье";
    r_weekday[1] = "Понедельник";
    r_weekday[2] = "Вторник";
    r_weekday[3] = "Среда";
    r_weekday[4] = "Четверг";
    r_weekday[5] = "Пятница";
    r_weekday[6] = "Суббота";

    var r_n = r_weekday[today.getDay()];
	
	// Определяем сутки полета
	var CountDay = Math.trunc((Date.now() - Date.parse("January 15, 2016"))/86400000);	// 86400000 - кол-во миллисекунд в одном дне.
	
	// Записываем наши даты, время, название дня недели в  ячейки таблицы часов
	document.getElementById('u_date').innerHTML =u_yy + "-" + u_mm + "-" + u_dd;		//
	document.getElementById('u_time').innerHTML =u_h + ":" + m + ":" + s;				//
	document.getElementById('u_date_n').innerHTML =n;									//
																						//  Таблица часов на навигационной строке
	document.getElementById('bl_date').innerHTML =yy + "-" + mm + "-" + dd;				//
	document.getElementById('bl_time').innerHTML =h + ":" + m + ":" + s;				//
	document.getElementById('bl_date_n').innerHTML =r_n;								//
	
	document.getElementById('su_date').innerHTML =u_yy + "-" + u_mm + "-" + u_dd;		//
	document.getElementById('su_time').innerHTML =u_h + ":" + m + ":" + s;				//
	document.getElementById('su_date_n').innerHTML =n;									//
																						//	Таблица часов на масштабируемой сцене
	document.getElementById('sbl_date').innerHTML =yy + "-" + mm + "-" + dd;			//
	document.getElementById('sbl_time').innerHTML =h + ":" + m + ":" + s;				//
	document.getElementById('sbl_date_n').innerHTML =r_n;								//
	
	// Вписываем значения в счетчик дней полета КА										
	document.getElementById('CountDay_NaviBar').innerHTML = CountDay + " - сутки полета";		//		
	document.getElementById('CountDay_Scene').innerHTML = CountDay + " - сутки полета";			//
	document.getElementById('TimeCountDay').innerHTML = h + ":" + m + ":" + s;					//
		
	// Вписываем дату в таблицу смены													
	document.getElementById('TabDay').innerHTML = dd + "-" + mm + "-" + yy;				//
	// Время обновления наших часов (через вызов функции с заданным интервалом 500)		//
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}