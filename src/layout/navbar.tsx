import { ListTodo, ShoppingBag, Trophy, User, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const navItems = [
    { to: '/', icon: Trophy, label: 'Баллы' },
    { to: '/tasks', icon: ListTodo, label: 'Задания' },
    { to: '/shop', icon: ShoppingBag, label: 'Магазин' },
    { to: '/friends', icon: Users, label: 'Друзья' },
    { to: '/profile', icon: User, label: 'Профиль' },
  ];

  return (
    <nav className="gradient_bg px-4 py-4 rounded-t-2xl">
      <ul className="flex justify-between items-center">
        {navItems.map((item) => (
          <li key={item.label}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center text-xs ${isActive ? 'text-white' : 'text-[#8DA0C6]'
                }`
              }
            >
              <item.icon className="w-6 h-6 mb-3" />
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar