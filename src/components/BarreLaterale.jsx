import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Settings,
  LogOut
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function BarreLaterale() {

  const menuItems = [
    {
      label: "Tableau de bord",
      icon: LayoutDashboard,
      path: "/dashboard"
    },
    {
      label: "Mes projets",
      icon: FolderKanban,
      path: "/projet"
    },
    {
      label: "Mes tâches",
      icon: CheckSquare,
      path: "/taches"
    },
    {
      label: "Paramètres",
      icon: Settings,
      path: "/parametre"
    }
  ];

  return (
    <aside className="sidebar">

      {/* LOGO */}

      <div className="sidebar-logo">

        <div className="logo-icon">
          T
        </div>

        <span>
          TaskFlow
        </span>

      </div>

      {/* MENU */}

      <nav className="sidebar-nav">

        <p className="sidebar-title">
          MENU
        </p>

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-item ${
                  isActive ? "active" : ""
                }`
              }
            >

              <Icon size={20} />

              <span>
                {item.label}
              </span>

            </NavLink>
          );

        })}

      </nav>

      {/* BAS DE LA SIDEBAR */}

      <div className="sidebar-bottom">

        {/* PROFIL */}

        <div className="sidebar-profile">

          <img
            src="/avatars/default.png"
            alt="Photo de profil"
            className="sidebar-avatar"
          />

          <div className="sidebar-profile-info">

            <strong>
              Jean Dupont
            </strong>

            <span>
              jean@email.com
            </span>

          </div>

        </div>

        {/* DECONNEXION */}

        <button className="sidebar-item sidebar-logout">

          <LogOut size={20} />

          <span>
            Déconnexion
          </span>

        </button>

      </div>

    </aside>
  );
}