import { Outlet } from "react-router-dom";

// in code layout haman master hast ke matavanim baraye
// ghaleb bandy kole proje az an estefadeh konim
// hameye componentha dar Outlet render mishavand
export const Layout = () => {
  return (
    <main className="App">
      <Outlet />
    </main>
  );
};
