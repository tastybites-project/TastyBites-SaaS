import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";

function Users() {

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ========================================
  // FETCH ALL USERS
  // ========================================

  const fetchUsers = async () => {

    try {

      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {

        setError("Authentication token not found.");

        return;
      }


      const response = await fetch(
        "http://localhost:5000/api/auth/users",
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      const data = await response.json();


      if (!response.ok) {

        setError(
          data.message ||
          "Failed to load users."
        );

        return;
      }


      setUsers(data.users || []);


    } catch (error) {

      console.error(
        "Fetch users error:",
        error
      );

      setError(
        "Cannot connect to backend server."
      );


    } finally {

      setLoading(false);

    }
  };


  // ========================================
  // LOAD USERS
  // ========================================

  useEffect(() => {

    fetchUsers();

  }, []);


  // ========================================
  // PAGE
  // ========================================

  return (

    <AdminLayout>

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            User Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage TastyBites registered users
          </p>

        </div>


        {/* ERROR */}

        {error && (

          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">

            {error}

          </div>

        )}


        {/* TOTAL USERS */}

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <p className="text-gray-500">
            Total Registered Users
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {users.length}
          </h2>

        </div>


        {/* USERS TABLE */}

        <div className="bg-white rounded-xl shadow overflow-hidden">

          {loading ? (

            <div className="p-8 text-center text-gray-500">

              Loading users...

            </div>

          ) : users.length === 0 ? (

            <div className="p-8 text-center text-gray-500">

              No registered users found.

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                {/* TABLE HEADER */}

                <thead className="bg-gray-100">

                  <tr>

                    <th className="text-left px-6 py-4">
                      #
                    </th>

                    <th className="text-left px-6 py-4">
                      Name
                    </th>

                    <th className="text-left px-6 py-4">
                      Email
                    </th>

                    <th className="text-left px-6 py-4">
                      Phone
                    </th>

                    <th className="text-left px-6 py-4">
                      Role
                    </th>

                    <th className="text-left px-6 py-4">
                      Created
                    </th>

                  </tr>

                </thead>


                {/* TABLE BODY */}

                <tbody>

                  {users.map((user, index) => (

                    <tr
                      key={user._id}
                      className="border-t hover:bg-gray-50"
                    >

                      <td className="px-6 py-4">
                        {index + 1}
                      </td>


                      <td className="px-6 py-4 font-medium">
                        {user.name}
                      </td>


                      <td className="px-6 py-4 text-gray-600">
                        {user.email}
                      </td>


                      <td className="px-6 py-4 text-gray-600">
                        {user.phone || "N/A"}
                      </td>


                      <td className="px-6 py-4">

                        <span
                          className={
                            user.role === "admin"
                              ? "px-3 py-1 rounded-full text-sm bg-black text-white"
                              : "px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-700"
                          }
                        >

                          {user.role || "user"}

                        </span>

                      </td>


                      <td className="px-6 py-4 text-gray-600">

                        {user.createdAt
                          ? new Date(
                              user.createdAt
                            ).toLocaleDateString()
                          : "N/A"}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </AdminLayout>

  );
}


export default Users;