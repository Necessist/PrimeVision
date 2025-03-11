import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main className="my-[65px]">{children}</main>
      <footer></footer>
    </>
  );
};

export default Layout;
