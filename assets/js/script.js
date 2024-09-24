function toggleAccordion(element) {
  const content = element.nextElementSibling;
  content.classList.toggle("hidden");

  element.classList.toggle("bg-[#e58333]");
  element.classList.toggle("bg-white");

  const icon = element.querySelector("i");
  icon.classList.toggle("text-white");
  icon.classList.toggle("text-[#e58333]");
  icon.classList.toggle("rotate-180");

  const questionCircle = element.querySelector(".accordion-question-circle");
  questionCircle.classList.toggle("bg-[#e58333]");
  questionCircle.classList.toggle("bg-white");
  questionCircle.classList.toggle("text-[#e58333]");
  questionCircle.classList.toggle("text-white");

  const accordionQuestions = element.querySelector(".accordion-questions");
  accordionQuestions.classList.toggle("text-white");
  accordionQuestions.classList.toggle("text-black");

  document
    .querySelectorAll(".accordion-item .accordion-content")
    .forEach((item) => {
      // If the current item is not the one being clicked
      if (item !== content) {
        item.classList.add("hidden");

        const header = item.previousElementSibling;
        header.classList.remove("bg-[#e58333]");
        header.classList.add("bg-white");

        // Reset icon color and rotation
        const otherIcon = header.querySelector("i");
        otherIcon.classList.remove("text-white", "rotate-180");
        otherIcon.classList.add("text-[#e58333]");

        // Reset question circle color and text color
        const otherQuestionCircle = header.querySelector(
          ".accordion-question-circle"
        );
        otherQuestionCircle.classList.remove("bg-white", "text-[#e58333]");
        otherQuestionCircle.classList.add("bg-[#e58333]", "text-white");

        // Reset question text color
        const otherAccordionQuestions = header.querySelector(
          ".accordion-questions"
        );
        otherAccordionQuestions.classList.remove("text-white");
        otherAccordionQuestions.classList.add("text-black");
      }
    });
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the form element
  const form = document.getElementById("contact-form");
  const confirmationForm = document.getElementById("confirmation-form");

  // Retrieve the stored data from localStorage
  const savedData = JSON.parse(localStorage.getItem("contactFormData"));

  if (window.location.pathname === "/confirm.html") {
    if (savedData) {
      // Inject each value into its respective element
      document.getElementById("お名前").textContent = savedData.お名前 || "";
      document.getElementById("ふりがな").textContent =
        savedData.ふりがな || "";
      document.getElementById("電話番号").textContent =
        savedData.電話番号 || "";
      document.getElementById("メールアドレス").textContent =
        savedData.メールアドレス || "";
      document.getElementById("ご病気").textContent =
        savedData.ご病気.join(", ") || "なし";
      document.getElementById("行政認定").textContent =
        savedData.行政認定.join(", ") || "なし";
      document.getElementById("ご相談内容").textContent =
        savedData.ご相談内容 || "";
    } else {
      // If no data is found, redirect back to the form page
      alert("確認するためのデータがありません。");
      window.location.href = "index.html";
    }
  }

  // Function to load saved data from localStorage and prefill the form
  function loadFormData() {
    if (savedData) {
      // Prefill each form field with the saved data
      form["お名前"].value = savedData.お名前 || "";
      form["ふりがな"].value = savedData.ふりがな || "";
      form["電話番号"].value = savedData.電話番号 || "";
      form["メールアドレス"].value = savedData.メールアドレス || "";
      form["ご相談内容"].value = savedData.ご相談内容 || "";

      // Check the saved illness checkboxes
      if (savedData.ご病気) {
        savedData.ご病気.forEach((illness) => {
          form.querySelector(
            `input[name="ご病気"][value="${illness}"]`
          ).checked = true;
        });
      }

      // Check the saved administrative identification checkboxes
      if (savedData.行政認定) {
        savedData.行政認定.forEach((identification) => {
          form.querySelector(
            `input[name="行政認定"][value="${identification}"]`
          ).checked = true;
        });
      }
    }
  }

  // Function to save form data to localStorage
  function saveFormData() {
    const formData = {
      お名前: form["お名前"].value,
      ふりがな: form["ふりがな"].value,
      電話番号: form["電話番号"].value,
      メールアドレス: form["メールアドレス"].value,
      ご相談内容: form["ご相談内容"].value,
      ご病気: Array.from(
        form.querySelectorAll('input[name="ご病気"]:checked')
      ).map((input) => input.value),
      行政認定: Array.from(
        form.querySelectorAll('input[name="行政認定"]:checked')
      ).map((input) => input.value),
    };

    // Save the form data in localStorage
    localStorage.setItem("contactFormData", JSON.stringify(formData));

    // Redirect to confirmation page
    window.location.href = "confirm.html";
  }

  // Function to send email using Nodemailer
  function sendEmail(data) {
    fetch("/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          alert("メールが送信されました。");
          localStorage.removeItem("contactFormData"); // Clear localStorage
          window.location.href = "success.html"; // Redirect to success page
        } else {
          alert("メール送信中にエラーが発生しました。");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("メール送信中にエラーが発生しました。");
      });
  }

  // Load saved form data on page load
  loadFormData();

  // Handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from submitting
    saveFormData(); // Save form data to localStorage
  });
  confirmationForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from submitting
    localStorage.removeItem("contactFormData"); // Clear saved form data
    sendEmail(savedData);
  });
});
