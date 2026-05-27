function summarizeNumbers(numbers) {
  // 1. Базові значення
  let count = 0;
  let sum = 0;
  let evenCount = 0;
  let max = undefined;

  // 2. Перевірка на порожній масив
  if (numbers.length === 0) {
    return {
      count: 0,
      sum: 0,
      evenCount: 0,
      max: undefined,
      category: "empty"
    };
  }

  // 3. Обчислення через цикл
  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];

    count++;
    sum += num;

    if (num % 2 === 0) {
      evenCount++;
    }

    if (max === undefined || num > max) {
      max = num;
    }
  }

  // 4. Визначення категорії
  let category;
  if (sum > 0) {
    category = "positive";
  } else {
    category = "non-positive";
  }

  // 5. Повернення результату
  return {
    count,
    sum,
    evenCount,
    max,
    category
  };
}

// Приклади
console.log(summarizeNumbers([4, 7, 2, 9]));
// { count: 4, sum: 22, evenCount: 2, max: 9, category: "positive" }

console.log(summarizeNumbers([]));
// { count: 0, sum: 0, evenCount: 0, max: undefined, category: "empty" }

function processProducts(products) {
  // товари в наявності
  const available = [];

  // список рядків "Назва — ціна грн"
  const priceList = products.map(product => {
    return `${product.name} — ${product.price} грн`;
  });

  let totalPrice = 0;
  let cheapest = null;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    if (product.inStock) {
      available.push(product.name);
      totalPrice += product.price;

      if (cheapest === null || product.price < cheapest.price) {
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

// приклад
const products = [
  { name: "Чай", price: 50, inStock: true },
  { name: "Кава", price: 120, inStock: false },
  { name: "Цукор", price: 30, inStock: true }
];

console.log(processProducts(products));

function createApiClient(baseUrl) {
  // замикання: приватні змінні
  let requestCount = 0;

  return {
    // async метод GET
    async get(path) {
      try {
        const response = await fetch(baseUrl + path);

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = await response.json();

        // збільшуємо лічильник тільки при запиті
        requestCount++;

        return data;
      } catch (error) {
        requestCount++;
        return { error: "Запит не вдався" };
      }
    },

    // повертає кількість запитів
    getRequestCount() {
      return requestCount;
    }
  };
}

// приклад використання
(async () => {
  const api = createApiClient("https://jsonplaceholder.typicode.com");

  const user = await api.get("/users/1");
  console.log(user);

  const posts = await api.get("/posts");
  console.log(posts);

  console.log(api.getRequestCount()); // 2
})();

class Task {
  constructor(id, text) {
    this.id = id;
    this.text = text;
    this.done = false;
  }

  toggle() {
    this.done = !this.done;
  }
}

class TodoList {
  constructor() {
    this.tasks = [];
    this.currentId = 1;
  }

  add(text) {
    const task = new Task(this.currentId++, text);
    this.tasks.push(task);
  }

  remove(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  getActive() {
    return this.tasks.filter(task => !task.done);
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.toggle();
  }
}

// ініціалізація
const todo = new TodoList();

const input = document.getElementById("taskInput");
const btn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

// рендер функція
function render() {
  list.innerHTML = "";

  todo.tasks.forEach(task => {
    const li = document.createElement("li");

    li.textContent = task.text;
    li.dataset.id = task.id;

    if (task.done) {
      li.style.textDecoration = "line-through";
    }

    list.appendChild(li);
  });
}

// додати задачу
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
