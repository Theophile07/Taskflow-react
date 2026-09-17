import {
  X,
  FolderPlus,
  Palette,
  Calendar,
  User,
  Flag,
  CheckSquare,
} from "lucide-react";

import { useState } from "react";

export default function Modals({ modal, onClose }) {
  const [projet, setProjet] = useState({
    nom: "",
    description: "",
    couleur: "#2563EB",
    priorite: "moyenne",
    statut: "actif",
    dateDebut: "",
    dateFin: "",
    responsable: "Moi",
    objectif: "",
  });

  if (modal !== "nouveauProjet") return null;

  function handleChange(e) {
    setProjet((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function creerProjet(e) {
    e.preventDefault();
    console.log(projet);
    onClose();
  }

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="project-modal">
        <form onSubmit={creerProjet}>
          <div className="project-modal-header">
            <div className="project-modal-title">
              <div
                className="project-preview-icon"
                style={{ background: projet.couleur }}
              >
                <FolderPlus size={22} />
              </div>

              <div>
                <h2>Nouveau projet</h2>
                <p>Créez un nouvel espace de travail.</p>
              </div>
            </div>

            <button
              type="button"
              className="modal-close"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>

          <div className="project-modal-body">
            <div className="project-preview-card">
              <div
                className="project-preview-bar"
                style={{ background: projet.couleur }}
              />

              <h3>{projet.nom || "Nom du projet"}</h3>

              <p>
                {projet.description ||
                  "Votre description apparaîtra ici."}
              </p>
            </div>

            <div className="modal-section">
              <h3>Informations générales</h3>

              <div className="form-group">
                <label>Nom</label>

                <input
                  className="input"
                  name="nom"
                  value={projet.nom}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>

                <textarea
                  className="input"
                  name="description"
                  rows={4}
                  value={projet.description}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Objectif</label>

                <textarea
                  className="input"
                  name="objectif"
                  rows={3}
                  value={projet.objectif}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="modal-section">
              <h3>Organisation</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <Palette size={16} />
                    Couleur
                  </label>

                  <input
                    type="color"
                    name="couleur"
                    value={projet.couleur}
                    onChange={handleChange}
                    className="color-picker"
                  />
                </div>

                <div className="form-group">
                  <label>
                    <Flag size={16} />
                    Priorité
                  </label>

                  <select
                    className="input"
                    name="priorite"
                    value={projet.priorite}
                    onChange={handleChange}
                  >
                    <option value="basse">Basse</option>
                    <option value="moyenne">Moyenne</option>
                    <option value="haute">Haute</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <Calendar size={16} />
                    Début
                  </label>

                  <input
                    type="date"
                    className="input"
                    name="dateDebut"
                    value={projet.dateDebut}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <Calendar size={16} />
                    Échéance
                  </label>

                  <input
                    type="date"
                    className="input"
                    name="dateFin"
                    value={projet.dateFin}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <User size={16} />
                    Responsable
                  </label>

                  <input
                    className="input"
                    name="responsable"
                    value={projet.responsable}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <CheckSquare size={16} />
                    Statut
                  </label>

                  <select
                    className="input"
                    name="statut"
                    value={projet.statut}
                    onChange={handleChange}
                  >
                    <option value="actif">Actif</option>
                    <option value="planifie">Planifié</option>
                    <option value="pause">En pause</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="project-modal-footer">
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
      </div>
    </div>
  );
}