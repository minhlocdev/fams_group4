import { Suspense } from "react";
import BackdropLoader from "./components/shared/loader/BackdropLoader";
import { Route, Routes } from "react-router-dom";
import { publicRoute } from "./routers/routes";

function App() {
  return (
    <Suspense fallback={<BackdropLoader />}>
      <Routes>
        {publicRoute.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Suspense>
  );
}

export default App;
