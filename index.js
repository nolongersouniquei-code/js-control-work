// =====================================
// ЗАВДАННЯ 1 — масиви, умови, цикли
// =====================================

function summarizeNumbers(numbers) {
  // змінні для статистики
  let count = 0;
  let sum = 0;
  let evenCount = 0;
  let max = undefined;

  // перевірка на порожній масив
  if (numbers.length === 0) {
    return {
      count: 0,
      sum: 0,
      evenCount: 0,
      max: undefined,
      category: "empty"
    };
  }

  // цикл для обробки масиву
  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];

    count++;          // рахуємо елементи
    sum += num;       // додаємо до суми

    // перевірка на парність
    if (num % 2 === 0) {
      evenCount++;
    }

    // пошук максимального числа
    if (max === undefined || num > max) {
      max = num;
    }
  }

  // визначення категорії
  const category = sum > 0 ? "positive" : "non-positive";

  return { count, sum, evenCount, max, category };
}


// =====================================
// ЗАВДАННЯ 2 — масиви + HOF
// =====================================

function processProducts(products) {
  const available = []; // товари в наявності

  // формуємо список товарів через map
  const priceList = products.map(
    product => `${product.name} — ${product.price} грн`
  );

  let totalPrice = 0;
  let cheapest = null;

  // цикл для обробки товарів
  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    // тільки товари в наявності
    if (product.inStock) {
      available.push(product.name);
      totalPrice += product.price;

      // пошук найдешевшого
      if (!cheapest || product.price < cheapest.price) {
        cheapest = product;
      }
    }
  }

  return {
    available,
    totalPrice,
    cheapest: cheapest ? cheapest.name : undefined,
    priceList
  };
}


// =====================================
// ЗАВДАННЯ 3 — closure + async/await
// =====================================

function createApiClient(baseUrl) {
  // приватний лічильник через замикання
  let requestCount = 0;

  return {
    // асинхронний GET запит
    async get(path) {
      try {
        const res = await fetch(baseUrl + path);

        // перевірка відповіді
        if (!res.ok) {
          throw new Error("Request failed");
        }

        const data = await res.json();

        // збільшуємо лічильник запитів
        requestCount++;

        return data;
      } catch (error) {
        requestCount++;
        return { error: "Запит не вдався" };
      }
    },

    // отримати кількість запитів
    getRequestCount() {
      return requestCount;
    }
  };
}


// =====================================
// ЗАВДАННЯ 4 — OOP + DOM + events
// =====================================

// клас Task (одне завдання)
class Task {
  constructor(id, text) {
    this.id = id;
    this.text = text;
    this.done = false;
  }

  // перемикає стан виконання
  toggle() {
    this.done = !this.done;
  }
}

// клас TodoList (керування списком)
class TodoList {
  constructor() {
    this.tasks = [];
    this.currentId = 1;
  }

  // додати задачу
  add(text) {
    const task = new Task(this.currentId++, text);
    this.tasks.push(task);
  }

  // видалити задачу
  remove(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  // перемкнути стан задачі
  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.toggle();
  }
}


// =====================================
// DOM ЛОГІКА
// =====================================

// створюємо список
const todo = new TodoList();

// елементи DOM
const input = document.getElementById("taskInput");
const btn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

// функція рендера списку
function render() {
  list.innerHTML = "";

  todo.tasks.forEach(task => {
    const li = document.createElement("li");

    li.textContent = task.text;
    li.dataset.id = task.id;

    // якщо виконано — закреслюємо
    if (task.done) {
      li.style.textDecoration = "line-through";
    }

    list.appendChild(li);
  });
}

// додавання задачі
btn.addEventListener("click", () => {
  const text = input.value.trim();

  if (text) {
    todo.add(text);
    input.value = "";
    render();
  }
});

// делегування подій (клік по списку)
list.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);

  if (id) {
    todo.toggleTask(id);
    render();
  }
});
