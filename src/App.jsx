import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import MoviesPage from "./pages/Movies/MoviesPage.jsx";
import RegisterLayout from "./layouts/RegisterLayout";
import SignIn from "./pages/Register/SignIn/SignIn.jsx";
import SignUp from "./pages/Register/SignUp/SignUp";
import GlobalProvider from "./context/GlobalProvider.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import ProfileLayout from "./layouts/ProfileLayout.jsx";
import Library from "./pages/Library/Library.jsx";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import MovieLayout from "./layouts/MovieLayout.jsx";
import SingleBigMovie from './components/SingleBigmovie/SingleBigMovie';

function App() {
  const isShow = JSON.parse(localStorage.getItem("isShow"))
    ? JSON.parse(localStorage.getItem("isShow"))
    : false;
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/movies" element={<MovieLayout />}>
            <Route index element={<MoviesPage />} />
            <Route path=":id" element={<SingleBigMovie />} />
          </Route>
          <Route path="/library" element={<Library />} />
        </Route>
        {!isShow && (
          <Route element={<RegisterLayout />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
        )}
        {isShow && (
          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        )}
        <Route path="*" element={<PageNotFound />} />
      </>
    )
  );

  return (
    <>
      <GlobalProvider>
        <RouterProvider router={routes} />
      </GlobalProvider>
    </>
  );
}

export default App;
