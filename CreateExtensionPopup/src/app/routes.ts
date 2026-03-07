import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Compare from "./pages/Compare";
import ResumeDetail from "./pages/ResumeDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/compare",
    Component: Compare,
  },
  {
    path: "/resume",
    Component: ResumeDetail,
  },
]);