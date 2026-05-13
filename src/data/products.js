const PRODUCTS = [
  {
    id: 1,
    slug: "runner-pro-v1",
    name: "Runner Pro V1",
    category: "Running",
    price: 1290000,
    originalPrice: 1590000,
    rating: 4.7,
    stock: 18,
    soldCount: 142,
    isNew: true,
    bestSeller: true,
    createdAt: "2026-04-30",
    promoLabel: "Giảm 19%",
    description:
      "Giày chạy bộ nhẹ, đế êm, form ôm chân, phù hợp cho người tập luyện hằng ngày.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 2,
    slug: "runner-pro-v2",
    name: "Runner Pro V2",
    category: "Running",
    price: 1490000,
    originalPrice: 1790000,
    rating: 4.8,
    stock: 6,
    soldCount: 95,
    isNew: true,
    bestSeller: false,
    createdAt: "2026-05-08",
    promoLabel: "Mới",
    description: "Bản nâng cấp của Runner Pro V1 với độ bám đường và độ bền cao hơn.",
    images: [
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 3,
    slug: "street-flex",
    name: "Street Flex",
    category: "Lifestyle",
    price: 990000,
    originalPrice: 1190000,
    rating: 4.5,
    stock: 28,
    soldCount: 210,
    isNew: false,
    bestSeller: true,
    createdAt: "2026-03-22",
    promoLabel: "Bán chạy",
    description: "Giày lifestyle dễ mang đi học, đi làm và đi chơi.",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 4,
    slug: "street-flex-neo",
    name: "Street Flex Neo",
    category: "Lifestyle",
    price: 1190000,
    originalPrice: 1390000,
    rating: 4.6,
    stock: 12,
    soldCount: 132,
    isNew: true,
    bestSeller: false,
    createdAt: "2026-05-01",
    promoLabel: "Giảm 14%",
    description: "Phiên bản mới của Street Flex với lót đế mềm hơn.",
    images: [
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 5,
    slug: "gym-core-x",
    name: "Gym Core X",
    category: "Training",
    price: 1090000,
    originalPrice: 1290000,
    rating: 4.4,
    stock: 20,
    soldCount: 88,
    isNew: false,
    bestSeller: false,
    createdAt: "2026-02-15",
    promoLabel: "Giảm 15%",
    description: "Giày tập gym đế bằng, ổn định cho bài squat và deadlift.",
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 6,
    slug: "gym-core-air",
    name: "Gym Core Air",
    category: "Training",
    price: 1390000,
    originalPrice: 1690000,
    rating: 4.7,
    stock: 9,
    soldCount: 121,
    isNew: true,
    bestSeller: true,
    createdAt: "2026-05-05",
    promoLabel: "Best Seller",
    description: "Phiên bản nhẹ hơn của dòng Gym Core, phù hợp tập đa năng.",
    images: [
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 7,
    slug: "trail-max",
    name: "Trail Max",
    category: "Running",
    price: 1590000,
    originalPrice: 1890000,
    rating: 4.9,
    stock: 5,
    soldCount: 74,
    isNew: false,
    bestSeller: true,
    createdAt: "2026-01-28",
    promoLabel: "Premium",
    description: "Giày trail có độ bám tốt cho địa hình phức tạp.",
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 8,
    slug: "daily-lite",
    name: "Daily Lite",
    category: "Lifestyle",
    price: 790000,
    originalPrice: 990000,
    rating: 4.3,
    stock: 35,
    soldCount: 260,
    isNew: false,
    bestSeller: true,
    createdAt: "2025-12-16",
    promoLabel: "Giá tốt",
    description: "Mẫu giày phổ thông, dễ phối đồ và mang cả ngày.",
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=1200&q=80"
    ]
  }
];

const CATEGORIES = [...new Set(PRODUCTS.map((item) => item.category))];

module.exports = { PRODUCTS, CATEGORIES };
