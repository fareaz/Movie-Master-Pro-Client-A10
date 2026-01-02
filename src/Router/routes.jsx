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
import UpdataPage from "../Pages/UpdataPage";
import MyMovies from "../Pages/MyMovies";
import WatchList from "../Pages/Watchlist";
import GenreMovies from "../Pages/GenreMovies";
import About from "../Components/About";
import Contact from "../Pages/Contact";
import DashboardLayout from "../LayOuts/DashboardLayout";
import DashboardHome from "../Pages/DashboardHome/DashboardHome";
import Profile from "../Pages/Profile";
import UsersManagement from "../Pages/UsersManagement";
import ManageMovies from "../Pages/ManageMovies";
import AdminRoute from "../Private/AdminRoute";

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
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
     

      {
        path: "/genre/:name",
        element: <GenreMovies></GenreMovies>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "movie/:id",
        element: (
            <MovieDetails></MovieDetails>
        
        ),
      },
      
      {
        path: "/edit-movie/:id",
        element: (
          <PrivateRoute>
            <UpdataPage></UpdataPage>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://movie-master-server-theta.vercel.app/movieDetails/${params.id}`
          ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
   {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
  children:[
       {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "my-movies",
        element: <MyMovies></MyMovies>,
      },
      {
        path: "add-movie",
        element: <AddMovie></AddMovie>,
      },
      {
        path: "watch-list",
        element: <WatchList></WatchList>,
      },
      {
        path: "all-movies",
        element:<AdminRoute><ManageMovies></ManageMovies></AdminRoute> ,
      },
      {
        path: "users-management",
        element:<AdminRoute> <UsersManagement></UsersManagement></AdminRoute>,
      },
  
  ]},


  {
    path: "*",
    element: <Error></Error>,
  },
]);

export default router;
