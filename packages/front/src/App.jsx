import * as React from "react";
import { useUser } from "./context/auth-context";

const AuthenticatedApp = React.lazy(() => import("./authenticated-app"));
const UnauthenticatedApp = React.lazy(() => import("./unauthenticated-app"));

function App() {
  const user = useUser();
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export default App;
