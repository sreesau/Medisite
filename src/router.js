import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ListMedicines from "./Components/medicine/ListMedicines";
import CreateMedicine from "./Components/medicine/CreateMedicine";
import ViewMedicines from "./Components/medicine/ViewMedicines";
import EditMedicine from "./Components/medicine/EditMedicine";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import AboutUs from "./Components/AboutUs";

const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'medicine/medicines', element: <ListMedicines/>},
    { path: 'aboutus', element: <AboutUs/> },
    { path: 'medicine/medicines/create', element: <CreateMedicine/>},
    { path: 'medicine/medicines/:medicineId', element: <ViewMedicines/>},
    { path: 'medicine/medicines/:medicineId/edit', element: <EditMedicine/>},
    { path: 'register', element:<Register/>},
    { path: 'login', element:<Login/>},
]);

export default router;