
import { FaFilm, FaHeart, FaLock, FaMoon, FaSearch } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaFilm />,
      title: "Personal Movie Library",
      desc: "Upload, edit, and manage your own movie collection easily.",
    },
    {
      icon: <FaHeart />,
      title: "Smart Watchlist",
      desc: "Save your favorite movies and manage them anytime.",
    },
    {
      icon: <FaSearch />,
      title: "Advanced Filtering",
      desc: "Search and filter movies by genre, rating, or keyword.",
    },
    {
      icon: <FaLock />,
      title: "Secure Authentication",
      desc: "Only logged-in users can access private pages and actions.",
    },
    {
      icon: <FaMoon />,
      title: "Dark & Light Mode",
      desc: "Enjoy a smooth experience with theme toggle support.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">
          Platform <span className="text-red-600">Features</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          MovieMaster Pro offers powerful features to help you explore and manage
          movies with ease.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-md hover:shadow-lg transition"
          >
            <div className="card-body text-center items-center">
              <div className="text-4xl text-red-600 mb-3">{item.icon}</div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
