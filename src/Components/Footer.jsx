import React from "react";
import { FaInstagram, FaFacebookF, FaPinterestP } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { Link } from  'react-router';

const Footer = () => {
  return (
    <footer className="  py-8  ">
      <div className=" mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <h3 className="text-lg font-semibold ">Quick <span className="text-red-500">Links</span></h3>
          <ul className="flex flex-col md:flex-row gap-3 text-sm">
            <li>
              <Link

                className="hover:underline hover:text-red-800 "
              >
                About
              </Link>
            </li>
            <li>
              <Link

                className="hover:underline hover:text-red-800 "
              >
                Contact
              </Link>
            </li>
            <li>
              <Link

                className="hover:underline hover:text-red-800 "
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        
        <div className="flex gap-5 text-2xl">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-red-800  hover:scale-110"
          >
            <FaInstagram />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-red-800 hover:scale-110"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-red-800  hover:scale-110"
          >
            <RiTwitterXFill />
          </a>
        </div>
      </div>
      <div className=" mx-auto border-t border-red-500  my-6"></div>
      <p className="text-center text-sm ">
          &copy; 2025 <span className="font-semibold">MovieMaster <span className="text-red-500">Pro</span> </span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;