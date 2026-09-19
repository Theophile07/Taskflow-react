import {
  Search,
  SlidersHorizontal,
  ClipboardList,
  Clock,
  CircleCheck,
  AlertCircle,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";

import { recupererProjet } from "../api/projets";
import { recupererTache } from "../api/taches";

import TableauTache from "../components/TableauTache";
import TacheModal from "../components/TacheModal";


/* =====================================================
   CARTE DE STATISTIQUE (TÂCHES)
===================================================== */

function TacheStatsCard({ icon: Icon, value, label, variant, }) {
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

  /* =====================================================
     ÉTAT LOCAL
  ===================================================== */

  const [filtreOuvert, setFiltreOuvert] = useState(false);
  const [modal, setModal] = useState(null);
  const [tacheSelectionnee, setTacheSelectionnee] = useState(null);
  const [taches, setTaches] = useState([]);
  const [projets, setProjets] = useState([]);
  const [chargement, setChargement] = useState(true);
  const filtreRef = useRef(null);
  const [recherche, setRecherche] = useState("");

  /* =====================================================
     FERMER LE FILTRE EN CLIQUANT À L'EXTÉRIEUR
  ===================================================== */

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

  /* =====================================================
     STATISTIQUES DES TÂCHES
  ===================================================== */

  const tachesAFaire = useMemo(() => {
    return taches.filter(
      (tache) => tache.statut === "a_faire"
    ).length
  }, [taches])

  const tachesEnCours = useMemo(() => {
    return taches.filter(
      (tache) => tache.statut === "en_cours"
    ).length
  }, [taches])

  const tachesTerminees = useMemo(() => {
    return taches.filter(
      (tache) => tache.statut === "terminee"
    ).length
  }, [taches])

  const tachesEnRetard = useMemo(() => {
    const aujourdHui =
      new Date().toISOString().split("T")[0];

    return taches.filter(
      (tache) =>
        tache.echeance < aujourdHui &&
        tache.statut !== "terminee"
    ).length;
  }, [taches])

  const tachesAvecProjet = useMemo(() => {
    return taches.map((tache) => {
      const projet = projets.find(
        (projet) =>
          Number(projet.id) ===
          Number(tache.projetId)
      );

      return {
        ...tache,
        nomProjet: projet?.nom || "Projet inconnu",
        couleurProjet:
          projet?.couleur || "#64748B",
      };
    });
  }, [taches, projets]);

    const tachesFiltrees = useMemo(() => {
      return tachesAvecProjet.filter((tache) => {
        const mot = recherche.toLowerCase().trim();

        return (
          tache.titre.toLowerCase().includes(mot) ||
          tache.nomProjet.toLowerCase().includes(mot)
        );
      });
    }, [tachesAvecProjet, recherche]);
  /* =====================================================
     CHARGEMENT DES DONNÉES
  ===================================================== */

  useEffect(() => {
    async function chargerTaches() {
      try {
        const [projetData, tachesData] =
          await Promise.all([
            recupererProjet(),
            recupererTache(),
          ])
        setTaches(tachesData)
        setProjets(projetData)
      } catch (error) {
        console.error("Erreur :", error)
      } finally {
        setChargement(false)
      }
    }
    chargerTaches()
  }, [])

  if (chargement) {
    return (
      <p>Chargement des taches...</p>
    );
  }

  /* =====================================================
     RENDU
  ===================================================== */

  return (
    <div className="tasks-page">

      {/* -----------------------------
          EN-TÊTE
      ----------------------------- */}

      <header className="tasks-header">

        <div>
          <p className="dashboard-eyebrow"> Gestion des tâches </p>
          <h1>Mes tâches</h1>
          <p>Suivez toutes vos tâches.</p>
        </div>

        <button className="btn btn-primary"  onClick={() => setModal("nouvelleTache") }>
          + Nouvelle tâche
        </button>

      </header>

      {/* -----------------------------
          BARRE D'OUTILS
      ----------------------------- */}

      <div className="tasks-toolbar">

<div className="search-box">

          <Search size={18} />

          <input
            type="search"
            placeholder="Rechercher une tâche..."
          />

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

      {/* -----------------------------
          STATISTIQUES
      ----------------------------- */}

      <section className="tasks-stats-grid">
        <TacheStatsCard icon={ClipboardList} value={tachesAFaire} label="À faire" variant="todo" />
        <TacheStatsCard icon={Clock} value={tachesEnCours} label="En cours" variant="progress" />
        <TacheStatsCard icon={CircleCheck} value={tachesTerminees} label="Terminées" variant="success" />
        <TacheStatsCard icon={AlertCircle} value={tachesEnRetard} label="En retard" variant="danger" />
      </section>

      {/* -----------------------------
          LISTE DES TÂCHES
      ----------------------------- */}

      <section className="dashboard-card">

        <div className="card-header">

          <div>
            <h3>Liste des tâches</h3>
            <p>Cliquez sur une tâche.</p>
          </div>
        </div>

        <TableauTache taches={tachesFiltrees} onOpenTask={setTacheSelectionnee} />

      </section>

      {/* -----------------------------
          MODALE DE TÂCHE
      ----------------------------- */}

      <TacheModal
        tache={tacheSelectionnee}
        projet={{
          nom: tacheSelectionnee?.nomProjet,
          couleur: tacheSelectionnee?.couleurProjet,
        }}
        onClose={() =>
          setTacheSelectionnee(null)
        }
        onModifier={(tache) =>
          console.log("Modifier", tache)
        }
        onSupprimer={(tache) =>
          console.log("Supprimer", tache)
        }
      />

    </div>
  );
}