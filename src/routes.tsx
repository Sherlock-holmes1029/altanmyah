import { createBrowserRouter } from "react-router-dom";
import Login from "./Routes/Login";
import Dashboard from "./Routes/DashboardPage";
import RootLayout from "./Components/Layout/RootLayout";
import Guard from "./Guards/Auth";
import Testing from "./Routes/Testing";

export const router = createBrowserRouter([
 
  {
    path: "/login",
    element: <Login />,
  },

  
  {
    path: "/",
    element: (
      // <Guard>
        <RootLayout />
      // </Guard>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "testing",
        element: <Testing />,
      }
    ],
  },
]);
