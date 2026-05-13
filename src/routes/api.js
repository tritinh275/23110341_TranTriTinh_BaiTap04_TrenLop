const express = require("express");
const { Product } = require("../models/Product");
const { User } = require("../models/User");
const { signMemberToken } = require("../utils/jwt");
const { requireMemberApi } = require("../middleware/auth");

const apiRouter = express.Router();

function parseBoolean(value) {
  if (typeof value === "boolean") return value;
  if (typeof value !== "string") return false;
  return value.toLowerCase() === "true";
}

function buildProductFilter(query) {
  const {
    q,
    category,
    minPrice,
    maxPrice,
    minRating,
    onlyInStock,
    isNew,
    bestSeller,
    sort
  } = query;

  const qText = (q || "").trim();
  const categoryText = (category || "").trim();
  const minPriceNumber = Number(minPrice) || 0;
  const maxPriceNumber = Number(maxPrice) || Number.MAX_SAFE_INTEGER;
  const minRatingNumber = Number(minRating) || 0;

  const filter = {
    price: { $gte: minPriceNumber, $lte: maxPriceNumber },
    rating: { $gte: minRatingNumber }
  };

  if (qText) {
    const regex = new RegExp(qText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [{ name: regex }, { description: regex }, { category: regex }];
  }
  if (categoryText) filter.category = categoryText;
  if (parseBoolean(onlyInStock)) filter.stock = { $gt: 0 };
  if (parseBoolean(isNew)) filter.isNew = true;
  if (parseBoolean(bestSeller)) filter.bestSeller = true;

  const sortOption =
    sort === "price-asc"
      ? { price: 1 }
      : sort === "price-desc"
        ? { price: -1 }
        : sort === "best-seller"
          ? { soldCount: -1 }
          : { createdAt: -1 };

  return { filter, sortOption };
}

apiRouter.post("/auth/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password }).lean();

    if (!user || user.role !== "member") {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    const token = signMemberToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 8 * 60 * 60 * 1000
    });

    return res.json({
      message: "Đăng nhập thành công",
      user: { username: user.username, fullName: user.fullName, role: user.role }
    });
  } catch (error) {
    return next(error);
  }
});

apiRouter.post("/auth/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Đã đăng xuất" });
});

apiRouter.get("/auth/me", requireMemberApi, (req, res) => {
  return res.json({ user: req.user });
});

apiRouter.get("/categories", async (req, res, next) => {
  try {
    const categories = await Product.distinct("category");
    categories.sort((a, b) => a.localeCompare(b));
    return res.json({ categories });
  } catch (error) {
    return next(error);
  }
});

apiRouter.get("/products", async (req, res, next) => {
  try {
    const { page = "1", limit = "8" } = req.query;
    const { filter, sortOption } = buildProductFilter(req.query);

    const pageNumber = Math.max(Number(page) || 1, 1);
    const limitNumber = Math.max(Number(limit) || 8, 1);
    const skip = (pageNumber - 1) * limitNumber;

    const [total, data] = await Promise.all([
      Product.countDocuments(filter),
      Product.find(filter).sort(sortOption).skip(skip).limit(limitNumber).lean()
    ]);

    const totalPages = Math.max(Math.ceil(total / limitNumber), 1);

    return res.json({
      data,
      meta: { total, page: pageNumber, limit: limitNumber, totalPages }
    });
  } catch (error) {
    return next(error);
  }
});

apiRouter.get("/products/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const product = await Product.findOne({ id }).lean();
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    return res.json({ data: product });
  } catch (error) {
    return next(error);
  }
});

module.exports = { apiRouter };
