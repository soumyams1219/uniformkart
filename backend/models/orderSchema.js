import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "PRODUCT",

    required: true,
  },

  name: {
    type: String,
  },

  image: {
    type: String,
  },

  price: {
    type: Number,
  },

  size: {
    type: String,
  },

  color: {
    type: String,
  },

  quantity: {
    type: Number,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    items: [orderItemSchema],

    shippingAddress: {
      fullName: String,

      mobile: String,

      address: String,

      city: String,

      state: String,

      pincode: String,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      default:"Card"
    },

    paymentStatus: {
      type: String,

      enum: ["Pending", "Paid", "Failed"],

      default: "Pending",
    },

    orderStatus: {
      type: String,

      enum: ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"],

      default: "Placed",
    },

    razorpayOrderId: String,

    razorpayPaymentId: String,
  },

  {
    timestamps: true,
  },
);

const orderModel = mongoose.model("ORDER", orderSchema);
export default orderModel;
