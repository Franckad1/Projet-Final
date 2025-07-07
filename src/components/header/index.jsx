import { Link, useNavigate } from "react-router-dom";
import { doSignOut } from "../../Providers/authProviders";
import { useAuth } from "../../contexts/auth";
import Logo from "../../assets/Logoyoussouf.svg";
const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  return (
    <nav className=" bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      {userLoggedIn ? (
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          {/* Logo à gauche */}
          <Link to={"/home"}>
            <div className="flex items-center space-x-3">
              <img src={Logo} alt="Logo" className="h-4 md:h-10 w-auto" />
            </div>
          </Link>

          {/* Titre centré (positionné en absolu au centre) */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <span className="text sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Event management
            </span>
          </div>

          {/* Bouton Log out à droite */}
          <div className="ml-auto">
            <button
              onClick={() => doSignOut().then(() => navigate("/"))}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition"
            >
              Log out
            </button>
          </div>
        </div>
      ) : // <div className="flex space-x-4">
      //   <Link
      //     to="/login"
      //     className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
      //   >
      //     Login
      //   </Link>
      //   <Link
      //     to="/register"
      //     className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
      //   >
      //     Register
      //   </Link>
      // </div>
      null}
    </nav>
  );
};
export default Header;
