import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { Cadastro } from "./pages/register";
import { CarDetail } from "./pages/car";
import { New } from "./pages/dashboard/new";

import { Layout } from "./components/layout";
import { Private } from "./routers/Private";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/car/:id",
        element: <CarDetail />
      },

      {
        path: "/dashboard",
        element: <Private><Dashboard /></Private>
      },

      {
        path: "/dashboard/new",
        element: <Private><New /></Private>
      },
    ]
  },
  {
    path: "/login",
    element: <Login />

  },
  {
    path: "/cadastro",
    element: <Cadastro />
  },
])

export {router};