const product = window.__PRODUCT__;

new Swiper(".productSwiper", {
  loop: product.images.length > 1,
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  }
});

const qtyInput = document.getElementById("qtyInput");
const increaseQty = document.getElementById("increaseQty");
const decreaseQty = document.getElementById("decreaseQty");

function sanitizeQty(value) {
  const number = Number(value) || 1;
  return Math.max(1, Math.min(number, product.stock));
}

increaseQty.addEventListener("click", () => {
  qtyInput.value = sanitizeQty(Number(qtyInput.value) + 1);
});

decreaseQty.addEventListener("click", () => {
  qtyInput.value = sanitizeQty(Number(qtyInput.value) - 1);
});

qtyInput.addEventListener("input", () => {
  qtyInput.value = sanitizeQty(qtyInput.value);
});
