import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaApple,
  FaGooglePlay,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black-900 text-white py-8 text-xs">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h2 className="text-base font-bold mb-3">Huez</h2>
          <p className="text-gray-400">
            Bringing restaurant-quality meals to your table without compromise!
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-3">Quick Links</h3>
          <ul className="text-gray-400 space-y-2">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/restaurants">Restaurants</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-3">Contact</h3>
          <p className="text-gray-400">Email: support@huez.com</p>
          <p className="text-gray-400">Phone: +1 234 567 890</p>
          <div className="flex gap-4 mt-3">
            <FaFacebookF className="text-xl hover:bg-gray-700 p-1 rounded-sm transition-all ease cursor-pointer" />
            <FaTwitter className="text-xl hover:bg-gray-700 p-1 rounded-sm transition-all ease cursor-pointer" />
            <FaInstagram className="text-xl hover:bg-gray-700 p-1 rounded-sm transition-all ease cursor-pointer" />
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-3">Download Our App</h3>
          <div className="flex flex-col gap-3">
            <a
              href="#"
              className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg hover:bg-gray-700"
            >
              <FaApple className="text-2xl" /> <span>App Store</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg hover:bg-gray-700"
            >
              <FaGooglePlay className="text-2xl" /> <span>Google Play</span>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-6 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} huez. All rights reserved.
      </div>
    </footer>
  );
}
