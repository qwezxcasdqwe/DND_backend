const textareas = document.querySelectorAll('.dynamic-textarea');
textareas.forEach(textarea => {
    textarea.addEventListener('input', () => {
        textarea.style.height = 'auto'; // Сбрасываем высоту
        textarea.style.height = textarea.scrollHeight + 'px'; // Устанавливаем высоту равной содержимому
    });
});

// Изменение цвета заднего фона

document.getElementById("colorButton").addEventListener("click", function() {
    const menu = document.getElementById("colorMenu");
    menu.classList.toggle("hidden");
});

const colorOptions = document.querySelectorAll("#colorMenu li");
const overlay = document.getElementById("overlay");

colorOptions.forEach(option => {
    option.addEventListener("click", function() {
        const color = this.getAttribute("data-color");
        overlay.style.backgroundColor = color;
        document.getElementById("colorMenu").classList.add("hidden");
    });
});

// Открытие окна для ввода своего цвета
document.getElementById("customColorOption").addEventListener("click", function() {
    document.getElementById("colorMenu").classList.add("hidden");
    document.getElementById("colorInputContainer").classList.remove("hidden");
});

// Применение пользовательского цвета
document.getElementById("applyColor").addEventListener("click", function() {
    const hexColor = document.getElementById("hexColorInput").value;
    if (/^#[0-9A-F]{6}$/i.test(hexColor)) {
        // Добавляем полупрозрачность к HEX-коду
        const rgbaColor = hexToRgba(hexColor, 0.7);
        overlay.style.backgroundColor = rgbaColor;
        document.getElementById("colorInputContainer").classList.add("hidden");
    } else {
        alert("Введите правильный HEX-код цвета (например, #FF5733)");
    }
});

// Функция для преобразования HEX в RGBA
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Закрытие меню при клике вне него
document.addEventListener("click", function(event) {
    const menu = document.getElementById("colorMenu");
    const colorInputContainer = document.getElementById("colorInputContainer");
    if (!menu.contains(event.target) && !document.getElementById("colorButton").contains(event.target)) {
        menu.classList.add("hidden");
    }
    if (!colorInputContainer.contains(event.target) && event.target.id !== "customColorOption") {
        colorInputContainer.classList.add("hidden");
    }
});

//сохранение карты игрока

document.getElementById("savePngButton").addEventListener("click", function() {
    // Захватываем весь документ
    alert('я пока не понимаю как это реализовать( \n                     С уважением, Лев')
});

//char_name
//char_name_disp





// ------------------------------  пересчет характеристик  ------------------------------

function calculatePerc(perc_input) {
    let perc_output;
    if (perc_input > 0 && perc_input <= 30) {
        perc_output = Math.floor((perc_input - 10) / 2);
        return perc_output;
    } else {
        return 0;
    }
}

function updatePercOutput(inputElement) {
    const perc_input = inputElement.value;
    const baseOutput = calculatePerc(perc_input);
    
    // Получаем родительский элемент perc для текущего инпута
    const percContainer = inputElement.closest('.perc');
    
    // Обновление значения для текущего блока
    const globalPercValueElement = percContainer.querySelector('.globalPercValue');
    globalPercValueElement.innerHTML = (baseOutput >= 0 ? '+' : '') + baseOutput; 

    // Получаем все чекбоксы в текущем блоке
    const checkboxes = percContainer.querySelectorAll('.custom-checkbox');
    checkboxes.forEach((checkbox) => {
        const percValueElement = checkbox.querySelector('.perc_value');
        let adjustedValue = baseOutput;

        // Обновление boosted1 или boosted2
        if (checkbox.classList.contains('boosted1')) {
            adjustedValue += 2; 
        } else if (checkbox.classList.contains('boosted2')) {
            adjustedValue += 4; 
        }

        const newValue = (adjustedValue >= 0 ? '+' : '') + adjustedValue; // Формируем новое значение
        percValueElement.innerHTML = newValue;  // Обновляем значение
    });
}

function perc_calc(event) {
    updatePercOutput(event.target);
}

// Обработка события для каждого инпута
document.querySelectorAll('.globalInput').forEach(function(input) {
    input.oninput = perc_calc;
})


// ------------------------------  тройной чекбокс  ------------------------------
// Возможные состояния чекбокса
const states = ['empty', 'boosted1', 'boosted2'];

// Делегирование событий для изменения состояния чекбоксов
document.addEventListener("click", function(event) {
    const checkbox = event.target.closest('.custom-checkbox');
    if (checkbox) {
        let currentStateIndex = states.findIndex(state => checkbox.classList.contains(state));

        // Удаляем текущее состояние и устанавливаем следующее
        checkbox.classList.remove(states[currentStateIndex]);
        currentStateIndex = (currentStateIndex + 1) % states.length;
        checkbox.classList.add(states[currentStateIndex]);

        // Обновляем значения в perc_value
        updatePercOutput(checkbox.closest('.skills_checkbox').parentElement.querySelector('.globalInput'));
    }
});

//сохранение карты 

// Функция для получения данных из всех полей
function collectFormData() {
    const data = {
        char_name: document.getElementById('char_name').value,
        char_hist: document.getElementById('char_hist').value,
        char_class: document.getElementById('char_class').value,
        char_race: document.getElementById('char_race').value,
        
        // Заполнение textarea полей
        languages: document.querySelector("textarea[placeholder='Языки и прочие владения.']").value,
        equipment: document.querySelector("textarea[placeholder='Что у вас есть?']").value,
        
        // Получение значений из input полей с атрибутами placeholder
        dc: document.querySelector("input[placeholder='0']").value,
        speed: Array.from(document.querySelectorAll("input[placeholder='0']")).map(el => el.value),
        
        // Заполнение значений из полей "Сила", "Ловкость", и других характеристик
        attributes: {
            strength: document.querySelector("input[placeholder='10']").value,
            dexterity: document.querySelectorAll("input[placeholder='10']")[1].value, // Выбор второго поля для ловкости
            constitution: document.querySelectorAll("input[placeholder='10']")[2].value,
            intelligence: document.querySelectorAll("input[placeholder='10']")[3].value,
            wisdom: document.querySelectorAll("input[placeholder='10']")[4].value,
            charisma: document.querySelectorAll("input[placeholder='10']")[5].value
        }
    };
    return data; // возвращаю всю карту в дата
}

// Пример использования функции
document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('savePngButton'); // Кнопка "Сохранить карту"
    
    submitButton.addEventListener('click', function() {
        const formData = collectFormData();
        console.log("Данные персонажа:", formData);
        
        // Здесь вы можете добавить код для отправки formData на сервер
        sendFormDataToServer(formData);
    });
});

// Функция для отправки данных на сервер
function sendFormDataToServer(data) {
    fetch('https://example.com/your-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Ответ сервера:', result);
    })
    .catch(error => {
        console.error('Ошибка при отправке данных:', error);
    });
}
