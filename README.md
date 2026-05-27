# Контрольна робота з JavaScript

## Опис
Цей проєкт містить 4 практичні завдання з JavaScript:
- змінні, умови, цикли, функції
- масиви та об'єкти
- замикання та async/await
- класи та DOM

---

## Завдання 1 — Статистика масиву

Функція:
`summarizeNumbers(numbers)`

### Повертає:
- count — кількість чисел
- sum — сума
- evenCount — парні числа
- max — максимальне число
- category — empty / positive / non-positive

---

## Завдання 2 — Обробка товарів

Функція:
`processProducts(products)`

### Повертає:
- available — товари в наявності
- totalPrice — сума доступних товарів
- cheapest — найдешевший товар
- priceList — список товарів у форматі "Назва — ціна грн"

---

## Завдання 3 — API клієнт

Функція:
`createApiClient(baseUrl)`

### Методи:
- get(path) — fetch запит (async/await + try/catch)
- getRequestCount() — кількість запитів

### Особливості:
- використано closure
- обробка помилок

---

## Завдання 4 — Todo List (ООП + DOM)

### Класи:
- Task — окреме завдання
- TodoList — керування списком

### Функціонал:
- додавання задач
- перемикання done
- рендер у DOM
- делегування подій

### HTML:
```html
<input id="taskInput" placeholder="Нове завдання">
<button id="addBtn">Додати</button>
<ul id="taskList"></ul>
