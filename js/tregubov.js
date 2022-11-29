
create_ul_event();

function get(url){
	var res = [];
	var request = new XMLHttpRequest();
	request.withCredentials = true;
		
	request.open('GET', url, false);
	request.setRequestHeader("Authorization", "Basic " + btoa((unescape(encodeURIComponent('Integration:Qazxcv135')))));
	request.setRequestHeader("Content-Type", "application/json");	
	request.setRequestHeader("apikey", "c00d2e88-ab29-4376-b93c-5a235c9faed2");	
	
	request.onload = function () {
		// Begin accessing JSON data here
		var data = JSON.parse(this.response);
		if (request.status >= 200 && request.status < 400) {
			
			res = data.data;

		} else {
			const errorMessage = document.createElement('marquee');
			errorMessage.textContent = "Gah, it's not working!";
			app.appendChild(errorMessage);
		}
	}
	request.send(null);
	return res;
}

function random_color(){
	return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
}

function create_ul_event(){
	
	//var arr = get("http://localhost/Test_DB/hs/api_terfit/v3/classes/?start_date=2022-10-13 06:00&end_date=2022-10-13 23:59&service_id=&employee_id=&club_id=f2509711-6397-11e5-8ff2-00155d019d02");
	arr = test.data;

	const arrayUniqueByKey_room = [...new Map(arr.map(item => [item.room.id, item])).values()];
	
	var all_event = [];
	var Node_event = function(ID){
		this.id = ID;
		this.color = random_color(); 
	}
	const arrayUniqueByKey_service  = [...new Map(arr.map(item => [item.service.id, item])).values()];
	arrayUniqueByKey_service.forEach(ser => {
		all_event.push(new Node_event(ser.service.id));
	});
		
	//console.log(all_event);

	// Создать основной список событий
	const events = document.getElementById('events');
	var ul = document.createElement('ul');
	events.appendChild(ul);

	//arrayUniqueByKey_room.forEach(element => {
	for (let i = 0; i < 5; i++){	
		
		var el = arrayUniqueByKey_room[i];		
		//создать элемент списка - помещение
		var li_room = document.createElement('li');
		li_room.setAttribute('class', 'events-group');
		ul.appendChild(li_room);

		//пишем название помещения
		var div_ = document.createElement('div');
		div_.setAttribute('class', 'top-info');
		//div_.innerHTML = el.room.title;
		li_room.appendChild(div_);
		
		var sp = document.createElement('span');
		sp.innerHTML = el.room.title;
		div_.appendChild(sp);

		//список событий для данного помещения
		var ul2 = document.createElement('ul');
		li_room.appendChild(ul2);

		//все записи по данному помещению в этом дне
		var array_room_event = arr.filter(e => e.room.id === el.room.id);
		array_room_event.forEach(ev => {

		var start 		= get_time(ev.start_date);
		var end 		= get_time(ev.end_date);		
		var name_event 	= ev.service.title;
		var obj = all_event.find(o => o.id === ev.service.id);
		var color = obj.color;
		//console.log(color);

			//создать событие в данном помещении
			var li_event = document.createElement('li');
			li_event.setAttribute('class', 'single-event');
			li_event.setAttribute('data-start',start);
			li_event.setAttribute('data-end',end);
			li_event.setAttribute('data-content','event-yoga_'); 	//ССЫЛКА НА СТРАНИЦУ С ОПИСАНИЕМ ЗАНЯТИЯ
			li_event.setAttribute('data-event','event-1');
			
			li_event.style.background = color; //мой цвет
			
			ul2.appendChild(li_event);

			//ссылочная кнопка на событие
			var a = document.createElement('a');
			a.setAttribute("href", "#0");
			li_event.appendChild(a);

			//с названием события
			var em = document.createElement('em');
			em.setAttribute('class', 'event-name');
			em.innerHTML = name_event;
			a.appendChild(em);
		
		});
	}
}

function get_time(str){
	var time="";
	if ((str.length > 0) && (str.includes(" "))) {
		time = str.slice(str.indexOf(" ")+1);			
	}
	return time;
}
