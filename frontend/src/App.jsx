import { createBrowserRouter, RouterProvider } from "react-router";

import Login from './auth/login';
import SignUp from './auth/signup';
import UploadFile from "./upload";

const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/upload", element: <UploadFile /> },
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
