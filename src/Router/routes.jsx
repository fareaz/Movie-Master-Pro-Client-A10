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
        element: (
          <PrivateRoute>
            <AddMovie></AddMovie>
          </PrivateRoute>
        ),
      },
      {
        path: "/genre/:name",
        element: <GenreMovies></GenreMovies>,
      },
      {
        path: "movie/:id",
        element: (
          <PrivateRoute>
            <MovieDetails></MovieDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-movies",
        element: (
          <PrivateRoute>
            <MyMovies></MyMovies>
          </PrivateRoute>
        ),
      },
      {
        path: "/watch-list",
        element: (
          <PrivateRoute>
            <WatchList></WatchList>
          </PrivateRoute>
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
    path: "*",
    element: <Error></Error>,
  },
]);

export default router;
