// Product data array
const products = [
  { id: "p1", name: "Super Blender 3000" },
  { id: "p2", name: "Smart Toaster Pro" },
  { id: "p3", name: "Eco Kettle" },
  { id: "p4", name: "Air Purifier Max" },
  { id: "p5", name: "Coffee Maker Deluxe" }
];

// Populate dropdown dynamically
const select = document.getElementById("productName");
products.forEach(product => {
  const option = document.createElement("option");
  option.value = product.name;
  option.textContent = product.name;
  select.appendChild(option);
});
