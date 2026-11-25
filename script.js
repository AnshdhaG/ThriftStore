const listings = [
  {
    id: 1, title: "Wooden Study Desk", price: 50, category: "Furniture", subcategory: "Desks", condition: "Good Condition",
    seller: "Jamie Reid", location: "Antigonish, NS", date: "2025-11-24", quantity: 1,
    image: "https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=900&q=82",
    description: "A sturdy wooden desk with a clean, simple finish. A few small signs of use, but plenty of room for a laptop, books and a late-night study session."
  },
  {
    id: 2, title: "Ergonomic Office Chair", price: 45, category: "Furniture", subcategory: "Chairs", condition: "Very Good",
    seller: "Sam Taylor", location: "Antigonish, NS", date: "2025-11-23", quantity: 1,
    image: "https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=900&q=82",
    description: "Comfortable desk chair with supportive back and adjustable height. Clean and ready for another semester of study."
  },
  {
    id: 3, title: "Small Bookshelf", price: 30, category: "Furniture", subcategory: "Shelving", condition: "Good Condition",
    seller: "Morgan Lee", location: "Antigonish, NS", date: "2025-11-22", quantity: 1,
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=900&q=82",
    description: "Compact wooden bookshelf that fits nicely beside a desk or bed. Holds a good stack of books and a few small room essentials."
  },
  {
    id: 4, title: "Bedside Table", price: 25, category: "Furniture", subcategory: "Storage", condition: "Like New",
    seller: "Riley Campbell", location: "Antigonish, NS", date: "2025-11-21", quantity: 1,
    image: "https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=900&q=82&sat=-35",
    description: "A tidy little bedside table with a drawer for the bits and pieces you want close at hand. Barely used and in lovely shape."
  },
  {
    id: 5, title: "Financial Accounting Textbook", price: 35, category: "Books", subcategory: "Accounting", condition: "Good Condition",
    seller: "Alex Patel", location: "Antigonish, NS", date: "2025-11-20", quantity: 3,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=82",
    description: "A helpful introduction to financial accounting, with clear explanations and plenty of practice examples. Some highlighting in a few chapters."
  },
  {
    id: 6, title: "Introduction to Microeconomics", price: 30, category: "Books", subcategory: "Economics", condition: "Very Good",
    seller: "Noah Fraser", location: "Antigonish, NS", date: "2025-11-19", quantity: 2,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=900&q=82",
    description: "A well-kept microeconomics text covering the fundamentals. Pages are clean, binding is intact, and there are no notes inside."
  },
  {
    id: 7, title: "Business Management Textbook", price: 25, category: "Books", subcategory: "Business", condition: "Good Condition",
    seller: "Taylor MacNeil", location: "Antigonish, NS", date: "2025-11-18", quantity: 2,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=82",
    description: "An accessible overview of business management and organizations. Light wear on the cover from a semester of use."
  },
  {
    id: 8, title: "The Psychology of Money", price: 15, category: "Books", subcategory: "Fiction", condition: "Like New",
    seller: "Casey Murphy", location: "Antigonish, NS", date: "2025-11-17", quantity: 1,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=900&q=82",
    description: "A thoughtful, easy-to-read book about how people think about money. Read once and in near-new condition."
  }
];

const categorySubcategories = {
  Furniture: ["Desks", "Chairs", "Shelving", "Storage", "Other Furniture"],
  Books: ["Business", "Economics", "Accounting", "Fiction", "Other Books"]
};

const formatPrice = (price) => new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(price);

function initMobileNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-nav");
  if (!toggle || !navigation) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    navigation.classList.toggle("is-open", !isOpen);
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      navigation.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation menu");
    }
  });
}

