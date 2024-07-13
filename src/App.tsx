import ManinLayout from "./components/layout/ManinLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

function App() {
  return <ProtectedRoute><ManinLayout /></ProtectedRoute>;
}

export default App;
