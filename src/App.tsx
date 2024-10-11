import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import { Layout } from "./Pages/Layout";
import { Missing } from "./Pages/Missing";
import { Home } from "./Pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* hameye componenthaye zir dara layout render misha vand */}
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />

        <Route index element={<Home />} />

        {/* in code kare safheye 404 ra mikonad */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