function initMarketplace() {
  const grid = document.querySelector("#product-grid");
  if (!grid) return;

  const search = document.querySelector("#product-search");
  const sortSelect = document.querySelector("#sort-select");
  const subcategorySelect = document.querySelector("#subcategory-select");
  const categoryButtons = [...document.querySelectorAll(".filter-tab")];
  const resultsCount = document.querySelector("#results-count");
  const emptyState = document.querySelector("#empty-state");
  const allCount = document.querySelector("#all-count");
  const detailDialog = document.querySelector("#detail-dialog");
  const sellDialog = document.querySelector("#sell-dialog");
  let activeCategory = "All Items";

  allCount.textContent = String(listings.length).padStart(2, "0");

  function setSubcategories(category) {
    subcategorySelect.replaceChildren();
    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = category === "All Items" ? "All categories" : `All ${category.toLowerCase()}`;
    subcategorySelect.append(allOption);
    (categorySubcategories[category] || []).forEach((subcategory) => {
      const option = document.createElement("option");
      option.value = subcategory;
      option.textContent = subcategory;
      subcategorySelect.append(option);
    });
    subcategorySelect.disabled = category === "All Items";
  }

  function createCard(item) {
    const card = document.createElement("article");
    card.className = "product-card market-card";
    card.innerHTML = `
      <div class="product-image">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <span class="condition-pill">${item.condition}</span>
        <span class="save-mark" aria-hidden="true">↗</span>
      </div>
      <div class="product-info">
        <div class="product-meta"><span>${item.category} · ${item.subcategory}</span><span>${item.location}</span></div>
        <h3>${item.title}</h3>
        <div class="product-bottom"><strong>${formatPrice(item.price)} <small>CAD</small></strong></div>
        <div class="card-seller"><span class="mini-avatar" aria-hidden="true">${item.seller.charAt(0)}</span>Listed by ${item.seller}</div>
        <button class="view-details" type="button" data-listing-id="${item.id}" aria-label="View details for ${item.title}">View details <span aria-hidden="true">↗</span></button>
      </div>`;
    return card;
  }

  function render() {
    const query = search.value.trim().toLocaleLowerCase();
    let filtered = listings.filter((item) => {
      const categoryMatches = activeCategory === "All Items" || item.category === activeCategory;
      const subcategory = subcategorySelect.value;
      const subcategoryMatches = subcategory === "all" || item.subcategory === subcategory ||
        (subcategory === "Other Furniture" && item.category === "Furniture" && !categorySubcategories.Furniture.slice(0, 4).includes(item.subcategory)) ||
        (subcategory === "Other Books" && item.category === "Books" && !categorySubcategories.Books.slice(0, 4).includes(item.subcategory));
      return categoryMatches && subcategoryMatches && item.title.toLocaleLowerCase().includes(query);
    });

    if (sortSelect.value === "price-low") filtered = filtered.sort((a, b) => a.price - b.price);
    if (sortSelect.value === "price-high") filtered = filtered.sort((a, b) => b.price - a.price);
    if (sortSelect.value === "recent") filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    grid.replaceChildren(...filtered.map(createCard));
    const countLabel = filtered.length === 1 ? "find" : "finds";
    resultsCount.textContent = filtered.length === listings.length && !query && activeCategory === "All Items"
      ? `Showing all ${filtered.length} finds`
      : `Showing ${filtered.length} ${countLabel}`;
    emptyState.hidden = filtered.length > 0;
    grid.hidden = filtered.length === 0;
  }

  function selectCategory(category) {
    activeCategory = category;
    categoryButtons.forEach((button) => {
      const selected = button.dataset.category === category;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    setSubcategories(category);
    render();
  }

  categoryButtons.forEach((button) => button.addEventListener("click", () => selectCategory(button.dataset.category)));
  search.addEventListener("input", render);
  sortSelect.addEventListener("change", render);
  subcategorySelect.addEventListener("change", render);
  document.querySelector("#reset-filters").addEventListener("click", () => {
    search.value = "";
    sortSelect.value = "recent";
    selectCategory("All Items");
  });

  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get("category");
  selectCategory(categorySubcategories[requestedCategory] ? requestedCategory : "All Items");
  const requestedSubcategory = params.get("subcategory");
  if (requestedSubcategory && [...subcategorySelect.options].some((option) => option.value === requestedSubcategory)) {
    subcategorySelect.value = requestedSubcategory;
    render();
  }

  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-listing-id]");
    if (!button) return;
    const item = listings.find((listing) => listing.id === Number(button.dataset.listingId));
    if (item) showDetails(item);
  });

  function showDetails(item) {
    const isBook = item.category === "Books";
    document.querySelector("#detail-image").src = item.image;
    document.querySelector("#detail-image").alt = item.title;
    document.querySelector("#detail-category").textContent = `${item.category} · ${item.subcategory}`;
    document.querySelector("#detail-title").textContent = item.title;
    document.querySelector("#detail-price").textContent = `${formatPrice(item.price)} CAD`;
    document.querySelector("#detail-description").textContent = item.description;
    document.querySelector("#detail-condition").textContent = item.condition;
    document.querySelector("#detail-avatar").textContent = item.seller.charAt(0);
    document.querySelector("#detail-seller").textContent = item.seller;
    document.querySelector("#detail-location").textContent = item.location;
    document.querySelector("#quantity-field").hidden = !isBook;
    const quantity = document.querySelector("#detail-quantity");
    quantity.replaceChildren();
    const availableQuantity = isBook ? item.quantity : 1;
    for (let count = 1; count <= availableQuantity; count += 1) {
      const option = document.createElement("option");
      option.value = String(count);
      option.textContent = String(count);
      quantity.append(option);
    }
    document.querySelector("#pickup-select").value = "Campus pickup";
    document.querySelector("#contact-message").hidden = true;
    detailDialog.showModal();
  }

  document.querySelector("#contact-seller").addEventListener("click", () => {
    const pickup = document.querySelector("#pickup-select").value;
    const quantity = document.querySelector("#quantity-field").hidden ? 1 : Number(document.querySelector("#detail-quantity").value);
    const itemName = document.querySelector("#detail-title").textContent;
    const message = document.querySelector("#contact-message");
    message.textContent = `Demo confirmation: your interest in ${itemName}${quantity > 1 ? ` (quantity ${quantity})` : ""} with ${pickup.toLowerCase()} preference is noted here. No message or transaction was sent.`;
    message.hidden = false;
  });

  document.querySelectorAll("[data-open-sell]").forEach((button) => button.addEventListener("click", () => {
    document.querySelector("#listing-form").hidden = false;
    document.querySelector("#listing-success").hidden = true;
    sellDialog.showModal();
  }));
  document.querySelector("#listing-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const success = document.querySelector("#listing-success");
    success.textContent = `Demo listing preview ready: “${data.get("title")}” in ${data.get("category")} at ${formatPrice(Number(data.get("price")))} CAD, marked ${data.get("condition").toString().toLowerCase()}. Nothing was published or saved.`;
    success.hidden = false;
    form.hidden = true;
  });

  [detailDialog, sellDialog].forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
      if (event.target.closest("[data-close-dialog]")) dialog.close();
    });
  });
  render();
}

initMobileNavigation();
initMarketplace();
