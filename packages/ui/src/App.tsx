//import { useState } from "react";
import "./App.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar_2 } from "@/components/app-sidebar";
import { Page } from "@/components/blocks/sidebar-15";

function App() {
  return <Page />;

  /*
  const [count, setCount] = useState(0);
  return (
    <TheSidebar>
      <div className="w-full mx-auto">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </TheSidebar>
  );
    */
}

export default App;

function TheSidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar_2 />
      <main className="w-full">
        {" "}
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
