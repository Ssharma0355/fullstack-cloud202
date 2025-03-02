import Link from "next/link";
import { useRouter } from "next/router";
import { Shield, Settings, Workflow, Lock, Home } from "lucide-react";


const Sidebar: React.FC= ()=>{
      const router = useRouter();

      //scedule

    const menuItems = [
      {
        name: "Basic Config",
        href: "/basic-config",
        icon: <Settings size={20} />,
      },
      { name: "RAG", href: "/rag", icon: <Shield size={20} /> },
      { name: "WorkFlow", href: "/workflow", icon: <Workflow size={20} /> },
      {
        name: "Security Overview",
        href: "/security",
        icon: <Lock size={20} />,
      },
    ];

    return (
      <aside className="w-64 h-screen bg-white text-black p-4 fixed top-0 left-0 border-r">
        <nav>
          <h2 className="font-bold flex justify-center items-center p-4 text-center">
            Assignment Next.Js
          </h2>
          <hr />
          <ul className="space-y-4 mt-9">
            {menuItems.map((item) => (
              <li
                key={item.href}
                className={`p-3 rounded-lg ${
                  router.pathname === item.href
                    ? "bg-gray-200"
                    : "hover:bg-gray-200"
                }`}
              >
                <Link href={item.href} className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    );
}
export {Sidebar}