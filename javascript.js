// Инициализация элементов
const quantityInput = document.getElementById('quantity'); // Получаем элемент ввода количества
const typeRadios = document.querySelectorAll('input[name="type"]'); // Получаем все радиокнопки выбора типа
const optionsDiv = document.getElementById('options'); // Контейнер для опций типа 2
const propertiesDiv = document.getElementById('properties'); // Контейнер для свойств типа 3
const resultDiv = document.getElementById('result'); // Элемент для вывода итоговой стоимости


// Базовые цены и динамические массивы
const basePrices = {
    type1: 100,
    type2: 150,
    type3: 200
};

// Массив опций для типа 2
const optionsType2 = [
    { name: 'Опция 1', price: 40 },
    { name: 'Опция 2', price: 75 },
    { name: 'Опция 3', price: 110 }
];

// Массив свойств для типа 3
const propertiesType3 = [
    { name: 'Свойство 1', price: 30 },
    { name: 'Свойство 2', price: 45 }
];

// Функция динамического обновления формы
function updateForm() {
    const selectedType = document.querySelector('input[name="type"]:checked').value; // Получаем выбранный тип услуги

    if (selectedType === 'type1') {
        optionsDiv.innerHTML = ''; // Очищаем контейнер опций
        propertiesDiv.innerHTML = ''; // Очищаем контейнер свойств
    } else if (selectedType === 'type2') {
        // Генерируем радиокнопки для опций (div)
         // Показываем название и цену опции(в label)
        optionsDiv.innerHTML = `
            <div> 
            
                ${optionsType2.map((option, index) => `     
                    <label>
                        <input type="radio" name="optionType2" value="${option.name}" onchange="calculateCost()"> ${option.name} (+${option.price} руб.) 
                    </label>
                `).join('')}
            </div>
        `;
        propertiesDiv.innerHTML = ''; // Очищаем контейнер свойств
    } else if (selectedType === 'type3') {
        optionsDiv.innerHTML = ''; // Очищаем контейнер опций
        // Генерируем чекбоксы для свойств
        propertiesDiv.innerHTML = `
            ${propertiesType3.map(property => ` 
                <label>
                    <input type="checkbox" onchange="calculateCost()" value="${property.name}"> ${property.name} (+${property.price} руб.)
                </label>
            `).join('')}
        `;
    }
    calculateCost(); // Пересчитываем стоимость
}
// Функция пересчёта стоимости
function calculateCost() {
    const quantity = parseInt(quantityInput.value) || 1; // Получаем количество, по умолчанию 1
    const selectedType = document.querySelector('input[name="type"]:checked').value; // Получаем выбранный тип
    let totalPrice = basePrices[selectedType] * quantity; // Базовая цена умноженная на количество

    // Обработка опций для типа 2
    if (selectedType === 'type2') {
        const selectedOption = document.querySelector('input[name="optionType2"]:checked'); // Получаем выбранную опцию
        if (selectedOption) {
            const optionName = selectedOption.value; // Получаем название опции
            const option = optionsType2.find(o => o.name === optionName); // Находим объект опции
            if (option) { 
                totalPrice += option.price * quantity; // Добавляем цену опции к общей стоимости
            }
        }
    }
    // Обработка свойств для типа 3
    if (selectedType === 'type3') {
        const checkboxes = propertiesDiv.querySelectorAll('input[type="checkbox"]'); // Получаем все чекбоксы свойств
        let additionalPrice = 0; // Инициализируем дополнительную стоимость

        checkboxes.forEach(checkbox => { // Для каждого чекбокса
            if (checkbox.checked) { // Если чекбокс отмечен
                const propertyName = checkbox.value; // Получаем название свойства
                const property = propertiesType3.find(p => p.name === propertyName); // Находим объект свойства
                if (property) { // Если свойство найдено
                    additionalPrice += property.price; // Добавляем его цену к дополнительной стоимости
                }
            }
        });
        totalPrice += additionalPrice * quantity; // Добавляем общую стоимость свойств к итоговой цене
    }

    resultDiv.textContent = `Стоимость: ${totalPrice} руб.`; // Выводим итоговую стоимость
}

// Обработчики событий
quantityInput.addEventListener('input', calculateCost); // При изменении количества пересчитываем стоимость
typeRadios.forEach(radio => radio.addEventListener('change', updateForm)); // При смене типа обновляем форму

// Инициализация
updateForm(); // При загрузке страницы обновляем форму
