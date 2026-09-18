import TacheRecente from "./TacheRecente";

export default function RecentTaskTable({ taches = [] }) {
  console.log("taches recu", taches)
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
              key={tache?.id}
              {...tache}
            />
          ))}
        </tbody>

      </table>
    </div>
  );
}