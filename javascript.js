document.addEventListener('DOMContentLoaded', function() { // Этот код выполнится, когда DOM будет готов
    const calculateBtn = document.getElementById('calculateBtn'); // Получаю кнопку по ID
    const quantityInput = document.getElementById('quantity'); // Получаю поле ввода количества
    const productSelect = document.getElementById('product');// Получаю выпадающий список
    const resultDiv = document.getElementById('result'); // Получаю элемент для вывода результата
    const resultContainer = document.getElementById('resultContainer'); // Получаю контейнер результата

    calculateBtn.addEventListener('click', function() { // При клике на кнопку
        const quantityValue = quantityInput.value.trim();  // Получаю значение из поля ввода и убираем пробелы
        const regex = /^\d+$/; // Регулярное выражение для проверки только цифр

        if (!regex.test(quantityValue)) { // Если значение не соответствует формату
            alert('Пожалуйста, введите только цифры для количества товара!');
            return;
        }

        const productPrice = parseFloat(productSelect.value);  // Получаю цену выбранного товара
        const quantity = parseInt(quantityValue, 10); // Преобразую строку в целое число
        const totalCost = productPrice * quantity; // Рассчитываю общую стоимость

        resultDiv.innerHTML = 'Стоимость заказа: ' + totalCost + ' руб.';  // Вывожу результат
        resultContainer.style.display = 'block';  // Показываю контейнер с результатом
    });
});
