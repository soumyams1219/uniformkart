import productModel from "../models/productSchema.js";

//product create
export const productCreate = async (req, res) => {
  try {

    console.log("BODY", req.body);

    const images =
      typeof req.body.images === "string"
        ? JSON.parse(req.body.images)
        : req.body.images || [];

    const variants =
      typeof req.body.variants === "string"
        ? JSON.parse(req.body.variants)
        : req.body.variants || [];

    const productData = {
      ...req.body,
      images,
      variants
    };

    const product = await productModel.create(productData);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
//product get and search
export const getProducts = async (req, res) => {
  try {

    const {
      search = "",
      category = "",
      school = "",
    } = req.query;

    let query = {};

    // search
    if (search.trim()) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // category filter
    if (category) {
      query.category = category;
    }

    // school filter
    if (school) {
      query.school = school;
    }

    const products = await productModel
      .find(query)
      .populate("school");

      //console.log("products",products);

    res.status(200).json({
      success: true,
      data: products,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
//product by id
export const getProductById = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .populate("school");

    res.status(200).json({ data: product, success: true });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//update product
export const updateProduct = async (req, res) => {
  try {

    const id = req.params.id;

    // SAFE images handling
    let images = [];

    if (req.body.images) {
      images =
        typeof req.body.images === "string"
          ? JSON.parse(req.body.images)
          : req.body.images;
    }

    // SAFE variants handling
    let variants;

    if (req.body.variants) {
      variants =
        typeof req.body.variants === "string"
          ? JSON.parse(req.body.variants)
          : req.body.variants;
    }

    let updateData = {
      ...req.body,
    };

    if (images.length) {
      updateData.images = images;
    }

    if (variants) {
      updateData.variants = variants;
    }

    const updatedProduct =
      await productModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

    res.status(200).json({
      message: "Product updated successfully",
      success: true,
      data: updatedProduct,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//delete product
export const deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product deleted successfully",
      success: true
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get featured products
export const getFeaturedProducts = async (req, res) => {
  try {
    const product = await productModel
      .find({}).sort({
        createdAt: -1,
      }).limit(4);

    res.status(200).json({ data: product, success: true });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

