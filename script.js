const steps = [
  document.getElementById("step-1"),
  document.getElementById("step-2"),
  document.getElementById("step-3"),
  document.getElementById("step-4"),
  document.getElementById("step-5"),
  document.getElementById("final-step"),
];

const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const activitySelect = document.getElementById("activity-select");
const customActivity = document.getElementById("custom-activity");
const activityNext = document.getElementById("activity-next");
const timeInput = document.getElementById("time-input");
const timeNext = document.getElementById("time-next");
const foodSelect = document.getElementById("food-select");
const customFood = document.getElementById("custom-food");
const foodNext = document.getElementById("food-next");
const dateInput = document.getElementById("date-input");
const dateNext = document.getElementById("date-next");
const recap = document.getElementById("recap");
const resetButton = document.getElementById("reset-button");

const dateInfo = {
  activity: "",
  time: "",
  food: "",
  date: "",
};

function showStep(index) {
  steps.forEach((step, idx) => {
    step.classList.toggle("page--active", idx === index);
  });
}

function moveNoButtonRandomly() {
  const button = noButton;
  button.classList.add("moved");
  const { innerWidth, innerHeight } = window;
  const rect = button.getBoundingClientRect();
  const padding = 24;
  const maxLeft = Math.max(0, innerWidth - rect.width - padding);
  const maxTop = Math.max(0, innerHeight - rect.height - padding);
  const randomLeft = Math.floor(Math.random() * maxLeft);
  const randomTop = Math.floor(Math.random() * maxTop);
  button.style.left = `${randomLeft}px`;
  button.style.top = `${randomTop}px`;
}

yesButton.addEventListener("click", () => {
  showStep(1);
});

noButton.addEventListener("click", () => {
  moveNoButtonRandomly();
});

activitySelect.addEventListener("change", () => {
  customActivity.classList.toggle("hidden", activitySelect.value !== "autre");
});

foodSelect.addEventListener("change", () => {
  customFood.classList.toggle("hidden", foodSelect.value !== "autre");
});

activityNext.addEventListener("click", () => {
  const chosen =
    activitySelect.value === "autre"
      ? customActivity.value.trim()
      : activitySelect.options[activitySelect.selectedIndex].text;
  if (!chosen) {
    alert("Merci de proposer une activité ou de choisir dans la liste.");
    return;
  }
  dateInfo.activity = chosen;
  showStep(2);
});

timeNext.addEventListener("click", () => {
  if (!timeInput.value) {
    alert("Choisis une heure pour le rendez-vous.");
    return;
  }
  dateInfo.time = timeInput.value;
  showStep(3);
});

foodNext.addEventListener("click", () => {
  const chosen =
    foodSelect.value === "autre"
      ? customFood.value.trim()
      : foodSelect.options[foodSelect.selectedIndex].text;
  if (!chosen) {
    alert("Merci de choisir un plat ou d’indiquer ton choix.");
    return;
  }
  dateInfo.food = chosen;
  showStep(4);
});

dateNext.addEventListener("click", () => {
  if (!dateInput.value) {
    alert("Sélectionne une date pour le rendez-vous.");
    return;
  }
  dateInfo.date = dateInput.value;
  showRecap();
  showStep(5);
});

function formatDate(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function showRecap() {
  const formattedDate = formatDate(dateInfo.date);
  const time = dateInfo.time;
  const activity = dateInfo.activity;
  const food = dateInfo.food;
  recap.textContent = `Alors on se donne rendez-vous le ${formattedDate} à ${time} pour ${activity} 💫, et on va passer un moment mémorable autour de ${food} ! 🍰`;
}

resetButton.addEventListener("click", () => {
  activitySelect.value = "cinema";
  customActivity.value = "";
  customActivity.classList.add("hidden");
  timeInput.value = "";
  foodSelect.value = "sushis";
  customFood.value = "";
  customFood.classList.add("hidden");
  dateInput.value = "";
  dateInfo.activity = "";
  dateInfo.time = "";
  dateInfo.food = "";
  dateInfo.date = "";
  noButton.classList.remove("moved");
  noButton.style.left = "";
  noButton.style.top = "";
  showStep(0);
});

window.addEventListener("resize", () => {
  if (
    steps[0].classList.contains("page--active") &&
    noButton.classList.contains("moved")
  ) {
    moveNoButtonRandomly();
  }
});
