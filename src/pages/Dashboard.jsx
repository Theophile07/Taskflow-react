import { FolderKanban, CheckSquare, CircleCheck, Clock, AlertCircle,} from "lucide-react";
import StatCard from "../components/StatCard";
import DashboardCard from "../components/DashboardCard";
import TacheProgressCard from "../components/TacheProgressCard";
import ProjetAvancement from "../components/AvanceProjet";
import TableauTacheRecent from "../components/TableauTacheRecent";

export default function Dashboard(){
    return(
        <>
            <div className="dashboard">
                <header className="dashboard-header">
                    <div>
                        <p className="dashboard-eyebrow">Tableau de bord</p>
                        <h1>Bienvenue Jean</h1>
                        <p className="dashboard-description">Voici un aperçu de votre activité et de vos projets.</p>
                    </div>

                    <button className="btn btn-primary">
                        + Nouveau projet
                    </button>
                </header>
                
                <section className="stats-grid">
                    <StatCard 
                    icon={FolderKanban}
                    label={"Projets"}
                    value={12}
                    variant="primary"
                    />

                    <StatCard 
                    icon={CheckSquare}
                    label={"Tâches"}
                    value={24}
                    variant="blue"
                    />

                    <StatCard 
                    icon={CircleCheck}
                    label={"Terminées"}
                    value={5}
                    variant="success"
                    />

                    <StatCard 
                    icon={Clock}
                    label={"En cours"}
                    value={3}
                    variant="warning"
                    />

                    <StatCard 
                    icon={AlertCircle}
                    label={"En retard"}
                    value={2}
                    variant="danger"
                    />
                </section>

                <section className="dashboard-content">
                    <DashboardCard titre = "Progression des tâches" description="Répartition de vos tâches par statut.">
                        <TacheProgressCard/>
                    </DashboardCard>

                    <DashboardCard titre="Avancement des projets" description="Suivez la progression de vos projets."
                    action={
                        <button className="btn btn-ghost">
                            Voir tout
                        </button>
                    }>
                        <div className="project-progress-list">

                            <ProjetAvancement nom="Site vitrine Nguvu" progression={75} couleur="#21C7A5" />

                            <ProjetAvancement nom="TaskFlow" progression={50} couleur="#2563EB" />

                            <ProjetAvancement nom="Portfolio" progression={30} couleur="#F59E0B" />

                        </div>

                    </DashboardCard>
                    
                </section>

                <section className="dashboard-section">

                    <DashboardCard titre="Tâches récentes" description="Les dernières tâches créées et leur état."
                        action={
                        <button className="btn btn-ghost">
                            Voir toutes
                        </button>
                        }
                    >
                        <TableauTacheRecent />
                    </DashboardCard>

                </section>


            </div>
        </>
    )
}