import HomePage from "../pages/HomePage";
import NotesPage from "../pages/NotesPage";
import PracticePage from "../pages/PracticePage";
import DashboardPage from "../pages/DashboardPage";
import AboutPage from "../pages/AboutPage";
import AccountPage from "../pages/AccountPage";
import { useAppContext } from "../context/AppContext";

const MainRouter = () => {
  const { currentRoute } = useAppContext();

  switch (currentRoute) {
    case "/notes": return <NotesPage />;
    case "/practice": return <PracticePage />;
    case "/dashboard": return <DashboardPage />;
    case "/about": return <AboutPage />;
    case "/account": return <AccountPage />;
    default: return <HomePage />;
  }
};

export default MainRouter;
