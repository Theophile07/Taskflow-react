import {
  FolderKanban,
  CheckSquare,
  CircleCheck,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";

import { recupererProjet } from "../api/projets";
import { recupererTache } from "../api/taches";

import StatCard from "../components/StatCard";
import DashboardCard from "../components/DashboardCard";
import TacheProgressCard from "../components/TacheProgressCard";
import ProjetAvancement from "../components/AvanceProjet";
import TableauTacheRecent from "../components/TableauTacheRecent";
import Modals from "../components/Modals";


export default function Dashboard() {

  /* =====================================================
     ÉTAT LOCAL
  ===================================================== */

  const [modal, setModal] = useState(null);
  const [projets, setProjets] = useState([]);
  const [taches, setTaches] = useState([]);
  const [chargement, setChargement] = useState(true);

  /* =====================================================
     TOTAUX
  ===================================================== */

  const totalProjets = projets.length;
  const totalTaches = taches.length;

  /* =====================================================
     STATISTIQUES
  ===================================================== */

  const tachesTerminees = useMemo(() => {
    return taches.filter(
      (tache) => tache.statut === "terminee"
    ).length;
  }, [taches]);

  const tachesEnCours = useMemo(() => {
    return taches.filter(
      (tache) => tache.statut === "en_cours"
    ).length;
  }, [taches]);

  const tachesEnRetard = useMemo(() => {
    const aujourdHui =
      new Date().toISOString().split("T")[0];

    return taches.filter(
      (tache) =>
        tache.echeance < aujourdHui &&
        tache.statut !== "terminee"
    ).length;
  }, [taches]);

  const tachesAFaire = useMemo(() => {
    return taches.filter(
      (tache) => tache.statut === "a_faire"
    ).length;
  }, [taches]);

  const progressionGlobale = useMemo(() => {
    if (totalTaches === 0) return 0;

    return Math.round(
      (tachesTerminees / totalTaches) * 100
    );
  }, [totalTaches, tachesTerminees]);

  const tachesRecentes = useMemo(() => {
    return [...taches]
      .sort(
        (a, b) =>
          new Date(b.creeLe) - new Date(a.creeLe)
      )
      .slice(0, 5)
      .map((taches) => {
        const projet = projets.find(
          (projet) =>
            Number(projet.id) ===
            Number(taches.projetId)
        )
        return {
          ...taches,
          nomProjet: projet
            ? projet.nom
            : "Projet Inconnu",
          couleurProjet: projet
            ? projet.couleur
            : "#64748B",
        }
      });
  }, [taches, projets]);

  /* =====================================================
     CHARGEMENT DES DONNÉES
  ===================================================== */

  useEffect(() => {
    async function chargerDashboard() {
      try {
        const [projetsData, tachesData] =
          await Promise.all([
            recupererProjet(),
            recupererTache(),
          ])
        setProjets(projetsData)
        setTaches(tachesData)
      } catch (error) {
        console.error("Erreur Dashboard :", error)
      } finally {
        setChargement(false)
      }
    }
    chargerDashboard()
  }, [])

  if (chargement) {
    return (
      <p>Chargement du tableau de bord...</p>
    );
  }

  /* =====================================================
     RENDU
  ===================================================== */

  return (
    <>

      <div className="dashboard">

        {/* -----------------------------
            EN-TÊTE
        ----------------------------- */}

        <header className="dashboard-header">

          <div>

            <p className="dashboard-eyebrow">
              Tableau de bord
            </p>

            <h1>Bienvenue Jean</h1>

            <p className="dashboard-description">
              Voici un aperçu de votre activité et de vos projets.
            </p>

          </div>

          <button
            className="btn btn-primary"
            onClick={() =>
              setModal("nouveauProjet")
            }
          >
            + Nouveau projet
          </button>

        </header>

        {/* -----------------------------
            STATISTIQUES
        ----------------------------- */}

        <section className="stats-grid">

          <StatCard icon={FolderKanban} label={"Projets"} value={totalProjets} variant="primary" />

          <StatCard icon={CheckSquare} label={"Tâches"} value={totalTaches} variant="blue" />

          <StatCard icon={CircleCheck} label={"Terminées"} value={tachesTerminees} variant="success" />

          <StatCard icon={Clock} label={"En cours"} value={tachesEnCours} variant="warning" />

          <StatCard icon={AlertCircle} label={"En retard"} value={tachesEnRetard} variant="danger" />

        </section>

        {/* -----------------------------
            CONTENU PRINCIPAL
        ----------------------------- */}

        <section className="dashboard-content">

          <DashboardCard
            titre="Progression des tâches"
            description="Répartition de vos tâches par statut."
          >
            <TacheProgressCard total={totalTaches} termine={tachesTerminees} enCours={tachesEnCours} aFaire={tachesAFaire} progression={progressionGlobale} />
          </DashboardCard>

          <DashboardCard
            titre="Avancement des projets"
            description="Suivez la progression de vos projets."
            action={
              <button className="btn btn-ghost">
                Voir tout
              </button>
            }
          >
            <div className="project-progress-list">

              {projets.map((projet) => {

                const tachesProjet = taches.filter(
                  (tache) =>
                    tache.projetId ===
                    Number(projet.id)
                )
                const progression =
                  tachesProjet.length === 0
                    ? 0
                    : Math.round(
                        (tachesProjet.filter(
                          (tache) =>
                            tache.statut === "terminee"
                        ).length / tachesProjet.length) * 100
                      )

                return (
                  <ProjetAvancement key={projet.id} nom={projet.nom} progression={progression} couleur={projet.couleur} />
                )

              })}

            </div>
          </DashboardCard>

        </section>

        {/* -----------------------------
            TÂCHES RÉCENTES
        ----------------------------- */}

        <section className="dashboard-section">

          <DashboardCard
            titre="Tâches récentes"
            description="Les dernières tâches créées et leur état."
            action={
              <button className="btn btn-ghost">
                Voir toutes
              </button>
            }
          >
            <TableauTacheRecent taches={tachesRecentes} />
          </DashboardCard>

        </section>

        {/* -----------------------------
            MODALES
        ----------------------------- */}

        <Modals modal={modal} onClose={() => setModal(null)} />

      </div>

    </>
  )
}