import {
  Search,
  SlidersHorizontal,
  ClipboardList,
  Clock,
  CircleCheck,
  AlertCircle,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

import TableauTache from "../components/TableauTache";
import TacheModal from "../components/TacheModal";

const taches = [
  {
    id: 1,
    titre: "Intégrer le formulaire",
    projet: "Site vitrine Nguvu",
    priorite: "haute",
    echeance: "12 Sept. 2026",
    statut: "en_cours",
    description: "Créer le formulaire de contact.",
    creeLe: "02 Sept. 2026",
    modifieLe: "04 Sept. 2026",
  },
  {
    id: 2,
    titre: "Créer la page d'accueil",
    projet: "Portfolio",
    priorite: "moyenne",
    echeance: "15 Sept. 2026",
    statut: "a_faire",
    description: "Créer le Hero.",
    creeLe: "05 Sept. 2026",
    modifieLe: "05 Sept. 2026",
  },
  {
    id: 3,
    titre: "Corriger les bugs",
    projet: "TaskFlow",
    priorite: "basse",
    echeance: "18 Sept. 2026",
    statut: "terminee",
    description: "Corriger les bugs UI.",
    creeLe: "08 Sept. 2026",
    modifieLe: "09 Sept. 2026",
  },
];

function TacheStatsCard({
  icon: Icon,
  value,
  label,
  variant,
}) {
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

  const [modal, setModal] = useState(null);

  const [tacheSelectionnee, setTacheSelectionnee] = useState(null);

  const filtreRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        filtreRef.current &&
        !filtreRef.current.contains(event.target)
      ) {
        setFiltreOuvert(false);
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
    <div className="tasks-page">
      <header className="tasks-header">
        <div>
          <p className="dashboard-eyebrow">
            Gestion des tâches
          </p>

          <h1>Mes tâches</h1>

          <p>
            Suivez toutes vos tâches.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() =>
            setModal("nouvelleTache")
          }
        >
          + Nouvelle tâche
        </button>
      </header>

      <div className="tasks-toolbar">
        <div className="project-search">
          <Search size={18} />
          <input placeholder="Rechercher une tâche..." />
        </div>

        <div
          className="filter-wrapper"
          ref={filtreRef}
        >
          <button
            className="btn btn-secondary"
            onClick={() =>
              setFiltreOuvert(!filtreOuvert)
            }
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
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="tasks-stats-grid">
        <TacheStatsCard
          icon={ClipboardList}
          value={12}
          label="À faire"
          variant="todo"
        />

        <TacheStatsCard
          icon={Clock}
          value={5}
          label="En cours"
          variant="progress"
        />

        <TacheStatsCard
          icon={CircleCheck}
          value={18}
          label="Terminées"
          variant="success"
        />

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

            <p>
              Cliquez sur une tâche.
            </p>
          </div>
        </div>

        <TableauTache
          taches={taches}
          onOpenTask={setTacheSelectionnee}
        />
      </section>

      <TacheModal
        tache={tacheSelectionnee}
        projet={{
          nom: tacheSelectionnee?.projet,
        }}
        onClose={() =>
          setTacheSelectionnee(null)
        }
        onModifier={(t) =>
          console.log("Modifier", t)
        }
        onSupprimer={(t) =>
          console.log("Supprimer", t)
        }
      />
    </div>
  );
}