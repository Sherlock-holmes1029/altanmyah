import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { SidebarProvider } from "./Context/SidebarContext";


function App() {

  return (
    <SidebarProvider>
      <RouterProvider router={router} />
    </SidebarProvider>
  );
}

export default App;
