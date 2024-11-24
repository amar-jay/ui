// This is the fixture file for Sidebar
import "~/index.css";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Calendar, Home, Inbox, Settings } from "lucide-react";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
const SidebarDemo = ({ side = "right" }) => (
  <SidebarProvider>
    <Sidebar side={side}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    <main>
      <SidebarTrigger />
      <h1 className="text-2xl text-center pb-8">Main Page</h1>
      <p className="px-6 mx-auto mb-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        elementum porta semper. Aenean at commodo dui, vel interdum elit. In hac
        habitasse platea dictumst. Vestibulum placerat iaculis ex, non tincidunt
        magna condimentum vel. Sed scelerisque libero in elementum blandit. Sed
        lobortis scelerisque magna efficitur lobortis. Nulla congue tempus
        lectus et euismod. Cras sed scelerisque libero. Vivamus tortor enim,
        auctor quis turpis sit amet, laoreet imperdiet nunc. Nunc cursus massa
        sit amet faucibus vestibulum. Vestibulum ornare eget tortor nec tempor.
        Aliquam eu nunc neque. Pellentesque enim enim, dictum non dui vitae,
        dictum hendrerit erat.
      </p>
      <p className="px-6 mx-auto mb-3">
        Ut orci enim, congue in molestie placerat, pharetra a dui. Mauris ac
        augue eget tortor finibus egestas viverra eu neque. Sed rutrum, magna a
        dapibus cursus, tellus quam dictum libero, id lobortis massa metus quis
        ex. Praesent ut eros congue, viverra orci a, blandit purus. Fusce
        tincidunt lacinia lectus eu tempus. Praesent tristique sapien semper
        tristique eleifend. Cras felis velit, luctus in faucibus nec, suscipit
        ut nisi. Donec venenatis pulvinar ante, sed tempor nisi cursus vitae.
        Vestibulum porttitor rhoncus nulla, non facilisis lorem volutpat eget.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In risus nisl,
        lobortis nec lacus et, sagittis sollicitudin nisl. Sed finibus a arcu eu
        viverra. Proin vel elementum nisi. Pellentesque id ligula neque.
      </p>
    </main>
  </SidebarProvider>
);
export default <SidebarDemo side="left" />;
