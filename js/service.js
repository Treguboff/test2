
/* точка отображения */
const content_ = document.querySelector('.content');
content_.innerHTML = "";

let menu_parent = 'false';

/* функция загрузки API */
async function get_Data(url) {

	if (url == "false") {
		url = "http://localhost/Test_DB/hs/term/v1/menu";
	}

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Authorization': "Basic " + btoa((unescape(encodeURIComponent('Integration:Qazxcv135')))),
			'Content-Type': 'application/json'
		}
	});
	const data = await response.json();
	return data;
}

/* главная функция */
async function get(container, url) {

	let currentPage = 1;
	let qty = 9; //на экране 9 кнопок товаров (3х3)

	//const serviceData = await get_Data(url);
	const serviceData = schedule_data;

	function displayList(arrData, qtyPerPage, page) {
		page--;
		const content_ = document.querySelector('.content');
		content_.innerHTML = "";

		const start = qtyPerPage * page;

		const end = start + qtyPerPage;
		const paginatedData = arrData.slice(start, end);

		paginatedData.forEach((el) => {

			const card = document.createElement('div');
			card.setAttribute('class', 'card');

			card.onclick = function () {

				var isFolder = card.childNodes[1].textContent;//true
				var codeCard = card.childNodes[2].textContent;//code

				if (isFolder == "true") {
					//удалим старую структуру и перестроим ее
					container.innerHTML = "";

					const pag = document.querySelector('.pagination');

					pag.innerHTML = "";

					get(container, "http://localhost/Test_DB/hs/term/v1/menu?parent_code=" + codeCard);
				} else {
					//выбор конечного элемента
					window.location.href = 'index.html';
				}

			}

			const name_ = document.createElement('div');
			name_.setAttribute('class', 'name_')
			name_.textContent = el.Наименование;

			const isFolder_ = document.createElement('div');
			isFolder_.setAttribute('class', 'isFolder_')
			isFolder_.textContent = el.Группа;

			const code_ = document.createElement('div');
			code_.setAttribute('class', 'code_')
			code_.textContent = el.Код;

			menu_parent = el.РодительКод;

			container.appendChild(card);
			card.appendChild(name_);
			card.appendChild(isFolder_);
			card.appendChild(code_);

		})
	}

	function displayPagination(arrData, qtyPerPage) {
		const paginationEl = document.querySelector('.pagination');
		const pagesCount = Math.ceil(arrData.length / qtyPerPage);

		const b1 = document.createElement("button");
		b1.setAttribute('class', 'c-button');
		b1.onclick = function () {

			container.innerHTML = "";
			paginationEl.innerHTML = "";

			if (menu_parent=="false"){
				get(container,"http://localhost/Test_DB/hs/term/v1/menu");
			} else {
				get(container,"http://localhost/Test_DB/hs/term/v1/menu?parent_code=" + menu_parent);
			}			
		};

		const text_b1 = document.createElement("h2");
		text_b1.textContent = 'Назад';
		b1.appendChild(text_b1);
		paginationEl.appendChild(b1);

		const ulEl = document.createElement("ul");
		ulEl.classList.add('pagination__list');
		for (let i = 0; i < pagesCount; i++) {

			const liEl = displayPaginationBtn(i + 1);
			ulEl.appendChild(liEl)

		}
		paginationEl.appendChild(ulEl);

		const b2 = document.createElement("button");
		b2.setAttribute('class', 'c-button');
		b2.onclick = function () {
			window.location.href = 'menu.html';
		};

		const text_b2 = document.createElement("h2");
		text_b2.textContent = 'В меню';
		b2.appendChild(text_b2);
		paginationEl.appendChild(b2);
	}

	function displayPaginationBtn(page) {
		const liEl = document.createElement("li");
		liEl.classList.add('pagination__item')
		liEl.innerText = page

		if (currentPage == page) liEl.classList.add('pagination__item--active');

		liEl.addEventListener('click', () => {
			currentPage = page
			displayList(serviceData, qty, currentPage)

			let currentItemLi = document.querySelector('li.pagination__item--active');
			currentItemLi.classList.remove('pagination__item--active');

			liEl.classList.add('pagination__item--active');
		})

		return liEl;
	}

	/*отражение таблицы товаров*/
	displayList(serviceData, qty, currentPage);

	/* отражение страниц товаров*/
	displayPagination(serviceData, qty);

}

get(content_, "false"); //первоначальное меню