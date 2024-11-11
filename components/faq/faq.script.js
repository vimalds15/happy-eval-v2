function initializeFaq() {
  fetch("mock/data.json")
    .then((response) => response.json())
    .then((data) => {
      const faqContainer = document.querySelector(".faq-items-container");

      const render = (pageType) => {
        faqContainer.innerHTML = "";

        const faqs = data[pageType].faq;

        faqs.forEach((item) => {
          const faqItem = document.createElement("div");
          faqItem.classList.add("faq-item");

          const questionContainer = document.createElement("div");
          questionContainer.classList.add("faq-question-container");

          const question = document.createElement("p");
          question.textContent = item.question;

          const arrowIcon = document.createElement("img");
          arrowIcon.src =
            "https://assets.www.happyfox.com/v2/images/down-arrow.svg";
          arrowIcon.alt = "arrow-down";
          arrowIcon.classList.add("arrow-down");

          questionContainer.appendChild(question);
          questionContainer.appendChild(arrowIcon);

          const answerContainer = document.createElement("div");
          answerContainer.classList.add("faq-answer-container");

          const answer = document.createElement("p");
          answer.textContent = item.answer;

          answerContainer.appendChild(answer);

          faqItem.appendChild(questionContainer);
          faqItem.appendChild(answerContainer);

          faqItem.addEventListener("click", () => {
            answerContainer.classList.toggle("active");
            arrowIcon.classList.toggle("active");
          });

          faqContainer.appendChild(faqItem);
        });
      };

      render("agent");

      document.addEventListener("agent", () => render("agent"));
      document.addEventListener("unlimited", () => render("unlimited"));
    });
}

document.addEventListener("faq", initializeFaq);
