import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaFilm,
  FaStar,
  FaUserShield,
  FaCloudUploadAlt,
} from "react-icons/fa";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const features = [
  {
    id: "library",
    Icon: FaFilm,
    title: "Vast Movie Library",
    desc:
      "Browse thousands of titles with detailed information, trailers, and user reviews — all in one place.",
    colorClass: "text-red-500",
  },
  {
    id: "ratings",
    Icon: FaStar,
    title: "Smart Ratings & Reviews",
    desc:
      "Rate, review, and get personalized recommendations powered by user insights and smart algorithms.",
    colorClass: "text-yellow-500",
  },
  {
    id: "security",
    Icon: FaUserShield,
    title: "Secure & Private",
    desc:
      "Your data and preferences are safe with end-to-end encryption and secure authentication.",
    colorClass: "text-blue-500",
  },
  {
    id: "creator",
    Icon: FaCloudUploadAlt,
    title: "Creator Mode",
    desc:
      "Add your own movies, upload posters, and share your curated lists with the community.",
    colorClass: "text-green-500",
  },
];

const About = () => {
  const reduceMotion = useReducedMotion();


  const containerProps = reduceMotion
    ? { initial: "visible", animate: "visible" }
    : { initial: "hidden", animate: "visible", variants: containerVariants };

  const itemProps = reduceMotion
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : { variants: itemVariants, transition: { duration: 0.56, ease: "easeOut" } };

  return (
    <section
      id="about"
      className="px-10 py-16"
      aria-labelledby="about-heading"
    >
      <div className=" mx-auto text-center">
        <motion.h2
          id="about-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6"
        >
          About MovieMaster<span className="text-red-500"> Pro</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-12"
        >
          <strong>MovieMaster Pro</strong> is your ultimate movie-management and
          discovery platform. Explore, review, and track films in one visually
          rich, fast, and user-friendly interface built for movie lovers.
        </motion.p>

        <motion.div
          {...containerProps}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          role="list"
          aria-label="Key features"
        >
          {features.map(({ id, Icon, title, desc, colorClass }, idx) => (
            <motion.div
              key={id}
              {...itemProps}
              className="p-6 bg-white/80 dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              role="listitem"
              tabIndex={0}
            >
              <Icon className={`text-4xl ${colorClass} mx-auto mb-4`} aria-hidden />
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="mt-14 text-gray-500 dark:text-gray-400 text-sm italic"
        >
          MovieMaster Pro — where stories come alive.
        </motion.p>
      </div>
    </section>
  );
};

export default About;
