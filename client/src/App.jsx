import { useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { routes } from "./routes";

function App() {
  const auth = useSelector((state) => state.auth);

  const isLoggedIn = Boolean(auth?.token);
  const role = auth?.user?.userType;

  const router = createBrowserRouter(routes({ isLoggedIn, role }));

  return <RouterProvider router={router} />;
}

export default App;
