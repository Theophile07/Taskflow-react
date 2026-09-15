import { Search, SlidersHorizontal, ClipboardList, Clock, CircleCheck, AlertCircle } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import TableauTache from "../components/TableauTache";

const taches = [
  {
    id: 1,
    titre: "Intégrer le formulaire",
    projet: "Site vitrine Nguvu",
    priorite: "haute",
    echeance: "12 Sept. 2026",
    statut: "en_cours"
  },
  {
    id: 2,
    titre: "Créer la page d'accueil",
    projet: "Portfolio",
    priorite: "moyenne",
    echeance: "15 Sept. 2026",
    statut: "a_faire"
  },
  {
    id: 3,
    titre: "Corriger les bugs",
    projet: "TaskFlow",
    priorite: "basse",
    echeance: "18 Sept. 2026",
    statut: "terminee"
  },
  {
    id: 4,
    titre: "Configurer l'authentification",
    projet: "TaskFlow",
    priorite: "haute",
    echeance: "20 Sept. 2026",
    statut: "en_cours"
  },
  {
    id: 5,
    titre: "Configurer l'authentification",
    projet: "TaskFlow",
    priorite: "haute",
    echeance: "20 Sept. 2026",
    statut: "a_faire"
  }
];

function TacheStatsCard({ icon: Icon, value, label, variant }) {
  return (
    <div className="task-stat-card">
      <div className={`task-stat-icon ${variant}`}>
        <Icon size={22} />
      </div>

      <div>
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
}

export default function Taches() {
  const [filtreOuvert, setFiltreOuvert] = useState(false);
  const filtreRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filtreRef.current &&
        !filtreRef.current.contains(event.target)
      ) {
        setFiltreOuvert(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="tasks-page">

      <header className="tasks-header">

        <div>
          <p className="dashboard-eyebrow">
            Gestion des tâches
          </p>

          <h1>Mes tâches</h1>

          <p>
            Suivez et gérez toutes vos tâches.
          </p>
        </div>

        <button className="btn btn-primary">
          + Nouvelle tâche
        </button>

      </header>


      <div className="tasks-toolbar">

        <div className="project-search">

          <Search size={18} />

          <input
            placeholder="Rechercher une tâche..."
          />

        </div>

        <div
          className="filter-wrapper"
          ref={filtreRef}
        >

          <button
            className="btn btn-secondary"
            onClick={() => setFiltreOuvert(!filtreOuvert)}
          >
            <SlidersHorizontal size={18} />
            Filtrer
          </button>

          {filtreOuvert && (
            <div className="filter-popover">

              <div className="filter-section">

                <label>Statut</label>

                <select className="select">
                  <option>Toutes</option>
                  <option>À faire</option>
                  <option>En cours</option>
                  <option>Terminées</option>
                  <option>En retard</option>
                </select>

              </div>

              <div className="filter-actions">

                <button className="btn btn-ghost">
                  Réinitialiser
                </button>

                <button className="btn btn-primary">
                  Appliquer
                </button>

              </div>

            </div>
          )}

        </div>

        <select className="select project-sort">
          <option>Plus récentes</option>
          <option>Plus anciennes</option>
          <option>Priorité</option>
          <option>Échéance</option>
        </select>

      </div>


      <section className="tasks-stats-grid">

        <TacheStatsCard icon={ClipboardList} value={12} label="À faire" variant="todo"/>

        <TacheStatsCard
          icon={Clock}
          value={5}
          label="En cours"
          variant="progress"
        />

        <TacheStatsCard icon={CircleCheck} value={18} label="Terminées" variant="success" />

        <TacheStatsCard
          icon={AlertCircle}
          value={3}
          label="En retard"
          variant="danger"
        />

      </section>


      <section className="dashboard-card">

        <div className="card-header">

          <div>
            <h3>Liste des tâches</h3>
            <p>Retrouvez toutes vos tâches.</p>
          </div>

        </div>

        <TableauTache taches={taches} />

      </section>

    </div>
  );
}