// import { Navigate, Outlet, useLocation } from "react-router-dom";

// import Navbar from "../../components/Navbar";
// import Footer from "../../components/MyFooter";

// const PublicMiddleware = ({ isLoggedIn }) => {
//   const location = useLocation();

//   if (isLoggedIn) return <Navigate to="/dashboard" />;

//   return location.pathname == "/" ? (
//     <>
//       <Navbar />

//       <main>
//         <Outlet />
//       </main>

//       <Footer />
//     </>
//   ) : (
//     <main>
//       <Outlet />
//     </main>
//   );
// };

// export default PublicMiddleware;

import { Navigate, Outlet, useLocation } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/MyFooter";

const PublicMiddleware = ({ isLoggedIn }) => {
  const location = useLocation();

  if (isLoggedIn && location.pathname.includes(["/", "/about", "/shop"])) {
    return <Navigate to="/user/dashboard" />;
  }

  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default PublicMiddleware;
