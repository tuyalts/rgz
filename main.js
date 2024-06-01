// Объект с курсами 2-х валют
const rates = {};
// Элементы для отображения курса валют
const elementSGD = document.querySelector('[data-value="SGD"]');
const elementRUB = document.querySelector('[data-value="RUB"]');
// Элементы формы, ввод суммы, выбор валюты, поле с результатом
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select1 = document.getElementById('exampleFormControlSelect1');
const select2 = document.getElementById('exampleFormControlSelect2');

getCurrencies();

// Функция получения курса валют и отоюражения их на странице
async function getCurrencies() {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;

    rates.EUR = result.Valute.EUR;
    rates.SGD = result.Valute.SGD;

    elementSGD.textContent = rates.SGD.Value.toFixed(2);
    elementRUB.textContent = rates.EUR.Value.toFixed(2);
}

// Слушаем изменения в текстовом поле и select
input.oninput = convertValue;
select1.oninput = convertValue;
select2.oninput = convertValue;

// Функция конвертации
function convertValue() {    
    if(select1.value == select2.value)
    {
        result.value = input.value
    }
    else if(select1.value == 'RUB')
    {
        result.value = (parseFloat(input.value) * rates[select2.value].Value).toFixed(2)
    }
    else
    {
        result.value = (parseFloat(input.value) / rates[select1.value].Value).toFixed(2)

    }
}