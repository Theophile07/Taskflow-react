import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "../App";

import Dashboard from "../pages/Dashboard";
import Projets from "../pages/Projets";
import Taches from "../pages/Taches";
import Parametres from "../pages/Parametres";

import Connexion from "../pages/Connexion";
import Inscription from "../pages/Inscription";

const router = createBrowserRouter([
  // Pages de l'application avec la sidebar
  {
    path: "/",
    element: <App />,
    children: [
        {
            index: true,
            element: <Navigate to="/dashboard" replace />
        },
        {
            path: "dashboard",
            element: <Dashboard />
        },
        {
            path: "projet",
            element: <Projets />
        },
        {
            path: "taches",
            element: <Taches />
        },
        {
            path: "parametre",
            element: <Parametres />
        }
        ]
    },

    // Pages d'authentification SANS sidebar
    {
        path: "/connexion",
        element: <Connexion />
    },
    {
        path: "/inscription",
        element: <Inscription />
    }
]);

export default router;