import { NavLink, useNavigate } from "react-router-dom";
import NavList from "./NavList";
import { BsCart3 } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import customApi from "../api";
import { logoutUser } from "../features/userSlice";

const Nav = () => {
  const user = useSelector((state) => state.userState.user);
  const countInCart = useSelector((state) => state.cartState.numItemsInCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    customApi.get("/auth/logout");
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <nav className="bg-base-200">
      <div className="navbar mx-auto max-w-6xl">
        <div className="navbar-start">
          <NavLink
            to="/"
            className="hidden lg:flex items-center btn btn-primary text-3xl"
          >
            Logo
          </NavLink>
          {/* Mobile */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="w-6 h-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-400 rounded-box w-52 bg-base-200"
            >
              <NavList />
            </ul>
          </div>
          {/* PC */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal">
              <NavList />
            </ul>
          </div>
        </div>
        <div className="navbar-end gap-5">
          <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md">
            <div className="indicator">
              <BsCart3 className="text-2xl" />
              <span className="badge badge-sm badge-primary indicator-item">
                {countInCart}
              </span>
            </div>
          </NavLink>
          {user && (
            <button
              className="btn btn-error btn-outline btn-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
