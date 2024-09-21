import { useEffect } from "react";
import MainLayout from "./components/layout/MainLayout";

function App() {
  useEffect(() => {
    // Remove this code to avoid dark mode
    document.documentElement.classList.remove("dark");
  }, []);
  return <MainLayout />;
}

export default App;
