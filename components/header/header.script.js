function initializeHeader() {
  const productsHeader = document.querySelector(".header-products");
  const modalOverlay = document.querySelector(".modal-overlay");

  productsHeader.addEventListener("mouseenter", openExpandHeaderModal);
  const headerExpandProducts = document.querySelector(
    ".header-expand-products"
  );
  headerExpandProducts.addEventListener(
    "mouseleave",
    closeExpandHeaderProductsModal
  );

  function openExpandHeaderModal() {
    document.querySelector(".header-expand-products").style.display = "grid";
    const expandNavbarFeatures = document.querySelector(
      ".navbar-features-expand-container"
    );
    const expandNavbarSolutions = document.querySelector(
      ".navbar-solutions-expand-container"
    );
    const expandNavbarResources = document.querySelector(
      ".navbar-resources-expand-container"
    );
    expandNavbarFeatures.classList.remove("active");
    expandNavbarSolutions.classList.remove("active");
    expandNavbarResources.classList.remove("active");

    const header = document.getElementById("header");
    const y = header.getBoundingClientRect().bottom;

    modalOverlay.style.display = "block";
    modalOverlay.style.top = y + "px";

    productsHeader.style.background = "#FFF";
    productsHeader.style.border = "1px solid rgb(0 0 0 / 10%)";
    productsHeader.querySelector(".arrow-down").classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeExpandHeaderProductsModal() {
    document.querySelector(".header-expand-products").style.display = "none";
    modalOverlay.style.display = "none";
    productsHeader.style.background = "#ffecec";
    productsHeader.style.border = "1px solid rgb(255 58 58 / 20%)";
    productsHeader.style.borderBottom = "0";
    productsHeader.querySelector(".arrow-down").classList.remove("active");
    document.body.style.overflow = "scroll";
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth < 1200) {
      closeExpandHeaderProductsModal();
    }
  });
}

document.addEventListener("header", initializeHeader);
