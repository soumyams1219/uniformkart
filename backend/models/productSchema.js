import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ["Regular", "Sports", "Accessories"],
    required: true
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true
  },
  variants: [variantSchema],
  images: [
    {
      type: String
    }
  ],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const productModel = mongoose.model("PRODUCT",productSchema);

export default productModel;