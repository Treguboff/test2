let my_test_data = [
	{
		"Наименование": "!!!_Новый бар",
		"Код": "00000012608",
		"РодительКод": false,
		"Группа": true,
		"ЭтоБлюдо": false,
		"ЭтоЗапас": false,
		"ЭтоУслуга": false,
		"ЭтоЧленствоПакетУслуг": false
	},
	{
		"Наименование": ".Архив",
		"Код": "00000006471",
		"РодительКод": false,
		"Группа": true,
		"ЭтоБлюдо": false,
		"ЭтоЗапас": false,
		"ЭтоУслуга": false,
		"ЭтоЧленствоПакетУслуг": false
	},
	{
		"Наименование": "Аренда шкафчиков",
		"Код": "00000006035",
		"РодительКод": false,
		"Группа": true,
		"ЭтоБлюдо": false,
		"ЭтоЗапас": false,
		"ЭтоУслуга": false,
		"ЭтоЧленствоПакетУслуг": false
	},
	{
		"Наименование": "Водные программы",
		"Код": "00000013184",
		"РодительКод": false,
		"Группа": true,
		"ЭтоБлюдо": false,
		"ЭтоЗапас": false,
		"ЭтоУслуга": false,
		"ЭтоЧленствоПакетУслуг": false
	},
	{
		"Наименование": "Групповые программы ",
		"Код": "00000005282",
		"РодительКод": false,
		"Группа": true,
		"ЭтоБлюдо": false,
		"ЭтоЗапас": false,
		"ЭтоУслуга": false,
		"ЭтоЧленствоПакетУслуг": false
	},
	{
		"Наименование": "Детский фитнес",
		"Код": "00000013587",
		"РодительКод": false,
		"Группа": true,
		"ЭтоБлюдо": false,
		"ЭтоЗапас": false,
		"ЭтоУслуга": false,
		"ЭтоЧленствоПакетУслуг": false
	},
	{
		"Наименование": "Модификаторы",
		"Код": "00000014569",
		"РодительКод": false,
		"Группа": true,
		"ЭтоБлюдо": false,
		"ЭтоЗапас": false,
		"ЭтоУслуга": false,
		"ЭтоЧленствоПакетУслуг": false
	},
	{
		"Наименование": "Прочий доход (переофоромления, штрафы, парковка)",
		"Код": "00000006046",
		"РодительКод": false,
		"Группа": true,
		"ЭтоБлюдо": false,
		"ЭтоЗапас": false,
		"ЭтоУслуга": false,
		"ЭтоЧленствоПакетУслуг": false
	},
	{
		"Наименование": "Прочий доход БЕЗ НДС",
		"Код": "00000014985",
		"РодительКод": false,
		"Группа": true,
		"ЭтоБлюдо": false,
		"ЭтоЗапас": false,
		"ЭтоУслуга": false,
		"ЭтоЧленствоПакетУслуг": false
	},
	{
		"Наименование": "Солярий",
		"Код": "00000006024",
		"РодительКод": false,
		"Группа": true,
		"ЭтоБлюдо": false,
		"ЭтоЗапас": false,
		"ЭтоУслуга": false,
		"ЭтоЧленствоПакетУслуг": false
	},
	{
		"Наименование": "СПА",
		"Код": "00000005095",
		"РодительКод": false,
		"Группа": true,
		"ЭтоБлюдо": false,
		"ЭтоЗапас": false,
		"ЭтоУслуга": false,
		"ЭтоЧленствоПакетУслуг": false
	},
	{
		"Наименование": "Тренажёрный зал",
		"Код": "00000005051",
		"РодительКод": false,
		"Группа": true,
		"ЭтоБлюдо": false,
		"ЭтоЗапас": false,
		"ЭтоУслуга": false,
		"ЭтоЧленствоПакетУслуг": false
	},
	{
		"Наименование": "Чистая форма",
		"Код": "00000006043",
		"РодительКод": false,
		"Группа": true,
		"ЭтоБлюдо": false,
		"ЭтоЗапас": false,
		"ЭтоУслуга": false,
		"ЭтоЧленствоПакетУслуг": false
	},
	{
		"Наименование": "Членства",
		"Код": "00000005775",
		"РодительКод": false,
		"Группа": true,
		"ЭтоБлюдо": false,
		"ЭтоЗапас": false,
		"ЭтоУслуга": false,
		"ЭтоЧленствоПакетУслуг": false
	}
];

/* точка отображения */
const content_ = document.querySelector('.content');
content_.innerHTML = "";

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
  const serviceData = my_test_data;

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
          window.location.href = 'menu.html';
        }
  
      }
  
      const h1 = document.createElement('h1');
      h1.textContent = el.Наименование;
  
      const h2 = document.createElement('h2');
      h2.textContent = el.Группа;
  
      const p = document.createElement('h2');
      p.textContent = el.Код;
  
      menu_parent = el.РодительКод;
  
      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(h2);
      card.appendChild(p);

    })
  }

  function displayPagination(arrData, qtyPerPage) {
    const paginationEl = document.querySelector('.pagination');
    const pagesCount = Math.ceil(arrData.length / qtyPerPage);
    const ulEl = document.createElement("ul");
    ulEl.classList.add('pagination__list');

    for (let i = 0; i < pagesCount; i++) {
      const liEl = displayPaginationBtn(i + 1);
      ulEl.appendChild(liEl)
    }
    paginationEl.appendChild(ulEl)
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