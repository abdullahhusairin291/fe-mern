import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const list = [
  { id: 1, url: "/", text: "Home" },
  { id: 2, url: "/about", text: "About" },
  { id: 3, url: "/products", text: "Products" },
  { id: 4, url: "/orders", text: "Orders" },
  { id: 5, url: "/checkout", text: "Checkout" },
];

const NavList = () => {
  const user = useSelector((state) => state.userState.user);

  return (
    <>
      {list.map((item) => {
        if ((item.text === "Orders" || item.text === "Checkout") && !user) {
          return null;
        }

        return (
          <li key={item.id} className="capitalize">
            <NavLink to={item.url}>{item.text}</NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavList;
