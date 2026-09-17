import {
  X,
  Calendar,
  FolderKanban,
  Flag,
  CircleCheck,
  Pencil,
  Trash2,
} from "lucide-react";

export default function TacheModal({
  tache,
  projet,
  onClose,
  onModifier,
  onSupprimer,
}) {
  if (!tache) return null;

  const statutTexte = {
    a_faire: "À faire",
    en_cours: "En cours",
    terminee: "Terminée",
  };

  const badgeStatut = {
    a_faire: "badge-status-a_faire",
    en_cours: "badge-status-en_cours",
    terminee: "badge-status-terminee",
  };

  const badgePriorite = {
    haute: "badge-priority-haute",
    moyenne: "badge-priority-moyenne",
    basse: "badge-priority-basse",
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="task-details-modal">
        <div className="modal-header">
          <div>
            <h2>{tache.titre}</h2>
            <p>Détails de la tâche</p>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="task-modal-badges">
            <span
              className={`badge ${badgeStatut[tache.statut]}`}
            >
              {statutTexte[tache.statut]}
            </span>

            <span
              className={`badge ${badgePriorite[tache.priorite]}`}
            >
              Priorité {tache.priorite}
            </span>
          </div>

          <div className="task-modal-info">
            <div className="task-info-row">
              <FolderKanban size={18} />

              <div>
                <span>Projet</span>

                <strong>
                  {projet?.nom || "Projet inconnu"}
                </strong>
              </div>
            </div>

            <div className="task-info-row">
              <Calendar size={18} />

              <div>
                <span>Échéance</span>

                <strong>{tache.echeance}</strong>
              </div>
            </div>

            <div className="task-info-row">
              <CircleCheck size={18} />

              <div>
                <span>Créée le</span>

                <strong>
                  {tache.creeLe || "—"}
                </strong>
              </div>
            </div>

            <div className="task-info-row">
              <Flag size={18} />

              <div>
                <span>
                  Dernière modification
                </span>

                <strong>
                  {tache.modifieLe || "—"}
                </strong>
              </div>
            </div>
          </div>

          <div className="task-description-box">
            <h3>Description</h3>

            <p>
              {tache.description ||
                "Aucune description."}
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={() =>
              onModifier?.(tache)
            }
          >
            <Pencil size={18} />
            Modifier
          </button>

          <button
            className="btn btn-danger"
            onClick={() =>
              onSupprimer?.(tache)
            }
          >
            <Trash2 size={18} />
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}