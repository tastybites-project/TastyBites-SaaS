import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";

function EditMenuItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Burger",
    price: "",
    availability: true,
  });

  const [oldImage, setOldImage] = useState("");
  const [newImage, setNewImage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // =================================
  // GET SINGLE MENU ITEM
  // =================================

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/menu-items/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.message ||
              data.error ||
              "Failed to load menu item."
          );
          return;
        }

        const item = data.menuItem || data;

        setFormData({
          name: item.name || "",
          description: item.description || "",
          category: item.category || "Burger",
          price: item.price || "",
          availability:
            item.availability !== undefined
              ? item.availability
              : true,
        });

        setOldImage(item.image || "");
      } catch (error) {
        console.error(error);
        setError("Cannot connect to backend server.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [id]);

  // =================================
  // HANDLE INPUT
  // =================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // =================================
  // HANDLE IMAGE
  // =================================

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setNewImage(null);
      return;
    }

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
      setNewImage(null);

      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");

      e.target.value = "";
      setNewImage(null);

      return;
    }

    setError("");
    setNewImage(selectedFile);
  };

  // =================================
  // UPDATE MENU ITEM
  // =================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login as admin first.");
        setSaving(false);
        return;
      }

      // =================================
      // CREATE FORMDATA
      // =================================

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

      // Add new image only if selected
      if (newImage) {
        data.append("image", newImage);
      }

      // =================================
      // API REQUEST
      // =================================

      const response = await fetch(
        `http://localhost:5000/api/menu-items/${id}`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(
          result.message ||
            result.error ||
            "Failed to update menu item."
        );
        return;
      }

      alert(
        "Menu item updated successfully!"
      );

      navigate("/admin/menu");
    } catch (error) {
      console.error(error);

      setError(
        "Cannot connect to backend server."
      );
    } finally {
      setSaving(false);
    }
  };

  // =================================
  // LOADING
  // =================================

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 text-center">
          Loading menu item...
        </div>
      </AdminLayout>
    );
  }

  // =================================
  // PAGE
  // =================================

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Edit Menu Item
          </h1>

          <p className="text-gray-500 mt-2">
            Update TastyBites menu item
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
              min="0"
              required
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>


          {/* CURRENT IMAGE */}

          {oldImage && (
            <div className="mb-5">

              <label className="block font-medium mb-2">
                Current Image
              </label>

              <img
                src={oldImage}
                alt={formData.name}
                className="w-40 h-40 object-cover rounded-lg border"
              />

            </div>
          )}


          {/* NEW IMAGE */}

          <div className="mb-5">

            <label className="block font-medium mb-2">
              Change Image
            </label>

            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageChange}
              className="w-full border rounded-lg px-4 py-3"
            />

            <p className="text-sm text-gray-500 mt-2">
              Leave empty to keep the current image.
              JPG, JPEG, PNG or WEBP — Maximum 5MB
            </p>


            {/* NEW IMAGE PREVIEW */}

            {newImage && (
              <div className="mt-4">

                <p className="text-sm font-medium mb-2">
                  New Image Preview
                </p>

                <img
                  src={URL.createObjectURL(newImage)}
                  alt="New preview"
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
              disabled={saving}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {saving
                ? "Updating..."
                : "Update Menu Item"}
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

export default EditMenuItem;