export default function DashboardCard({ titre, description, action, children }) {
  return (
    <div className="dashboard-card">

      <div className="card-header">

        <div>
          <h3>{titre}</h3>
          <p>{description}</p>
        </div>

        {action}

      </div>

      {children}

    </div>
  );
}