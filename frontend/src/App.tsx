import { Routes, Route } from "react-router";
import { SelectedListProvider } from "./contexts/SelectedListContext";
import Home from "./views/Home";

function App() {
  return (
    <SelectedListProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </SelectedListProvider>
  );
}

export default App;
