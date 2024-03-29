const days = document.querySelectorAll(".graph__bar");

const updateGraph = async () => {
  const data = await fetchGraphData();
  const currentDay = new Date().getDay() - 1;

  if (data) {
    data.forEach((item, index) => {
      days[index].setAttribute("data-tooltip", item.amount);
      days[index].innerHTML = `
        <span class="tooltip"> $${item.amount}</span>
        <div class="bar" style="height: ${item.amount * 2.75}px;${
        currentDay === index ? "background:var(--cyan)" : ""
      }"></div>
        <div class="label">${item.day}</div>
        `;
    });
  }
};

// Fetch data from JSON file
const fetchGraphData = async () => {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

updateGraph();
