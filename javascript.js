// Инициализация элементов
const quantityInput = document.getElementById('quantity');
const typeRadios = document.querySelectorAll('input[name="type"]');
const optionsDiv = document.getElementById('options');
const propertiesSelect = document.getElementById('properties');
const resultDiv = document.getElementById('result');

// Базовые цены и данные
const basePrices = {
    type1: 100,
    type2: 150,
    type3: 200
};

const optionsType2 = [
    { name: 'Опция 1', price: 40 },
    { name: 'Опция 2', price: 75 },
    { name: 'Опция 3', price: 110 }
];

const propertiesType3 = [
    { name: 'Свойство 1', price: 30 },
    { name: 'Свойство 2', price: 45 }
];

function getSelectedType() {
    const checked = document.querySelector('input[name="type"]:checked'); // Находим выбранную радио-кнопку
    return checked ? checked.value : null;  //Возвращаем значение или null
}
//Кол-во товара
function parseQuantity() {
    const value = Number(quantityInput.value);
    return value > 0 ? value : 1; // Минимум 1
}
function hideProperties() {
    propertiesSelect.style.display = 'none';
    propertiesSelect.innerHTML = '';
}

// Расчёт стоимости
function calculateCost() {
    const quantity = parseQuantity();
    const selectedType = getSelectedType();

    if (!selectedType) return;

    let totalPrice = basePrices[selectedType] * quantity;

    if (selectedType === 'type2') {
        const checkboxes = optionsDiv.querySelectorAll('input[type="checkbox"]:checked');
        let additionalPrice = 0;
        checkboxes.forEach(cb => {
            const option = optionsType2.find(o => o.name === cb.value); //находим соответствующий объект в массиве optionsType2
            if (option) additionalPrice += option.price;
        });
        totalPrice += additionalPrice * quantity;
    }

    if (selectedType === 'type3') {
        const selectedProperty = propertiesSelect.value;
        const property = propertiesType3.find(p => p.name === selectedProperty);
        if (property) totalPrice += property.price * quantity;
    }

    resultDiv.textContent = `Стоимость: ${totalPrice} руб.`;
}

// Инициализация обработчиков
quantityInput.addEventListener('input', calculateCost);
typeRadios.forEach(radio => radio.addEventListener('change', updateForm));

// Начальная инициализация
updateForm();

// Модифицируем updateForm для более надежного скрытия
function updateForm() {
    const selectedType = getSelectedType();

    if (!selectedType) {
        optionsDiv.innerHTML = '';
        hideProperties();
        resultDiv.textContent = 'Выберите тип услуги';
        return;
    }

    switch (selectedType) {
        case 'type1':
            optionsDiv.innerHTML = '';
            hideProperties();
            break;

        case 'type2':
            //map() — метод массива, создает массив с результатами вызова функции для каждого элемента
            //option => -Принимает каждый объект из optionsType2
            //join(‘’) -Объединяет все созданные строки в одну, пустой аргумент -элементы соединяются без разделителей
            optionsDiv.innerHTML = `
                <div>
                    ${optionsType2.map(option => `
                        <label>
                            <input type="checkbox" value="${option.name}" data-price="${option.price}">
                            ${option.name} (+${option.price} руб.)
                        </label>
                    `).join('')}
                </div>
            `;
            hideProperties();
            break;

        case 'type3':
            propertiesSelect.innerHTML = `
                ${propertiesType3.map(property => `
                    <option value="${property.name}" data-price="${property.price}">
                        ${property.name} (+${property.price} руб.)
                    </option>
                `).join('')}
            `;
            optionsDiv.innerHTML = '';
            propertiesSelect.style.display = 'block';
            break;
    }

    // Перепривязываем обработчики
    const checkboxes = optionsDiv.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.addEventListener('change', calculateCost)); //.forEach-для каждого

    propertiesSelect.addEventListener('change', calculateCost);

    calculateCost();
}
