import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";

function AddMenuItem() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Burger",
    price: "",
    availability: true,
  });

  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ========================================
  // HANDLE TEXT INPUT
  // ========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // ========================================
  // HANDLE IMAGE
  // ========================================

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setImage(null);
      return;
    }

    // Check image type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError(
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      );

      e.target.value = "";
      setImage(null);

      return;
    }

    // Check image size - 5MB
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");

      e.target.value = "";
      setImage(null);

      return;
    }

    setError("");
    setImage(selectedFile);
  };


  // ========================================
  // HANDLE SUBMIT
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login as admin first.");
        setLoading(false);
        return;
      }


      // ========================================
      // REQUIRED IMAGE
      // ========================================

      if (!image) {
        setError("Please select a food image.");
        setLoading(false);
        return;
      }


      // ========================================
      // CREATE FORMDATA
      // ========================================

      const data = new FormData();

      data.append("name", formData.name);

      data.append(
        "description",
        formData.description
      );

      data.append(
        "category",
        formData.category
      );

      data.append(
        "price",
        formData.price
      );

      data.append(
        "availability",
        formData.availability
      );

      // IMPORTANT
      // Must be same as upload.single("image")
      data.append("image", image);


      // ========================================
      // API REQUEST
      // ========================================

      const response = await fetch(
        "http://localhost:5000/api/menu-items",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: data,
        }
      );


      const result = await response.json();


      // ========================================
      // ERROR
      // ========================================

      if (!response.ok) {
        setError(
          result.message ||
          result.error ||
          "Failed to add menu item."
        );

        return;
      }


      // ========================================
      // SUCCESS
      // ========================================

      alert(
        "Menu item added successfully!"
      );

      navigate("/admin/menu");


    } catch (error) {

      console.error(
        "Add menu item error:",
        error
      );

      setError(
        "Cannot connect to backend server."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <AdminLayout>

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            Add Menu Item
          </h1>

          <p className="text-gray-500 mt-2">
            Add a new food item to TastyBites menu
          </p>

        </div>


        {/* ERROR */}

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}


        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-6 md:p-8"
        >

          {/* NAME */}

          <div className="mb-5">

            <label className="block font-medium mb-2">
              Food Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Chicken Burger"
              required
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>


          {/* DESCRIPTION */}

          <div className="mb-5">

            <label className="block font-medium mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Juicy chicken burger with fresh vegetables"
              required
              rows="4"
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>


          {/* CATEGORY */}

          <div className="mb-5">

            <label className="block font-medium mb-2">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >

              <option value="Burger">
                Burger
              </option>

              <option value="Pizza">
                Pizza
              </option>

              <option value="Chicken">
                Chicken
              </option>

              <option value="Drinks">
                Drinks
              </option>

              <option value="Dessert">
                Dessert
              </option>

            </select>

          </div>


          {/* PRICE */}

          <div className="mb-5">

            <label className="block font-medium mb-2">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="149"
              min="0"
              required
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>


          {/* IMAGE UPLOAD */}

          <div className="mb-5">

            <label className="block font-medium mb-2">
              Food Image
            </label>

            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageChange}
              required
              className="w-full border rounded-lg px-4 py-3"
            />

            <p className="text-sm text-gray-500 mt-2">
              JPG, JPEG, PNG or WEBP — Maximum 5MB
            </p>


            {/* IMAGE PREVIEW */}

            {image && (
              <div className="mt-4">

                <p className="text-sm font-medium mb-2">
                  Selected Image:
                </p>

                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg border"
                />

              </div>
            )}

          </div>


          {/* AVAILABILITY */}

          <div className="mb-6 flex items-center gap-3">

            <input
              type="checkbox"
              checked={formData.availability}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  availability:
                    e.target.checked,
                })
              }
              className="w-5 h-5"
            />

            <label className="font-medium">
              Available
            </label>

          </div>


          {/* BUTTONS */}

          <div className="flex gap-4">

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >

              {loading
                ? "Uploading..."
                : "Add Menu Item"}

            </button>


            <button
              type="button"
              onClick={() =>
                navigate("/admin/menu")
              }
              className="border px-6 py-3 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </AdminLayout>
  );
}

export default AddMenuItem;