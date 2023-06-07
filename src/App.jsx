import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Form from "./components/Form";
import Display from "./components/Display";
import { FormDataProvider } from "./context/FormContext";
import "./App.css";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Form />} />
        <Route path="/display" element={<Display />} />
      </>
    )
  );

  return (
    <FormDataProvider>
      <RouterProvider router={router} />
    </FormDataProvider>
  );
}

export default App;
