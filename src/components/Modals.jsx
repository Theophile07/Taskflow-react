import {
  X,
  FolderPlus,
  CheckSquare,
  FolderKanban,
  Pencil,
  AlertTriangle,
  Calendar,
  Clock,
  Palette
} from "lucide-react";

import { useState } from "react";

export default function Modals({
  modal,
  onClose,
  projets = [],
  projetSelectionne = null
}) {
  /* =====================================================
     ÉTATS
  ===================================================== */

  const [nomProjet, setNomProjet] = useState(
    projetSelectionne?.nom ?? ""
  );
  const [descriptionProjet, setDescriptionProjet] = useState(
    projetSelectionne?.description ?? ""
  );
  const [couleurProjet, setCouleurProjet] = useState(
    projetSelectionne?.couleur ?? "#2563EB"
  );

  const [titreTache, setTitreTache] = useState("");
  const [projetTache, setProjetTache] = useState("");
  const [prioriteTache, setPrioriteTache] = useState("moyenne");
  const [statutTache, setStatutTache] = useState("a_faire");
  const [echeanceTache, setEcheanceTache] = useState("");

  const [confirmationSuppression, setConfirmationSuppression] = useState("");

  if (!modal) return null;

  /* =====================================================
     SOUMISSION
  ===================================================== */

  function handleSubmitProjet(event) {
    event.preventDefault();

    console.log({
      nom: nomProjet,
      description: descriptionProjet,
      couleur: couleurProjet
    });

    onClose();
  }

  function handleSubmitTache(event) {
    event.preventDefault();

    console.log({
      titre: titreTache,
      projet: projetTache,
      priorite: prioriteTache,
      statut: statutTache,
      echeance: echeanceTache
    });

    onClose();
  }

  function handleModifierProjet(event) {
    event.preventDefault();

    console.log("Modifier :", {
      id: projetSelectionne?.id,
      nom: nomProjet,
      description: descriptionProjet,
      couleur: couleurProjet
    });

    onClose();
  }

  function handleSupprimerProjet() {
    if (confirmationSuppression !== "SUPPRIMER") return;

    console.log(
      "Supprimer :",
      projetSelectionne?.id
    );

    onClose();
  }

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="settings-modal">

        {/* =================================================
            NOUVEAU PROJET
        ================================================= */}

        {modal === "nouveauProjet" && (
          <form onSubmit={handleSubmitProjet}>

            <div className="modal-header">

              <div>
                <h2>Nouveau projet</h2>

                <p>
                  Créez un nouveau projet dans TaskFlow.
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={onClose}
              >
                <X size={20} />
              </button>

            </div>

            <div className="modal-body">

              <div className="modal-info-icon">
                <FolderPlus size={24} />
              </div>

              <div className="form-group">

                <label>Nom du projet</label>

                <input
                  className="input"
                  value={nomProjet}
                  onChange={(e) =>
                    setNomProjet(e.target.value)
                  }
                  placeholder="Ex : Site vitrine Nguvu"
                  required
                />

              </div>

              <div className="form-group">

                <label>Description</label>

                <textarea
                  className="input"
                  rows="4"
                  value={descriptionProjet}
                  onChange={(e) =>
                    setDescriptionProjet(e.target.value)
                  }
                />

              </div>

              <div className="form-group">

                <label>Couleur</label>

                <input
                  type="color"
                  value={couleurProjet}
                  onChange={(e) =>
                    setCouleurProjet(e.target.value)
                  }
                />

              </div>

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Annuler
              </button>

              <button
                type="submit"
                className="btn btn-primary"
              >
                Créer le projet
              </button>

            </div>

          </form>
        )}

        {/* =================================================
            NOUVELLE TÂCHE
        ================================================= */}

        {modal === "nouvelleTache" && (
          <form onSubmit={handleSubmitTache}>

            <div className="modal-header">

              <div>
                <h2>Nouvelle tâche</h2>

                <p>
                  Ajoutez une tâche à votre projet.
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={onClose}
              >
                <X size={20} />
              </button>

            </div>

            <div className="modal-body">

              <div className="modal-info-icon">
                <CheckSquare size={24} />
              </div>

              <div className="form-group">

                <label>Titre</label>

                <input
                  className="input"
                  value={titreTache}
                  onChange={(e) =>
                    setTitreTache(e.target.value)
                  }
                  required
                />

              </div>

              <div className="form-group">

                <label>Projet</label>

                <select
                  className="input"
                  value={projetTache}
                  onChange={(e) =>
                    setProjetTache(e.target.value)
                  }
                  required
                >

                  <option value="">
                    Sélectionner un projet
                  </option>

                  {projets.map((projet) => (
                    <option
                      key={projet.id}
                      value={projet.id}
                    >
                      {projet.nom}
                    </option>
                  ))}

                </select>

              </div>

              <div className="form-row">

                <div className="form-group">

                  <label>Priorité</label>

                  <select
                    className="input"
                    value={prioriteTache}
                    onChange={(e) =>
                      setPrioriteTache(e.target.value)
                    }
                  >
                    <option value="basse">Basse</option>
                    <option value="moyenne">Moyenne</option>
                    <option value="haute">Haute</option>
                  </select>

                </div>

                <div className="form-group">

                  <label>Statut</label>

                  <select
                    className="input"
                    value={statutTache}
                    onChange={(e) =>
                      setStatutTache(e.target.value)
                    }
                  >
                    <option value="a_faire">
                      À faire
                    </option>

                    <option value="en_cours">
                      En cours
                    </option>

                    <option value="terminee">
                      Terminée
                    </option>
                  </select>

                </div>

              </div>

              <div className="form-group">

                <label>Échéance</label>

                <input
                  type="date"
                  className="input"
                  value={echeanceTache}
                  onChange={(e) =>
                    setEcheanceTache(e.target.value)
                  }
                />

              </div>

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Annuler
              </button>

              <button
                type="submit"
                className="btn btn-primary"
              >
                Créer la tâche
              </button>

            </div>

          </form>
        )}

        {/* =================================================
            DÉTAILS DU PROJET
        ================================================= */}

        {modal === "detailsProjet" && projetSelectionne && (
          <>
            <div className="modal-header">

              <div>
                <h2>{projetSelectionne.nom}</h2>

                <p>Vue détaillée du projet.</p>
              </div>

              <button
                className="modal-close"
                onClick={onClose}
              >
                <X size={20} />
              </button>

            </div>

            <div className="modal-body">

              <div className="project-detail-color">

                <span
                  className="project-detail-dot"
                  style={{
                    background: projetSelectionne.couleur
                  }}
                ></span>

                <strong>Couleur du projet</strong>

              </div>

              <div className="project-detail-section">

                <h4>Description</h4>

                <p>{projetSelectionne.description}</p>

              </div>

              <div className="project-detail-grid">

                <div className="detail-card">
                  <Clock size={18} />
                  <span>Progression</span>
                  <strong>
                    {projetSelectionne.progression}%
                  </strong>
                </div>

                <div className="detail-card">
                  <CheckSquare size={18} />
                  <span>Tâches</span>
                  <strong>
                    {projetSelectionne.totalTaches}
                  </strong>
                </div>

                <div className="detail-card">
                  <FolderKanban size={18} />
                  <span>En cours</span>
                  <strong>
                    {projetSelectionne.tachesEnCours}
                  </strong>
                </div>

                <div className="detail-card">
                  <Calendar size={18} />
                  <span>Échéance</span>
                  <strong>
                    {projetSelectionne.echeance}
                  </strong>
                </div>

              </div>

              <div className="project-progress-card">

                <div className="project-progress-header">

                  <span>Avancement</span>

                  <strong>
                    {projetSelectionne.progression}%
                  </strong>

                </div>

                <div className="project-progress-bar">

                  <div
                    className="project-progress-fill"
                    style={{
                      width: `${projetSelectionne.progression}%`,
                      background: projetSelectionne.couleur
                    }}
                  ></div>

                </div>

              </div>

            </div>

            <div className="modal-footer">

              <button
                className="btn btn-secondary"
                onClick={onClose}
              >
                Fermer
              </button>

            </div>
          </>
        )}

        {/* =================================================
            MODIFIER PROJET
        ================================================= */}

        {modal === "modifierProjet" && projetSelectionne && (
          <form onSubmit={handleModifierProjet}>

            <div className="modal-header">

              <div>
                <h2>Modifier le projet</h2>

                <p>
                  Mettez à jour les informations du projet.
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={onClose}
              >
                <X size={20} />
              </button>

            </div>

            <div className="modal-body">

              <div className="modal-info-icon">
                <Pencil size={22} />
              </div>

              <div className="form-group">

                <label>Nom du projet</label>

                <input
                  className="input"
                  value={nomProjet}
                  onChange={(e) =>
                    setNomProjet(e.target.value)
                  }
                />

              </div>

              <div className="form-group">

                <label>Description</label>

                <textarea
                  className="input"
                  rows="4"
                  value={descriptionProjet}
                  onChange={(e) =>
                    setDescriptionProjet(e.target.value)
                  }
                />

              </div>

              <div className="form-group">

                <label>Couleur</label>

                <div className="color-picker-wrapper">

                  <Palette size={18} />

                  <input
                    type="color"
                    value={couleurProjet}
                    onChange={(e) =>
                      setCouleurProjet(e.target.value)
                    }
                  />

                </div>

              </div>

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Annuler
              </button>

              <button
                className="btn btn-primary"
                type="submit"
              >
                Enregistrer
              </button>

            </div>

          </form>
        )}

        {/* =================================================
            SUPPRIMER PROJET
        ================================================= */}

        {modal === "supprimerProjet" && projetSelectionne && (
          <>
            <div className="modal-header">

              <div>
                <h2>Supprimer le projet</h2>

                <p>Cette action est irréversible.</p>
              </div>

              <button
                className="modal-close"
                onClick={onClose}
              >
                <X size={20} />
              </button>

            </div>

            <div className="modal-body">

              <div className="delete-warning">

                <div className="delete-warning-icon">
                  <AlertTriangle size={24} />
                </div>

                <div>

                  <h3>{projetSelectionne.nom}</h3>

                  <p>
                    Toutes les tâches associées seront supprimées définitivement.
                  </p>

                </div>

              </div>

              <div className="form-group">

                <label>
                  Tapez <strong>SUPPRIMER</strong> pour confirmer.
                </label>

                <input
                  className="input"
                  value={confirmationSuppression}
                  onChange={(e) =>
                    setConfirmationSuppression(
                      e.target.value
                    )
                  }
                  placeholder="SUPPRIMER"
                />

              </div>

            </div>

            <div className="modal-footer">

              <button
                className="btn btn-secondary"
                onClick={onClose}
              >
                Annuler
              </button>

              <button
                className="btn btn-danger"
                disabled={
                  confirmationSuppression !==
                  "SUPPRIMER"
                }
                onClick={handleSupprimerProjet}
              >
                Supprimer définitivement
              </button>

            </div>
          </>
        )}

      </div>
    </div>
  );
}