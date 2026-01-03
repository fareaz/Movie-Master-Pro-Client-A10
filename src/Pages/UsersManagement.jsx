import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import useRole from "../hooks/useRole";
import Loading from "./Loading";

const UsersManagement = () => {
  const { user } = useContext(AuthContext);
  const { role, roleLoading } = useRole();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch users (admin only)
  useEffect(() => {
    if (roleLoading) return;

    if (role !== "admin" || user?.email !== "admin@gmail.com") {
      setLoading(false);
      return;
    }

    axios
      .get(`https://movie-master-server-theta.vercel.app/users?email=${user.email}`)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [role, roleLoading, user?.email]);

  if (roleLoading || loading) return <Loading />;

  if (role !== "admin" || user?.email !== "admin@gmail.com") {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        Access Denied
      </div>
    );
  }

  // 🔹 Role change
  const handleRoleChange = async (id, newRole) => {
    await axios.patch(`https://movie-master-server-theta.vercel.app/users/role/${id}`, {
      role: newRole,
      adminEmail: user.email,
    });

    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
    );

    Swal.fire("Success", "Role updated", "success");
  };

  // 🔹 Delete user
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete user?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    await axios.delete(
      `https://movie-master-server-theta.vercel.app/users/${id}?email=${user.email}`
    );

    setUsers((prev) => prev.filter((u) => u._id !== id));

    Swal.fire("Deleted", "User removed", "success");
  };

 return (
  <div className="max-w-6xl mx-auto p-4 sm:p-6">
    <h2 className="text-xl sm:text-3xl font-bold mb-6">
      Admin <span className="text-red-600">User Management</span>
    </h2>

    
    <div className="hidden md:block overflow-x-auto bg-base-100 shadow-xl rounded-xl">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Change Role</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td className="text-sm opacity-80">{u.email}</td>
              <td className="capitalize">{u.role || "user"}</td>

              <td>
                <select
                  value={u.role || "user"}
                  onChange={(e) =>
                    handleRoleChange(u._id, e.target.value)
                  }
                  className="select select-sm select-bordered"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>

              <td>
                <button
                  onClick={() => handleDelete(u._id)}
                  className="btn btn-sm bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* ✅ Mobile Card Layout */}
    <div className="md:hidden space-y-4">
      {users.map((u) => (
        <div
          key={u._id}
          className="bg-base-100 shadow rounded-lg p-4 space-y-2"
        >
          <div>
            <p className="font-semibold">{u.name}</p>
            <p className="text-xs opacity-70 break-all">{u.email}</p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="badge badge-outline capitalize">
              {u.role || "user"}
            </span>

            <select
              value={u.role || "user"}
              onChange={(e) =>
                handleRoleChange(u._id, e.target.value)
              }
              className="select select-xs select-bordered"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            onClick={() => handleDelete(u._id)}
            className="btn btn-sm bg-red-600 w-full"
          >
            Delete User
          </button>
        </div>
      ))}
    </div>
  </div>
);

};

export default UsersManagement;
