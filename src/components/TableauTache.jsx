import { MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function LigneTache({
  tache,
  onOpenTask,
}) {
  const [menuOuvert, setMenuOuvert] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOuvert(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <tr
      className="task-row-clickable"
      onClick={() => onOpenTask(tache)}
    >
      <td>
        <strong>{tache.titre}</strong>
      </td>

      <td>{tache.projet}</td>

      <td>
        <span
          className={`badge badge-priority-${tache.priorite}`}
        >
          {tache.priorite}
        </span>
      </td>

      <td>{tache.echeance}</td>

      <td>
        <span
          className={`badge badge-status-${tache.statut}`}
        >
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
            onClick={(e) => {
              e.stopPropagation();
              setMenuOuvert(!menuOuvert);
            }}
          >
            <MoreVertical size={18} />
          </button>

          {menuOuvert && (
            <div className="project-menu-dropdown">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenTask(tache);
                }}
              >
                Ouvrir
              </button>

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

export default function TableauTache({
  taches,
  onOpenTask,
}) {
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
            <LigneTache
              key={tache.id}
              tache={tache}
              onOpenTask={onOpenTask}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}