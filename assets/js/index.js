function toggleAccordion(element) {
  const content = element.nextElementSibling;
  content.classList.toggle("hidden");

  element.classList.toggle("bg-[#F47D08]");
  element.classList.toggle("bg-white");

  const icon = element.querySelector("i");
  icon.classList.toggle("text-white");
  icon.classList.toggle("text-[#F47D08]");
  icon.classList.toggle("rotate-180");

  const questionCircle = element.querySelector(".accordion-question-circle");
  questionCircle.classList.toggle("bg-[#F47D08]");
  questionCircle.classList.toggle("bg-white");
  questionCircle.classList.toggle("text-[#F47D08]");
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
        header.classList.remove("bg-[#F47D08]");
        header.classList.add("bg-white");

        // Reset icon color and rotation
        const otherIcon = header.querySelector("i");
        otherIcon.classList.remove("text-white", "rotate-180");
        otherIcon.classList.add("text-[#F47D08]");

        // Reset question circle color and text color
        const otherQuestionCircle = header.querySelector(
          ".accordion-question-circle"
        );
        otherQuestionCircle.classList.remove("bg-white", "text-[#F47D08]");
        otherQuestionCircle.classList.add("bg-[#F47D08]", "text-white");

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
  const contactForm = document.getElementById("contact-form");

  // Retrieve the stored data from localStorage
  const savedData = JSON.parse(localStorage.getItem("contactFormData"));

  // Function to load saved data from localStorage and prefill the form
  function loadFormData() {
    if (savedData) {
      // Prefill each form field with the saved data
      contactForm["お名前"].value = savedData.お名前 || "";
      contactForm["ふりがな"].value = savedData.ふりがな || "";
      contactForm["電話番号"].value = savedData.電話番号 || "";
      contactForm["メールアドレス"].value = savedData.メールアドレス || "";
      contactForm["ご相談内容"].value = savedData.ご相談内容 || "";

      // Check the saved illness checkboxes
      if (savedData.ご病気) {
        savedData.ご病気.forEach((illness) => {
          contactForm.querySelector(
            `input[name="ご病気"][value="${illness}"]`
          ).checked = true;
        });
      }

      // Check the saved administrative identification checkboxes
      if (savedData.行政認定) {
        savedData.行政認定.forEach((identification) => {
          contactForm.querySelector(
            `input[name="行政認定"][value="${identification}"]`
          ).checked = true;
        });
      }
    }
  }

  // Function to save form data to localStorage
  function saveFormData() {
    const formData = {
      お名前: contactForm["お名前"].value,
      ふりがな: contactForm["ふりがな"].value,
      電話番号: contactForm["電話番号"].value,
      メールアドレス: contactForm["メールアドレス"].value,
      ご相談内容: contactForm["ご相談内容"].value,
      ご病気: Array.from(
        contactForm.querySelectorAll('input[name="ご病気"]:checked')
      ).map((input) => input.value),
      行政認定: Array.from(
        contactForm.querySelectorAll('input[name="行政認定"]:checked')
      ).map((input) => input.value),
    };

    // Save the form data in localStorage
    localStorage.setItem("contactFormData", JSON.stringify(formData));

    // Redirect to confirmation page
    window.location.href = "confirm.html";
  }

  // Load saved form data on page load
  loadFormData();

  // Handle form submission
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from submitting
    saveFormData(); // Save form data to localStorage
  });

  const footer = document.getElementById("footer");
  footer.classList.add("1100:mb-[13.5rem]");
});

window.addEventListener("scroll", function () {
  var hiddenElement = document.getElementById("contact-button-sticky");
  if (window.scrollY < 400) {
    hiddenElement.classList.add("hidden");
  } else {
    hiddenElement.classList.remove("hidden");
  }
});

window.addEventListener("scroll", function () {
  var hiddenElement = document.getElementById("call-section-sticky");
  if (window.innerWidth <= 1100) {
    if (window.scrollY > 1400) {
      hiddenElement.classList.remove("hidden");
    } else {
      hiddenElement.classList.add("hidden");
    }
  } else {
    hiddenElement.classList.add("hidden");
  }
});
