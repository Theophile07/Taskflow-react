
import { MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function TableauTache({ tache }) {
  const [menuOuvert, setMenuOuvert] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOuvert(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <tr>

      <td>{tache.titre}</td>

      <td>{tache.projet}</td>

      <td>
        <span className={`badge badge-priority-${tache.priorite}`}>
          {tache.priorite}
        </span>
      </td>

      <td>{tache.echeance}</td>

      <td>
        <span className={`badge badge-status-${tache.statut}`}>
          {tache.statut.replace("_", " ")}
        </span>
      </td>

      <td>

        <div
          className="project-menu-wrapper"
          ref={menuRef}
        >

          <button
            className="project-menu"
            onClick={() => setMenuOuvert(!menuOuvert)}
          >
            <MoreVertical size={18} />
          </button>

          {menuOuvert && (
            <div className="project-menu-dropdown">

              <button>Ouvrir</button>

              <button>Modifier</button>

              <button className="danger">
                Supprimer
              </button>

            </div>
          )}

        </div>

      </td>

    </tr>
  );
}

export default function TacheTable({ taches }) {
  return (
    <div className="table-wrapper">

      <table className="table task-table">

        <thead>

          <tr>

            <th>Tâche</th>

            <th>Projet</th>

            <th>Priorité</th>

            <th>Échéance</th>

            <th>Statut</th>

            <th></th>

          </tr>

        </thead>

        <tbody>

          {taches.map((tache) => (
            <TableauTache
              key={tache.id}
              tache={tache}
            />
          ))}

        </tbody>

      </table>

    </div>
  );
}