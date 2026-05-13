const formatter = new Intl.NumberFormat("vi-VN");
const productList = document.getElementById("productList");
const filterForm = document.getElementById("filterForm");
const resultCount = document.getElementById("resultCount");
const logoutBtn = document.getElementById("logoutBtn");

function productCard(item) {
  return `
    <article class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img src="${item.images[0]}" alt="${item.name}" class="w-full h-44 object-cover" />
      <div class="p-3">
        <div class="text-xs text-slate-500 mb-1">${item.category}</div>
        <h3 class="font-semibold mb-1">${item.name}</h3>
        <div class="text-blue-700 font-bold">${formatter.format(item.price)}đ</div>
        <div class="text-xs text-slate-500 mt-1">Tồn: ${item.stock} | Đã bán: ${item.soldCount}</div>
        <a href="/products/${item.id}" class="inline-block mt-3 text-sm text-blue-600 hover:underline">Xem chi tiết</a>
      </div>
    </article>
  `;
}

function renderProducts(items) {
  resultCount.textContent = `${items.length} sản phẩm`;
  if (!items.length) {
    productList.innerHTML = `
      <div class="col-span-full bg-white rounded-xl p-6 text-center text-slate-500">
        Không tìm thấy sản phẩm phù hợp bộ lọc.
      </div>
    `;
    return;
  }
  productList.innerHTML = items.map(productCard).join("");
}

async function fetchFilteredProducts(params) {
  const query = new URLSearchParams(params);
  const response = await fetch(`/api/products?${query.toString()}`);
  const data = await response.json();
  return data.data || [];
}

filterForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const rawEntries = new FormData(filterForm).entries();
  const payload = {};
  for (const [key, value] of rawEntries) {
    if (value !== "") payload[key] = value;
  }
  if (!payload.sort) payload.sort = "newest";

  const items = await fetchFilteredProducts(payload);
  renderProducts(items);
});

logoutBtn.addEventListener("click", async () => {
  await fetch("/api/auth/logout", { method: "POST" });
  window.location.href = "/login";
});

renderProducts(window.__PRODUCTS__ || []);
