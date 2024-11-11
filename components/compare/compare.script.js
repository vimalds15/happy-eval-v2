function initializeCompare() {
  fetch("mock/data.json")
    .then((response) => response.json())
    .then((data) => {
      const render = (pageType) => {
        const moreItemsData = data[pageType].compare;

        const container = document.querySelector(".compare-plans-container");
        const tableContainer = container.querySelector(
          ".plans-table-container"
        );
        const grid = tableContainer.querySelector(".plans-grid");

        grid.innerHTML = "";
        const headerRow = document.createElement("div");
        headerRow.classList.add("plans-grid-header");

        const rowHeader = document.createElement("div");
        rowHeader.classList.add("plans-grid-header-item", "row-header");
        headerRow.appendChild(rowHeader);

        moreItemsData.headers.forEach((header) => {
          const headerItem = document.createElement("div");
          headerItem.classList.add("plans-grid-header-item");
          headerItem.textContent = header;
          headerRow.appendChild(headerItem);
        });

        grid.appendChild(headerRow);
        moreItemsData.features.forEach((featureGroup) => {
          if (featureGroup.category) {
            const categoryDiv = document.createElement("div");
            categoryDiv.classList.add("plans-grid-category");

            const categoryHeader = document.createElement("div");
            categoryHeader.classList.add("plans-grid-category-header");
            categoryHeader.textContent = featureGroup.category;
            categoryDiv.appendChild(categoryHeader);

            grid.appendChild(categoryDiv);
          }

          const featureRows = [];

          featureGroup.items.forEach((feature, index) => {
            const row = document.createElement("div");
            row.classList.add("plans-grid-row");

            const featureNameColumn = document.createElement("div");
            featureNameColumn.classList.add("plans-grid-item", "row-header");
            featureNameColumn.innerHTML = `<p>${feature.header}</p>`;
            row.appendChild(featureNameColumn);

            moreItemsData.headers.forEach((plan) => {
              const planColumn = document.createElement("div");
              planColumn.classList.add("plans-grid-item");

              let featureValue =
                feature[
                  plan === "Enterprise PRO" ? "epro" : plan.toLowerCase()
                ];

              if (typeof featureValue === "boolean") {
                const tick = document.createElement("div");
                tick.classList.add(
                  featureValue ? "pricing-tick" : "pricing-no-tick"
                );
                planColumn.appendChild(tick);
              } else if (featureValue === null) {
                planColumn.textContent = "maybe";
              } else {
                planColumn.textContent = featureValue;
              }

              row.appendChild(planColumn);
            });

            featureRows.push(row);
          });

          const visibleRows = featureRows.slice(0, 5);
          const hiddenRows = featureRows.slice(5);
          const categoryButton = createShowMoreButton(visibleRows, hiddenRows);

          visibleRows.forEach((row) => grid.appendChild(row));

          if (hiddenRows.length > 0) {
            hiddenRows.forEach((row) => {
              row.classList.add("hidden-row");
              grid.appendChild(row);
            });

            categoryButton.addEventListener("click", () => {
              const allRowsVisible = !hiddenRows.some((row) =>
                row.classList.contains("hidden-row")
              );

              if (allRowsVisible) {
                categoryButton.textContent = "View All";
                hiddenRows.forEach((row) => row.classList.add("hidden-row"));
              } else {
                categoryButton.textContent = "View Less";
                hiddenRows.forEach((row) => row.classList.remove("hidden-row"));
              }
            });
            grid.appendChild(categoryButton);
          }
        });
      };

      render("agent");
      document.addEventListener("agent", () => render("agent"));
      document.addEventListener("unlimited", () => render("unlimited"));
    })
    .catch((error) => console.error("Error loading the JSON data:", error));
}

function createShowMoreButton(visibleRows, hiddenRows) {
  const showMoreButton = document.createElement("button");
  showMoreButton.classList.add("show-more-button");
  showMoreButton.textContent = hiddenRows.length > 0 ? "View All" : "View Less";
  return showMoreButton;
}

document.addEventListener("compare", initializeCompare);
