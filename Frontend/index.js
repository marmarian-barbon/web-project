// JSDoc комментарии писать не обязательно; тут они даны только для удобства чтения с IDE.

// Сначала JS считает и запишет функцию в переменную personToHtml, которая может переводить объект (представляющий собой человека) в HTML верстку.

/**
 * @param {{id: number, first_name: string, last_name: string}} person
 * @returns {string}
 */
function personToHtml(person) {
	return `<div class="person" id="person-${person.id}">
		<div class="person__field field">
			<label class="field__title">Имя: </label>
			<span class="field__value">${person.first_name}</span>
		</div>

		<div class="person__field field">
			<label class="field__title">Фамилия: </label>
			<span class="field__value">${person.last_name}</span>
		</div>
	</div>`;
}

// Потом, на окно браузера window навесится обработчик по событию прогрузки load.
// Для функции-обработчика не нужны переменные, поэтому "()".

window.addEventListener('load', () => {
	// Все, что здесь находится, выполнится только тогда, когда бравзер обработает всю страницу и окно будет прогружено.

	// Создается новый объект для отправки XHR.
	const xhr = new XMLHttpRequest();

	// На поле onload добавляется функция, которая вызовется позже, когда в xhr прилетит ответ.
	xhr.onload = () => {
		// Все, что здесь находится, выполнится только тогда, когда прилетит ответ (т.е. когда-то после того, как будет отправлен запрос и сервер его обработает).

		// Ответ разбирается как JSON и сохраняется в переменную persons.
		/** @type {Array<{id: number, first_name: string, last_name: string}>} */
		const persons = JSON.parse(xhr.response);

		// В HTML документе выбираем элемент с тегом body.
		const body = document.querySelector('body');

		// Внутрь этого элемента ставим HTML верстку, обработав массив persons:
		body.innerHTML = persons

			// фильтруются только те элементы, у которых есть поля id, first_name и last_name;
			// (внутри метода filter необходимо указать функцию, у которой есть аргумент под элемент массива, и которая выдает boolean значение)
			// (будет создан массив только тех начальных элементов, от которых функция выдала true)
			// (поле с пустым значением будет неявно преобразовываться в false)
			.filter(person => (person.id || person.id === 0) && person.first_name && person.last_name)

			// элементы переводятся в HTML верстку;
			// (внутри метода map необходимо указать функцию, у которой есть аргумент под элемент массива, и которая выдает какой-либо результат)
			// (будет создан массив полученных результатов)
			// (в переменной personToHtml как раз находится функция с нужной сигнатурой, результатом которой будет строка (HTML верстка))
			.map(personToHtml)

			// весь массив, как массив строк, объединится через пустую строку.
			.join('');
	};

	// Устанавливается метод GET persons.
	xhr.open('GET', 'http://localhost:3000/persons');

	// Отправляется тело запроса.
	// Т.к. глагол метода = GET, то тело пустое.
	xhr.send();
});
