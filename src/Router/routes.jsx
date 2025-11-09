import { createBrowserRouter } from "react-router";
import Loading from "../Pages/Loading";
import MainLayOut from "../LayOuts/MainLayOut";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AllMovies from "../Pages/AllMovies";
import AddMovie from "../Pages/AddMovie";
import Error from "../Pages/Error";
import MovieDetails from "../Pages/MovieDetails";
import PrivateRoute from "../Private/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    hydrateFallbackElement: <Loading></Loading>,

    children: [
        {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/all-movies",
    element: <AllMovies></AllMovies>,
  },
  {
    path: "/add-movie",
    element: <AddMovie></AddMovie>,
  },
  {
        path: 'movie/:id',
        element: <PrivateRoute><MovieDetails></MovieDetails></PrivateRoute>,  
      },
  {
     path: "/login",
    element: <Login></Login>,
},
{
     path: "/register",
    element: <Register></Register>,
},
    ]
  },

  {
    path: "*",
    element:<Error></Error>,
  },
]);

export default router;