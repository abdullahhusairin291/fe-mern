import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const PublicLayout = () => {
  const navigation = useNavigation();
  const isPageLoadinh = navigation.state === "loading";

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Nav />
        {isPageLoadinh ? (
          <Loading />
        ) : (
          <main className="flex-1">
            <Outlet />
          </main>
        )}
        <Footer />
      </div>
    </>
  );
};

export default PublicLayout;
