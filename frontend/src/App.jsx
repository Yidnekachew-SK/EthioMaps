import { createBrowserRouter, RouterProvider } from "react-router";

import Login from './auth/login';
import SignUp from './auth/signup';

const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
