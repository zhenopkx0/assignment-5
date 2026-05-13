import { Footer, User, Header } from "@/components";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <User />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
