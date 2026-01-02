
import React, { useState } from "react";
import Swal from "sweetalert2";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // simulate API call
    setTimeout(() => {
      setLoading(false);
      e.target.reset();
      Swal.fire({
        icon: "success",
        title: "Message Sent",
        text: "Thank you for contacting MovieMaster Pro!",
        timer: 1500,
        showConfirmButton: false,
      });
    }, 1200);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Contact <span className="text-red-600">Us</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Have questions, feedback, or suggestions? We’d love to hear from you.
        </p>
      </div>

      {/* Layout */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Info */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Get in Touch</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Whether you’re a user, collaborator, or recruiter reviewing this
            project—feel free to reach out anytime.
          </p>

          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Email:</strong> support@moviemasterpro.com</li>
            <li><strong>Location:</strong> Bangladesh</li>
            <li><strong>Status:</strong> Open for collaboration</li>
          </ul>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-base-200 p-6 rounded-xl shadow-md space-y-4"
        >
          <div>
            <label className="label">Full Name</label>
            <input
              type="text"
              required
              placeholder="Your name"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Email Address</label>
            <input
              type="email"
              required
              placeholder="Your email"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Subject</label>
            <input
              type="text"
              required
              placeholder="Subject"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Message</label>
            <textarea
              required
              placeholder="Write your message..."
              className="textarea textarea-bordered w-full h-28"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn bg-red-600 hover:bg-red-700 text-white w-full"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
