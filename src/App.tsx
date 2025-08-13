import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { SidebarProvider } from "./Context/SidebarContext";
import { getAndRegisterEsriToken } from "./Services/Auth/Token";

function App() {

  getAndRegisterEsriToken()


  return (
    <SidebarProvider>
      <RouterProvider router={router} />
    </SidebarProvider>
  );
}

export default App;
