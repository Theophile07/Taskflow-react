import TacheRecente from "./TacheRecente";

// const taches = [
//   {
//     id: 1,
//     titre: "Intégrer le formulaire",
//     projet: "Site vitrine Nguvu",
//     priorite: "haute",
//     echeance: "12 Sept. 2026",
//     statut: "en_cours",
//   },
//   {
//     id: 2,
//     titre: "Créer la page d'accueil",
//     projet: "Portfolio",
//     priorite: "moyenne",
//     echeance: "15 Sept. 2026",
//     statut: "a_faire",
//   },
//   {
//     id: 3,
//     titre: "Corriger les bugs",
//     projet: "TaskFlow",
//     priorite: "basse",
//     echeance: "18 Sept. 2026",
//     statut: "terminee",
//   },
//   {
//     id: 4,
//     titre: "Ajouter l'authentification",
//     projet: "TaskFlow",
//     priorite: "haute",
//     echeance: "20 Sept. 2026",
//     statut: "en_cours",
//   },
// ];

export default function RecentTaskTable({ taches = [] }) {
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
          </tr>
        </thead>

        <tbody>
          {taches.map((tache) => (
            <TacheRecente
              key={tache.id}
              {...tache}
            />
          ))}
        </tbody>

      </table>
    </div>
  );
}