const MenuItem = require("../models/MenuItem");

const cloudinary = require("../config/cloudinary");


// ========================================
// UPLOAD IMAGE TO CLOUDINARY
// ========================================

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "tastybites/menu",
        resource_type: "image",
      },

      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    stream.end(fileBuffer);
  });
};


// ========================================
// CREATE MENU ITEM
// ========================================

const createMenuItem = async (req, res) => {
  try {

    const {
      name,
      description,
      category,
      price,
      availability,
    } = req.body;


    // Required fields
    if (
      !name ||
      !description ||
      !category ||
      price === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }


    // ========================================
    // IMAGE UPLOAD
    // ========================================

    let imageUrl = "";


    if (req.file) {

      const result = await uploadToCloudinary(
        req.file.buffer
      );

      imageUrl = result.secure_url;
    }


    // ========================================
    // CREATE MENU ITEM
    // ========================================

    const menuItem = await MenuItem.create({

      name,

      description,

      category,

      price: Number(price),

      availability:
        availability === undefined
          ? true
          : availability === "true" ||
            availability === true,

      image: imageUrl,

    });


    res.status(201).json({

      success: true,

      message: "Menu item created successfully",

      menuItem,

    });


  } catch (error) {

    console.error(
      "Create menu item error:",
      error
    );


    res.status(500).json({

      success: false,

      message: "Server error",

      error: error.message,

    });
  }
};


// ========================================
// GET ALL MENU ITEMS
// ========================================

const getMenuItems = async (req, res) => {
  try {

    const menuItems = await MenuItem.find()
      .sort({
        createdAt: -1,
      });


    res.status(200).json({

      success: true,

      count: menuItems.length,

      menuItems,

    });


  } catch (error) {

    console.error(
      "Get menu items error:",
      error
    );


    res.status(500).json({

      success: false,

      message: "Server error",

      error: error.message,

    });
  }
};


// ========================================
// GET SINGLE MENU ITEM
// ========================================

const getMenuItemById = async (req, res) => {
  try {

    const menuItem =
      await MenuItem.findById(
        req.params.id
      );


    if (!menuItem) {

      return res.status(404).json({

        success: false,

        message: "Menu item not found",

      });
    }


    res.status(200).json({

      success: true,

      menuItem,

    });


  } catch (error) {

    console.error(
      "Get menu item error:",
      error
    );


    res.status(500).json({

      success: false,

      message: "Server error",

      error: error.message,

    });
  }
};


// ========================================
// UPDATE MENU ITEM
// ========================================

const updateMenuItem = async (req, res) => {
  try {

    const menuItem =
      await MenuItem.findById(
        req.params.id
      );


    if (!menuItem) {

      return res.status(404).json({

        success: false,

        message: "Menu item not found",

      });
    }


    // ========================================
    // UPDATE BASIC FIELDS
    // ========================================

    const {
      name,
      description,
      category,
      price,
      availability,
    } = req.body;


    if (name !== undefined) {
      menuItem.name = name;
    }


    if (description !== undefined) {
      menuItem.description = description;
    }


    if (category !== undefined) {
      menuItem.category = category;
    }


    if (price !== undefined) {
      menuItem.price = Number(price);
    }


    if (availability !== undefined) {

      menuItem.availability =
        availability === "true" ||
        availability === true;
    }


    // ========================================
    // UPDATE IMAGE
    // ========================================

    if (req.file) {

      const result =
        await uploadToCloudinary(
          req.file.buffer
        );


      menuItem.image =
        result.secure_url;
    }


    // ========================================
    // SAVE
    // ========================================

    await menuItem.save();


    res.status(200).json({

      success: true,

      message:
        "Menu item updated successfully",

      menuItem,

    });


  } catch (error) {

    console.error(
      "Update menu item error:",
      error
    );


    res.status(500).json({

      success: false,

      message: "Server error",

      error: error.message,

    });
  }
};


// ========================================
// DELETE MENU ITEM
// ========================================

const deleteMenuItem = async (req, res) => {
  try {

    const menuItem =
      await MenuItem.findByIdAndDelete(
        req.params.id
      );


    if (!menuItem) {

      return res.status(404).json({

        success: false,

        message: "Menu item not found",

      });
    }


    res.status(200).json({

      success: true,

      message:
        "Menu item deleted successfully",

    });


  } catch (error) {

    console.error(
      "Delete menu item error:",
      error
    );


    res.status(500).json({

      success: false,

      message: "Server error",

      error: error.message,

    });
  }
};


// ========================================
// EXPORT
// ========================================

module.exports = {

  createMenuItem,

  getMenuItems,

  getMenuItemById,

  updateMenuItem,

  deleteMenuItem,

};