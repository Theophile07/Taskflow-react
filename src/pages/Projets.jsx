import {
  Plus,
  Search,
  SlidersHorizontal,
  FolderKanban,
} from "lucide-react";

import {
  useMemo,
  useState,
  useEffect,
} from "react";

import { recupererProjet } from "../api/projets";
import { recupererTache } from "../api/taches";

import CarteProjet from "../components/CarteProjet";
import Modals from "../components/Modals";


export default function Projets() {

  /* =====================================================
     ÉTAT LOCAL
  ===================================================== */

  const [projets, setProjets] = useState([]);
  const [taches, setTaches] = useState([]);
  const [chargement, setChargement] = useState(true);

  /* --- Recherche --- */

  const [recherche, setRecherche] = useState("");

  /* --- Filtre --- */

  const [filtre, setFiltre] = useState("tous");

  /* --- Tri --- */

  const [tri, setTri] = useState("recent");

  /* --- Modales --- */

  const [modal, setModal] = useState(null);
  const [projetSelectionne, setProjetSelectionne]
    = useState(null);

  /* =====================================================
     OUVRIR UN PROJET
  ===================================================== */

  function handleOuvrir(projet) {
    setProjetSelectionne(projet);
    setModal("detailsProjet");
  }

  /* =====================================================
     MODIFIER UN PROJET
  ===================================================== */

  function handleModifier(projet) {
    setProjetSelectionne(projet);
    setModal("modifierProjet");
  }

  /* =====================================================
     SUPPRIMER UN PROJET
  ===================================================== */

  function handleSupprimer(projet) {
    setProjetSelectionne(projet);
    setModal("supprimerProjet");
  }

  /* =====================================================
     FERMER LA MODALE
  ===================================================== */

  function fermerModal() {
    setModal(null);
    setProjetSelectionne(null);
  }

  /* =====================================================
     PROGRESSION DES PROJETS
  ===================================================== */

  const projetProgression = useMemo(() => {
    return projets.map((projet) => {

      const tachesProjets = taches.filter(
        (tache) =>
          Number(tache.projetId) ===
          Number(projet.id)
      )

      const terminees = tachesProjets.filter(
        (tache) =>
          tache.statut === "terminee"
      ).length

      const progression =
        tachesProjets.length === 0
          ? 0
          : Math.round(
              (terminees / tachesProjets.length) * 100
            )

      return {
        ...projet,
        progression,
        nombreTaches: tachesProjets.length,
        tachesProjets,
      }

    })
  }, [projets, taches])

  /* =====================================================
     FILTRAGE + RECHERCHE + TRI
  ===================================================== */

  const projetsFiltres = useMemo(() => {

    let resultat = [...projetProgression];

    /* -----------------------------
       RECHERCHE
    ----------------------------- */

    if (recherche.trim()) {
      const rechercheNormalisee =
        recherche.toLowerCase().trim();

      resultat = resultat.filter(
        (projet) =>
          projet.nom
            .toLowerCase()
            .includes(rechercheNormalisee) ||
          projet.description
            .toLowerCase()
            .includes(rechercheNormalisee)
      );
    }

    /* -----------------------------
       FILTRE
    ----------------------------- */

    if (filtre === "en_cours") {
      resultat = resultat.filter(
        (projet) =>
          projet.progression > 0 &&
          projet.progression < 100
      );
    }

    if (filtre === "termine") {
      resultat = resultat.filter(
        (projet) =>
          projet.progression === 100
      );
    }

    if (filtre === "en_retard") {
      const aujourdHui =
        new Date()
          .toISOString()
          .split("T")[0];

      resultat = resultat.filter(
        (projet) =>
          projet.echeance < aujourdHui &&
          projet.progression < 100
      );
    }

    /* -----------------------------
       TRI
    ----------------------------- */

    if (tri === "recent") {
      resultat.sort(
        (a, b) =>
          new Date(b.creeLe) -
          new Date(a.creeLe)
      );
    }

    if (tri === "ancien") {
      resultat.sort(
        (a, b) =>
          new Date(a.creeLe) -
          new Date(b.creeLe)
      );
    }

    if (tri === "progression") {
      resultat.sort(
        (a, b) =>
          b.progression -
          a.progression
      );
    }

    if (tri === "nom") {
      resultat.sort((a, b) =>
        a.nom.localeCompare(b.nom)
      );
    }

    return resultat;

  }, [projets, recherche, filtre, tri]);

  /* =====================================================
     CHARGEMENT DES DONNÉES
  ===================================================== */

  useEffect(() => {
    async function chargerProjets() {
      try {
        const [projetData, tachesData] =
          await Promise.all([
            recupererProjet(),
            recupererTache(),
          ])
        setProjets(projetData)
        setTaches(tachesData)
      } catch (error) {
        console.error("Erreur :", error)
      } finally {
        setChargement(false)
      }
    }
    chargerProjets()
  }, [])

  if (chargement) {
    return (
      <p>Chargement des projets...</p>
    );
  }

  /* =====================================================
     RENDU
  ===================================================== */

  return (
    <div className="page">

      {/* -----------------------------
          EN-TÊTE
      ----------------------------- */}

      <div className="page-header">

        <div>

          <h1>Mes projets</h1>

          <p>
            Gérez et suivez l'avancement de vos projets.
          </p>

        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            setModal("nouveauProjet")
          }
        >
          <Plus size={18} />
          Nouveau projet
        </button>

      </div>

      {/* -----------------------------
          BARRE D'OUTILS
      ----------------------------- */}

      <div className="projects-toolbar">

        {/* RECHERCHE */}

        <div className="search-box">

          <Search size={18} />

          <input
            type="search"
            placeholder="Rechercher un projet..."
            value={recherche}
            onChange={(event) =>
              setRecherche(event.target.value)
            }
          />

        </div>

        {/* FILTRE */}

        <div className="toolbar-select">

          <SlidersHorizontal size={17} />

          <select
            value={filtre}
            onChange={(event) =>
              setFiltre(event.target.value)
            }
          >
            <option value="tous">
              Tous les projets
            </option>
            <option value="en_cours">
              En cours
            </option>
            <option value="termine">
              Terminés
            </option>
            <option value="en_retard">
              En retard
            </option>
          </select>

        </div>

        {/* TRI */}

        <div className="toolbar-select">

          <select
            value={tri}
            onChange={(event) =>
              setTri(event.target.value)
            }
          >
            <option value="recent">
              Plus récents
            </option>

            <option value="ancien">
              Plus anciens
            </option>

            <option value="progression">
              Progression
            </option>

            <option value="nom">
              Nom
            </option>
          </select>

        </div>

      </div>

      {/* -----------------------------
          NOMBRE DE PROJETS
      ----------------------------- */}

      <div className="projects-result-info">

        <span>
          {projetsFiltres.length}{" "}
          {projetsFiltres.length > 1
            ? "projets"
            : "projet"}
        </span>

      </div>

      {/* -----------------------------
          LISTE DES PROJETS
      ----------------------------- */}

      {projetsFiltres.length > 0 ? (

        <div className="projects-grid">

          {projetsFiltres.map((projet) => {

            const tachesProjets = taches.filter(
              (tache) =>
                tache.projetId === projet.id
            )

            const projetProgression =
              tachesProjets.length === 0
                ? 0
                : Math.round(
                    (tachesProjets.filter(
                      (tache) =>
                        tache.statut === "terminee"
                    ).length / tachesProjets.length) * 100
                  )

            return (
              <CarteProjet
                key={projet.id}
                projet={projet}
                progression={projetProgression}
                taches={projet.tachesProjets}
                onOuvrir={handleOuvrir}
                onModifier={handleModifier}
                onSupprimer={handleSupprimer}
              />
            )

          })}

        </div>

      ) : (

        /* -----------------------------
            AUCUN RÉSULTAT
        ----------------------------- */

        <div className="empty-state">

          <div className="empty-state-icon">
            <FolderKanban size={28} />
          </div>

          <h3>Aucun projet trouvé</h3>

          <p>
            Aucun projet ne correspond à
            votre recherche ou à vos filtres.
          </p>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setRecherche("");
              setFiltre("tous");
              setTri("recent");
            }}
          >
            Réinitialiser les filtres
          </button>

        </div>

      )}

      {/* -----------------------------
          MODALES
      ----------------------------- */}

      <Modals
        key={
          modal === "modifierProjet"
            ? `modif-${projetSelectionne?.id ?? ""}`
            : modal ?? "none"
        }
        modal={modal}
        onClose={fermerModal}
        projets={projets}
        projetSelectionne={projetSelectionne}
      />

    </div>
  );
}