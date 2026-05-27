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

