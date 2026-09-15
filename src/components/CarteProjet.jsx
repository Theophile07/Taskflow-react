import {
  MoreVertical,
  CheckSquare,
  Clock
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

export default function CarteProjet({
  projet,
  onOuvrir,
  onModifier,
  onSupprimer
}) {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const menuRef = useRef(null);

  const {
    nom,
    description,
    couleur,
    progression,
    totalTaches,
    tachesEnCours,
    echeance
  } = projet;

  /* =====================================================
     FERMER LE MENU EN CLIQUANT À L'EXTÉRIEUR
  ===================================================== */

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

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =====================================================
     GESTION DES ACTIONS
  ===================================================== */

  function handleAction(action) {
    setMenuOuvert(false);

    if (action) {
      action(projet);
    }
  }

  return (
    <article className="project-card">

      {/* =================================================
          EN-TÊTE
      ================================================= */}

      <div className="project-card-header">

        <div className="project-card-title">

          <span
            className="project-dot"
            style={{
              backgroundColor: couleur
            }}
          ></span>

          <h3>{nom}</h3>

        </div>

        {/* MENU */}
        <div
          className="project-menu-wrapper"
          ref={menuRef}
        >
          <button
            type="button"
            className="project-menu"
            aria-label={`Options du projet ${nom}`}
            onClick={() =>
              setMenuOuvert(
                (ouvert) => !ouvert
              )
            }
          >
            <MoreVertical size={20} />
          </button>

          {menuOuvert && (
            <div className="project-menu-dropdown">

              <button
                type="button"
                onClick={() =>
                  handleAction(onOuvrir)
                }
              >
                Ouvrir
              </button>

              <button
                type="button"
                onClick={() =>
                  handleAction(onModifier)
                }
              >
                Modifier
              </button>

              <button
                type="button"
                className="danger"
                onClick={() =>
                  handleAction(onSupprimer)
                }
              >
                Supprimer
              </button>

            </div>
          )}
        </div>

      </div>

      {/* =================================================
          DESCRIPTION
      ================================================= */}

      <p className="project-card-description">
        {description}
      </p>

      {/* =================================================
          PROGRESSION
      ================================================= */}

      <div className="project-card-progress">

        <div className="project-card-progress-header">

          <span>
            Progression
          </span>

          <strong>
            {progression}%
          </strong>

        </div>

        <div className="project-progress-bar">

          <div
            className="project-progress-fill"
            style={{
              width: `${progression}%`,
              backgroundColor: couleur
            }}
          ></div>

        </div>

      </div>

      {/* =================================================
          STATISTIQUES
      ================================================= */}

      <div className="project-card-stats">

        <span>
          <CheckSquare size={16} />
          {totalTaches} tâches
        </span>

        <span>
          <Clock size={16} />
          {tachesEnCours} en cours
        </span>

      </div>

      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="project-card-footer">

        <span>
          Échéance
        </span>

        <strong>
          {echeance}
        </strong>

      </div>

    </article>
  );
}