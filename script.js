const button = document.getElementById("show-recipe");
const recipeCard = document.getElementById("recipe-card");
const copyButton = document.getElementById("copy-recipe");
const printButton = document.getElementById("print-recipe");
const nextStepButton = document.getElementById("next-step");
const restartButton = document.getElementById("restart-steps");
const stepCounter = document.getElementById("step-counter");
const stepTitle = document.getElementById("step-title");
const stepText = document.getElementById("step-text");
const stepCard = document.getElementById("step-card");
const servingsCount = document.getElementById("servings-count");
const decreaseServingsButton = document.getElementById("decrease-servings");
const increaseServingsButton = document.getElementById("increase-servings");
const eggsAmount = document.getElementById("eggs-amount");
const milkAmount = document.getElementById("milk-amount");
const sugarAmount = document.getElementById("sugar-amount");
const vanillaAmount = document.getElementById("vanilla-amount");
const caramelAmount = document.getElementById("caramel-amount");
const finalMessage = document.getElementById("final-message");

const steps = [
  {
    title: "Preparar el caramelo",
    text: "Vamos con calma: derretir el azucar extra hasta formar caramelo y cubrir el molde."
  },
  {
    title: "Mezclar la base",
    text: "Ahora mezcla los huevos con el azucar, la leche y la esencia de vainilla hasta que quede parejo."
  },
  {
    title: "Llevar al molde",
    text: "Vierte la mezcla sobre el molde acaramelado con cuidado, sin apuro."
  },
  {
    title: "Cocinar",
    text: "Cocina a bano maria durante 45 a 60 minutos, hasta que el flan se vea firme y suave."
  },
  {
    title: "Enfriar y servir",
    text: "Deja enfriar, lleva a la heladera y desmolda cuando este bien fresco. Ya casi lo tienes."
  }
];

const baseServings = 4;
const ingredients = {
  eggs: { baseAmount: 5, unit: "huevos" },
  milk: { baseAmount: 500, unit: "ml de leche" },
  sugar: { baseAmount: 150, unit: "g de azucar" },
  vanilla: { baseAmount: 1, unit: "cucharadita de esencia de vainilla" },
  caramel: { baseAmount: 100, unit: "g de azucar extra para el caramelo" }
};

let currentStep = 0;
let servings = baseServings;

function formatAmount(value) {
  if (Number.isInteger(value)) {
    return String(value);
  }

  return value.toFixed(1).replace(".0", "");
}

function updateServings() {
  const factor = servings / baseServings;

  servingsCount.textContent = servings;
  eggsAmount.textContent = formatAmount(ingredients.eggs.baseAmount * factor);
  milkAmount.textContent = formatAmount(ingredients.milk.baseAmount * factor);
  sugarAmount.textContent = formatAmount(ingredients.sugar.baseAmount * factor);
  vanillaAmount.textContent = formatAmount(ingredients.vanilla.baseAmount * factor);
  caramelAmount.textContent = formatAmount(ingredients.caramel.baseAmount * factor);
  decreaseServingsButton.disabled = servings === 2;
  increaseServingsButton.disabled = servings === 10;
}

function buildRecipeText() {
  return [
    "Flan casero",
    "",
    `Porciones: ${servings}`,
    "",
    "Ingredientes:",
    `- ${eggsAmount.textContent} huevos`,
    `- ${milkAmount.textContent} ml de leche`,
    `- ${sugarAmount.textContent} g de azucar`,
    `- ${vanillaAmount.textContent} cucharadita de esencia de vainilla`,
    `- ${caramelAmount.textContent} g de azucar extra para el caramelo`,
    "",
    "Preparacion:",
    "1. Derretir el azucar extra hasta formar caramelo y cubrir el molde.",
    "2. Batir los huevos con el azucar, la leche y la esencia de vainilla.",
    "3. Volcar la mezcla sobre el molde acaramelado con cuidado.",
    "4. Cocinar a bano maria durante 45 a 60 minutos.",
    "5. Dejar enfriar, llevar a la heladera y desmoldar."
  ].join("\n");
}

function renderStep() {
  const step = steps[currentStep];

  stepCard.classList.add("is-changing");

  window.setTimeout(() => {
    stepCounter.textContent = `Paso ${currentStep + 1} de ${steps.length}`;
    stepTitle.textContent = step.title;
    stepText.textContent = step.text;
    nextStepButton.textContent = currentStep === steps.length - 1 ? "Ya termine" : "Siguiente paso";
    nextStepButton.disabled = currentStep === steps.length - 1;
    if (currentStep === steps.length - 1) {
      finalMessage.classList.remove("hidden");
    } else {
      finalMessage.classList.add("hidden");
    }
    stepCard.classList.remove("is-changing");
  }, 180);
}

button.addEventListener("click", () => {
  recipeCard.classList.remove("hidden");
  recipeCard.classList.remove("is-visible");
  window.setTimeout(() => {
    recipeCard.classList.add("is-visible");
  }, 10);
  copyButton.classList.remove("hidden");
  printButton.classList.remove("hidden");
  currentStep = 0;
  renderStep();
  button.textContent = "Receta visible";
  button.disabled = true;
});

nextStepButton.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    currentStep += 1;
    renderStep();
  }
});

restartButton.addEventListener("click", () => {
  currentStep = 0;
  nextStepButton.disabled = false;
  finalMessage.classList.add("hidden");
  renderStep();
});

decreaseServingsButton.addEventListener("click", () => {
  if (servings > 2) {
    servings -= 1;
    updateServings();
    copyButton.textContent = "Copiar receta";
  }
});

increaseServingsButton.addEventListener("click", () => {
  if (servings < 10) {
    servings += 1;
    updateServings();
    copyButton.textContent = "Copiar receta";
  }
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(buildRecipeText());
    copyButton.textContent = "Receta copiada";
  } catch (error) {
    copyButton.textContent = "No se pudo copiar";
  }
});

printButton.addEventListener("click", () => {
  window.print();
});

updateServings();
