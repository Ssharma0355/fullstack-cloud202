import { Sidebar } from "./Sidebar"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="min-h-screen overflow-y-auto ml-64 p-6 flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
