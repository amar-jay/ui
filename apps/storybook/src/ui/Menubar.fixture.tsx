// This is the fixture file for Menubar
import "~/index.css";

import {
  CopyIcon,
  ExternalLinkIcon,
  LucideGithub,
  InstagramIcon,
  GalleryVerticalEndIcon,
  XIcon,
} from "lucide-react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

function StaticMenubar() {
  return (
    <div className="relative max-w-fit">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Window <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>New Incognito Window</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Email link</MenubarItem>
                <MenubarItem>Messages</MenubarItem>
                <MenubarItem>Notes</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              Print... <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Find</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Search the web</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Find...</MenubarItem>
                <MenubarItem>Find Next</MenubarItem>
                <MenubarItem>Find Previous</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>
              Always Show Full URLs
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem inset>
              Reload <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled inset>
              Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Toggle Fullscreen</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Hide Sidebar</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Profiles</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value="benoit">
              <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
              <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
              <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarItem inset>Edit...</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Add Profile...</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export function FloatingMenubar() {
  return (
    <Menubar className="fixed w-fit bg-background/50 text-foreground  mx-auto inset-0 mt-10 shadow-md z-50">
      <MenubarMenu>
        <a href={"#"} passHref>
          <GalleryVerticalEndIcon className="h-4 w-4 cursor-pointer text-primary mx-3" />
        </a>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent className="bg-background text-foreground">
          <MenubarItem>
            New Upload<MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Clear Image <MenubarShortcut>⌘C</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>
                Twitter
                <MenubarShortcut>
                  <XIcon className="h-4 w-4" />
                </MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Instagram
                <MenubarShortcut>
                  <InstagramIcon className="h-4 w-4" />
                </MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Copy Link
                <MenubarShortcut>
                  <CopyIcon className="h-4 w-4" />
                </MenubarShortcut>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem disabled>Not implemented yet</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>About</MenubarTrigger>
        <MenubarContent className="bg-background text-foreground">
          <MenubarItem>
            Github
            <MenubarShortcut>
              <LucideGithub className="h-4 w-4" />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Instagram
            <MenubarShortcut>
              <InstagramIcon className="h-4 w-4" />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Blog
            <MenubarShortcut>
              <ExternalLinkIcon className="h-4 w-4" />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>See more like this...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <a href={"#"}>
          <ExternalLinkIcon className="h-4 w-4 cursor-pointer text-secondary mr-3" />
        </a>
      </MenubarMenu>
    </Menubar>
  );
}
export default {
  "Basic/Static": StaticMenubar,
  Floating: FloatingMenubar,
};
