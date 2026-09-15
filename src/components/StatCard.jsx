export default function StatCard({icon:Icon, label, value, variant }){
    return (
        <div className="stat-card">

        <div className={`stat-icon ${variant}`}>
            <Icon size={22} />
        </div>

        <div>
            <p className="stat-label">
            {label}
            </p>

            <h2>
            {value}
            </h2>
        </div>

        </div>
  );
}