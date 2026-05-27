// ===============================
// ЗАВДАННЯ 1
// ===============================
function summarizeNumbers(numbers) {
  let count = 0;
  let sum = 0;
  let evenCount = 0;
  let max = undefined;

  if (numbers.length === 0) {
    return {
      count: 0,
      sum: 0,
      evenCount: 0,
      max: undefined,
      category: "empty"
    };
  }

  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];

    count++;
    sum += num;

    if (num % 2 === 0) evenCount++;

    if (max === undefined || num > max) {
      max = num;
    }
  }

  const category = sum > 0 ? "positive" : "non-positive";

  return { count, sum, evenCount, max, category };
}


// ===============================
// ЗАВДАННЯ 2
// ===============================
function processProducts(products) {
  const available = [];
  const priceList = products.map(p => `${p.name} — ${p.price} грн`);

  let totalPrice = 0;
  let cheapest = null;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    if (product.inStock) {
      available.push(product.name);
      totalPrice += product.price;

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


// ===============================
// ЗАВДАННЯ 3
// ===============================
function createApiClient(baseUrl) {
  let requestCount = 0;

  return {
    async get(path) {
      try {
        const res = await fetch(baseUrl + path);
        const data = await res.json();
        requestCount++;
        return data;
      } catch (e) {
        requestCount++;
        return { error: "Запит не вдався" };
      }
    },

    getRequestCount() {
      return requestCount;
    }
  };
}


// ===============================
// ЗАВДАННЯ 4
// ===============================
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
    this.tasks.push(new Task(this.currentId++, text));
  }

  remove(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.toggle();
  }
}

// DOM
const todo = new TodoList();

const input = document.getElementById("taskInput");
const btn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

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

btn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text) {
    todo.add(text);
    input.value = "";
    render();
  }
});

list.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);
  if (id) {
    todo.toggleTask(id);
    render();
  }
});
