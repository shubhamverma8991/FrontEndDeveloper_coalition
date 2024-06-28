document.addEventListener("DOMContentLoaded", () => {
  const url = "https://fedskillstest.coalitiontechnologies.workers.dev";
  const username = "coalition";
  const password = "skills-test";
  const headers = new Headers();
  headers.set("Authorization", "Basic " + btoa(username + ":" + password));

  fetch(url, { method: "GET", headers: headers })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const patientList = document.querySelector(".patient-list");
      patientList.innerHTML = ""; // Clear existing list items

      data.forEach((patient) => {
        const listItem = document.createElement("li");
        if (patient.name == "Jessica Taylor") {
          listItem.classList.add("active");
        }
        listItem.innerHTML = `
          <div class="box">
            <img src="${patient.profile_picture}" alt="${patient.name}" class="person_img" />
            <div>
              <p>${patient.name}</p>
              <span>${patient.gender}, ${patient.age}</span>
            </div>
          </div>
          <img src="./assets/more_horiz_FILL0_wght300_GRAD0_opsz24@2x.png" alt="More" class="more" />
        `;
        listItem.addEventListener("click", () => {
          // Remove active class from all list items
          document.querySelectorAll(".patient-list li").forEach((item) => {
            item.classList.remove("active");
          });
          // Add active class to the clicked list item
          listItem.classList.add("active");
          // Display patient details
          displayPatientDetails(patient);
        });
        patientList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("There has been a problem with your fetch operation:", error);
    });

  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Oct, 2023", "Nov, 2023", "Dec, 2023", "Jan, 2024", "Feb, 2024", "Mar, 2024"],
      datasets: [
        {
          label: "Data A",
          data: [120, 115, 160, 110, 150, 160],
          borderColor: "#C26EB4",
          backgroundColor: "#C26EB4",
          fill: false,
          tension: 0.4,
        },
        {
          label: "Data B",
          data: [110, 65, 105, 90, 70, 80],
          borderColor: "#7E6CAB",
          backgroundColor: "#7E6CAB",
          fill: false,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 60,
          max: 180,
        },
      },
    },
  });
});

function displayPatientDetails(patient) {
  document.getElementById("profile-picture").src = patient.profile_picture;
  document.getElementById("patient-name").textContent = patient.name;
  document.getElementById("date-of-birth").textContent = patient.date_of_birth;
  document.getElementById("gender").textContent = patient.gender;
  document.getElementById("phone-number").textContent = patient.phone_number;
  document.getElementById("emergency-contact").textContent = patient.emergency_contact;
  document.getElementById("insurance-type").textContent = patient.insurance_type;
}
