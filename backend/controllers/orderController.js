import orderModel from "../models/orderSchema.js";
import Cart from "../models/Cart.js";
import productModel from "../models/productSchema.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {

    const {
      shippingAddress,
      paymentMethod,
    } = req.body;

    // Find cart
    const cart = await Cart.findOne({
      user: req.userid,
    });

    // Empty cart validation
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let totalAmount = 0;

    const orderItems = [];

    // Validate inventory
    for (const item of cart.items) {

      // Find product
      const product = await productModel.findById(
        item.product
      );

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // Find matching variant
      const variant = product.variants.find(
        (variant) =>
          variant.size === item.size &&
          variant.color === item.color
      );

      if (!variant) {
        return res.status(400).json({
          success: false,
          message: "Product variant not found",
        });
      }

      // Stock validation
      if (variant.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.productName} only ${variant.stock} items available`,
        });
      }

      // Reduce stock
      variant.stock -= item.quantity;

      await product.save();

      // Product price
      const price =
        variant.offerPrice ||
        variant.price ||
        product.offerPrice ||
        product.price;

      // Total amount
      totalAmount +=
        price * item.quantity;

      // Order items
      orderItems.push({
        product: product._id,

        name: product.productName,

        image: product.images?.[0],

        price: price,

        size: item.size,

        color: item.color,

        quantity: item.quantity,
      });
    }

    // Create order
    const order = await orderModel.create({

      user: req.userid,

      items: orderItems,

      shippingAddress,

      totalAmount,

      paymentMethod,

      paymentStatus: "Paid",

      orderStatus: "Placed",
    });

    // Clear cart
    cart.items = [];

    await cart.save();

    return res.status(201).json({
      success: true,

      message: "Order placed successfully",

      data: order,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// get user orders
export const getUserOrders = async (req, res) => {
  try {
    
    const orders = await orderModel

      .find({
        user: req.userid,
      })

      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,

      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// get single order details
export const getOrderDetails = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);

    // order not found
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,

      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // prevent update after delivery
    if (order.orderStatus === "Delivered") {
      return res.status(400).json({
        message: "Delivered order cannot be updated",
      });
    }

    // prevent update after cancel
    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({
        message: "Cancelled order cannot be updated",
      });
    }

    order.orderStatus = orderStatus;

    await order.save();

    res.status(200).json({
      success: true,

      message: "Order status updated",

      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// ADMIN - get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel
            .find()
            .populate("user", "username email phone")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
