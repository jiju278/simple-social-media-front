import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function Provider() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Provider;
