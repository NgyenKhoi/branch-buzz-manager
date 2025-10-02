import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { useAuthStore } from "./store/authStore";
import { initializeMockData } from './lib/mockDataInit';

// Initialize mock data on app load
initializeMockData();

function AppWrapper() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <App />;
}

createRoot(document.getElementById("root")!).render(<AppWrapper />);
