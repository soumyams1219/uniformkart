import Cart from "../models/Cart.js";
import productModel from "../models/productSchema.js";

export const addToCart = async (req, res) => {
    try {
        const userId = req.userid;

        const {
            productId,
            quantity = 1,
            size,
            color,
        } = req.body;

        // Validation
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }

        // Check product exists
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Check stock
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock",
            });
        }

        // Find user's cart
        let cart = await Cart.findOne({ user: userId });

        // Create cart if not exists
        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [
                    {
                        product: productId,
                        quantity,
                        size,
                        color,
                    },
                ],
            });
        } else {

            // Check if same product + size + color already exists
            const existingItem = cart.items.find(
                (item) =>
                    item.product.toString() === productId.toString() &&
                    item.size === size &&
                    item.color === color
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({
                    product: productId,
                    quantity,
                    size,
                    color,
                });
            }
        }

        await cart.save();

        // Populate product details
        await cart.populate("items.product");

        return res.status(200).json({
            success: true,
            message: "Product added to cart successfully",
            cart,
        });

    } catch (error) {
        console.log("Add To Cart Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
export const getCart = async (req, res) => {
    try {
        const userId = req.userid;

        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        res.status(200).json({
            data: cart ? cart.items : [],
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching cart",
            error: error.message,
        });
    }
};
export const updateCartQuantity = async (req, res) => {
    try {
        const userId = req.userid;
        const { itemId, quantity } = req.body;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.id(itemId);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        item.quantity = quantity;

        await cart.save();

        res.status(200).json({
            message: "Quantity updated",
            data: cart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error updating quantity",
        });
    }
};
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.userid;
        const { itemId } = req.body;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // remove item using itemId
        cart.items = cart.items.filter(
            (item) => item._id.toString() !== itemId
        );

        await cart.save();

        res.status(200).json({
            message: "Item removed from cart",
            data: cart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error removing item",
        });
    }
};
