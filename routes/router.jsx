import { createBrowserRouter } from "react-router-dom";

createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:[
            {path:"/connexion", element:<Connexion />},
            {path:"/inscription", element:<Inscription />},
            {path:"/dashboard", element:<Dashboard />},
            {path:"/projet", element:<Projet />},
            {path:"/detailprojet", element:<DetailProjet />},
            {path:"/parametre", element:<Parametre />}
        ]
    }
])