import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import Loading from "./Loading";

const Profile = () => {
  const { user,updateUserProfile, setUser  } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  // ================= FETCH PROFILE =================
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:3000/users/profile/${user.email}`)
      .then((res) => {
        setProfile(res.data);
        setName(res.data.name || "");
        setPhotoURL(res.data.photoURL || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user?.email]);

  // ================= UPDATE PROFILE =================
 const handleUpdate = async (e) => {
  e.preventDefault();

  // 🔍 1️⃣ Check if anything changed
  if (
    name === profile?.name &&
    photoURL === profile?.photoURL
  ) {
    Swal.fire({
      icon: "info",
      title: "No changes detected",
      text: "Please update name or photo before saving.",
    });
    return;
  }

  try {
    // 2️⃣ MongoDB update
    await axios.patch(
      `http://localhost:3000/users/profile/${user.email}`,
      { name, photoURL }
    );

    // 3️⃣ Firebase profile update
    await updateUserProfile(name, photoURL);

    // 4️⃣ Update local auth user
    setUser({
      ...user,
      displayName: name,
      photoURL: photoURL,
    });

    // 5️⃣ Update local profile state
    setProfile({ ...profile, name, photoURL });
    setIsOpen(false);

    Swal.fire({
      icon: "success",
      title: "Profile Updated Successfully",
      timer: 1200,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error(error);
    Swal.fire("Error", "Profile update failed", "error");
  }
};



  if (loading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">
        My <span className="text-red-600">Profile</span>
      </h2>

      {/* PROFILE CARD */}
      <div className="bg-base-100 shadow-xl rounded-xl p-6 flex flex-col md:flex-row gap-8 items-center">
        <img
          src={profile?.photoURL || user.photoURL || "https://i.ibb.co.com/wr3mBxs0/334c4a4c42fdb79d7ebc3e73b517e6f8.jpg"}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-red-600 object-cover"
        />

        <div className="flex-1 space-y-2">
          <p><strong>Name:</strong> {profile?.name}</p>
          <p><strong>Email:</strong> {profile?.email}</p>

          <button
            onClick={() => setIsOpen(true)}
            className="btn bg-red-600 mt-4"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* UPDATE MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-base-100 rounded-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">Update Profile</h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="label">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">Photo URL</label>
                <input
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn bg-red-600 ">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
