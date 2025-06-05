

// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Navbar() {
//   const { user, logout, loading } = useAuth();
//   console.log("Navbar user:", user);

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   if (loading) {
//     return (
//       <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center mb-6">
//         <div className="text-xl font-bold">CraftKart</div>
//         <div>Loading...</div>
//       </nav>
//     );
//   }

//   return (
//     <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center mb-6">
//       <div className="text-xl font-bold">
//         <Link to="/">CraftKart</Link>
//       </div>

//       <div className="flex gap-4 items-center">
//         <Link to="/" className="hover:underline">
//           Home
//         </Link>

//         {user ? (
//           <>
//             <Link to="/cart" className="hover:underline">
//               Cart
//             </Link>

//             {user?.role?.toLowerCase() === "artisan" && (
//               <Link to="/artisan/dashboard" className="hover:underline">
//                 Artisan Dashboard
//               </Link>
//             )}

//             <button onClick={handleLogout} className="hover:underline">
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="hover:underline">
//               Login
//             </Link>
//             <Link to="/register" className="hover:underline">
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }





























import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center mb-6">
        <div className="text-xl font-bold">CraftKart</div>
        <div>Loading...</div>
      </nav>
    );
  }

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center mb-6">
      <div className="text-xl font-bold">
        <Link to="/">Desi-Etsy</Link>
      </div>

      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:underline">
          Home
        </Link>

        {user ? (
          <>
            {/* ✅ Only show Cart if user is NOT an artisan */}
            {user?.role?.toLowerCase() !== "artisan" && (
              <Link to="/cart" className="hover:underline">
                Cart
              </Link>
            )}

            {/* ✅ Show Artisan Dashboard if role is artisan */}
            {user?.role?.toLowerCase() === "artisan" && (
              <Link to="/artisan/dashboard" className="hover:underline">
                Artisan Dashboard
              </Link>
            )}

            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
