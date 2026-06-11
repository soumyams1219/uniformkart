import School from "../models/School.js";


export const createSchool = async (req, res) => {
  try {
    const { name, address, logo, contactEmail,contactPhone} = req.body;

    const school = new School({
      name,
      address,
      logo,
      contactEmail,
      contactPhone,
    });

    const savedSchool = await school.save();
    res.status(201).json({ data: savedSchool });
  } catch (error) {
    res.status(500).json({ message: " Internal Server error" + error.message });
  }
};

// Get a school
export const getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }
    res
      .status(200)
      .json({ data: school, message: "School fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: " Internal Server error" + error.message });
  }
};

// Get all School

export const getSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.status(200).json({ data: schools });
  } catch (error) {
    res.status(500).json({ message: " Internal Server error" + error.message });
  }
};

//Update School

export const updateSchool = async (req, res) => {
  try {
    const updated = await School.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ data: updated, message: "School Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: " Internal Server error" + error.message });
  }
};

// Delete School

export const deleteSchool = async (req, res) => {
  try {
    await School.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "School Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: " Internal Server error" + error.message });
  }
};

//Get School Product

export const getSchoolProducts = async (req, res) => {
  try {
    const products = await Product.find({
      school: req.params.schoolId,
    });
    res
      .status(200)
      .json({ data: products, message: "Product fetch successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" + error.message });
  }
};
