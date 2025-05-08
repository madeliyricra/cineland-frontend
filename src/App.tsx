import Routes from "./routes";
import { CineStoreProvider } from "./hooks/useCineStore";
import "./assets/styles/global.css";

function App() {
  return (
    <CineStoreProvider>
      <Routes />
    </CineStoreProvider>
  );
}

export default App;
