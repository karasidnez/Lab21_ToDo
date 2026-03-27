// Получаем элементы DOM
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");

// Глобальный счётчик задач
let totalTasks = 0;

// Функция для обновления счётчика
function updateCounter() {
    taskCounter.textContent = `Всего задач: ${totalTasks}`;
}

// Функция для создания новой задачи
function createTaskItem(text) {
    // Создаём элементы
    const taskItem = document.createElement("li");
    const taskText = document.createElement("span");
    const buttonsDiv = document.createElement("div");
    const completeBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    // Настраиваем классы
    taskItem.className = "task-item";
    taskText.className = "task-text";
    buttonsDiv.className = "task-buttons";
    completeBtn.className = "complete-btn";
    deleteBtn.className = "delete-btn";

    // Заполняем элементы текстом
    taskText.textContent = text;
    completeBtn.textContent = "Выполнено";
    deleteBtn.textContent = "Удалить";

    // Собираем структуру
    buttonsDiv.appendChild(completeBtn);
    buttonsDiv.appendChild(deleteBtn);
    taskItem.appendChild(taskText);
    taskItem.appendChild(buttonsDiv);

    // Обработчик для кнопки "Выполнено"
    completeBtn.addEventListener("click", () => {
        taskText.classList.toggle("completed");
    });

    // Обработчик для кнопки "Удалить"
    deleteBtn.addEventListener("click", () => {
        taskList.removeChild(taskItem);
        totalTasks--;
        updateCounter();
    });

    return taskItem;
}

// Функция добавления новой задачи
function addNewTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    const newTask = createTaskItem(text);
    taskList.appendChild(newTask);
    totalTasks++;
    updateCounter();

    taskInput.value = "";
    taskInput.focus();
}

// Обработчик нажатия кнопки "Добавить"
addBtn.addEventListener("click", addNewTask);

// Обработчик нажатия Enter в поле ввода
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addNewTask();
});

// Инициализация при загрузке (три примера задач)
document.addEventListener("DOMContentLoaded", function () {
    const sampleTasks = [
        "Изучить JavaScript",
        "Создать TODO-лист",
        "Поработать над проектом"
    ];

    sampleTasks.forEach(function (task) {
        const newTask = createTaskItem(task);
        taskList.appendChild(newTask);
        totalTasks++;
    });

    updateCounter();
});