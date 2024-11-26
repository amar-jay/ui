"use client";

import React, { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Save,
  Terminal,
  AlertTriangle,
  Check,
  XIcon,
  File,
  AudioWaveform,
  Command,
  Home,
  Inbox,
  Search,
  Sparkles,
  Plus,
  Folder,
  ChevronDown,
  GalleryVerticalEndIcon,
} from "lucide-react";
import { lintRISCVAssembly, LinterIssue } from "@/lib/linter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@radix-ui/react-separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { TeamSwitcher } from "../team-switcher";
import { Label } from "recharts";
import { Dialog } from "@radix-ui/react-dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface FileStructure {
  [key: string]: string | FileStructure;
}
interface File {
  id: string;
  name: string;
  content: string;
  issues: LinterIssue[];
}

const renderFileTree = (structure: FileStructure, path: string = "") => {
  const openFile = (val: string) => {};
  return Object.entries(structure).map(([key, value]) => {
    const fullPath = path ? `${path}/${key}` : key;
    if (typeof value === "string") {
      return (
        <div key={fullPath} className="flex items-center space-x-2 py-1">
          <File className="h-4 w-4" />
          <button
            onClick={() => openFile(fullPath)}
            className="text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {key}
          </button>
        </div>
      );
    } else {
      return (
        <div key={fullPath}>
          <div className="flex items-center space-x-2 py-1">
            <Folder className="h-4 w-4" />
            <span className="text-sm font-medium">{key}</span>
          </div>
          <div className="pl-4">{renderFileTree(value, fullPath)}</div>
        </div>
      );
    }
  });
};

const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: Command,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Ask AI",
      url: "#",
      icon: Sparkles,
    },
    {
      title: "Home",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
      badge: "10",
    },
  ],
};

export const RISCVCodeEditor: React.FC = () => {
  const [files, setFiles] = useState<File[]>([
    {
      id: "1",
      name: "main.s",
      content:
        "# RISC-V Assembly Code\n\n.text\n.globl main\n\nmain:\n    # Your code here\n",
      issues: [],
    },
  ]);
  const [activeFile, setActiveFile] = useState({ id: "1", name: "" });
  const [newFileName, setNewFileName] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [showLinter, setShowLinter] = useState(true);
  const [outputContent, setOutputContent] = useState("");
  const [errorContent, setErrorContent] = useState("");
  const textareaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>(
    {},
  );

  useEffect(() => {
    const updatedFiles = files.map((file) => ({
      ...file,
      issues: lintRISCVAssembly(file.content),
    }));
    if (JSON.stringify(updatedFiles) !== JSON.stringify(files)) {
      setFiles(updatedFiles);
    }
  }, [files]);

  useEffect(() => {
    const _activeFile = files.find((file) => file.id === activeFile.id);
    if (_activeFile) {
      const issues = lintRISCVAssembly(_activeFile.content);
      if (JSON.stringify(issues) !== JSON.stringify(_activeFile.issues)) {
        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.id === activeFile.id ? { ...file, issues } : file,
          ),
        );
      }
    }
  }, [activeFile.id, files]);

  const addNewFile = () => {
    if (newFileName) {
      const newFile: File = {
        id: String(Date.now()),
        name: newFileName.endsWith(".s") ? newFileName : `${newFileName}.s`,
        content: "# New RISC-V Assembly File\n",
        issues: [],
      };
      setFiles([...files, newFile]);
      setActiveFile({ id: newFile.id, name: newFile.name });
      setNewFileName("");
    }
  };

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter((file) => file.id !== fileId);
    setFiles(updatedFiles);

    if (updatedFiles.length > 0) {
      setActiveFile({ id: updatedFiles[0].id, name: updatedFiles[0].name });
    }
  };

  const updateFileContent = (fileId: string, newContent: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === fileId ? { ...file, content: newContent } : file,
      ),
    );
  };

  const renderLineNumbers = (content: string) => {
    const lines = content.split("\n");
    return lines.map((_, index) => (
      <div
        key={index}
        className="text-right px-1 bg-gray-50 text-gray-500 select-none"
      >
        {index + 1}
      </div>
    ));
  };

  const renderEditorWithIssues = (file: File) => {
    return (
      <div className="flex h-full">
        <div className="overflow-hidden bg-gray-50">
          {renderLineNumbers(file.content)}
        </div>
        <div className="flex-1 relative">
          <textarea
            ref={(el) => (textareaRefs.current[file.id] = el)}
            value={file.content}
            onChange={(e) => updateFileContent(file.id, e.target.value)}
            className="w-full h-full font-mono text-sm border-none outline-none resize-none pl-2"
            spellCheck="false"
          />
          {showLinter &&
            file.issues.map((issue, idx) => (
              <div
                key={idx}
                className={`absolute right-0 top-0 border-r-4 ${
                  issue.severity === "error"
                    ? "bg-red-50 border-red-500"
                    : "bg-yellow-50 border-yellow-500"
                }`}
                style={{
                  top: `${(issue.line - 1) * 1.5}em`,
                  maxWidth: "50%",
                }}
              >
                <div className="text-xs p-1 flex items-center justify-end">
                  {issue.severity === "error" ? (
                    <XIcon className="ml-1 text-red-500 h-3 w-3" />
                  ) : (
                    <AlertTriangle className="ml-1 text-yellow-500 h-3 w-3" />
                  )}
                  <span className="truncate">{issue.message}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  return (
    <Dialog>
      <SidebarProvider>
        <AppSidebar createFile={() => {}} searchFile={() => {}} />

        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                      {activeFile.name ?? "unknown"}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="ml-auto px-3">
              <div className="flex items-center space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant={showLinter ? "default" : "outline"}
                        onClick={() => setShowLinter(!showLinter)}
                        className="h-6 w-6"
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Linter</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant={showOutput ? "default" : "outline"}
                        onClick={() => setShowOutput(!showOutput)}
                        className="h-6 w-6"
                      >
                        <Terminal className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Output</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant={showErrors ? "destructive" : "outline"}
                        onClick={() => setShowErrors(!showErrors)}
                        className="h-6 w-6"
                      >
                        <AlertTriangle className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Errors</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {/*
              <NavActions />
                */}
              </div>
            </div>
          </header>

          <div className="flex flex-col w-full flex-1 border border-primary-500">
            <div className="flex-1 flex flex-col overflow-hidden">
              <Tabs
                value={activeFile.id}
                className="flex-1 flex flex-col h-full"
              >
                <TabsList className="bg-gray-100 rounded-none ">
                  {files.map((file) => (
                    <TabsTrigger
                      key={file.id}
                      value={file.id}
                      className="px-3 text-sm rounded-none mr-auto data-[state=active]:bg-white data-[state=active]:shadow-none border-b-2 data-[state=active]:border-blue-500 border-transparent"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveFile({ id: file.id, name: file.name });
                      }}
                    >
                      {file.name}
                      {showLinter && file.issues.length > 0 && (
                        <span className="ml-2 px-1 bg-red-500 text-white text-xs rounded-full">
                          {file.issues.length}
                        </span>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {files.map((file) => (
                  <TabsContent
                    key={file.id}
                    value={file.id}
                    className="flex-1 p-2"
                  >
                    <Card className="h-full flex flex-col border rounded-none">
                      <CardContent className="flex-1 p-0 overflow-hidden">
                        {renderEditorWithIssues(file)}
                      </CardContent>
                      <div className="p-2 bg-gray-50 flex justify-between">
                        <div>
                          {showLinter && file.issues.length > 0 && (
                            <div className="text-sm text-yellow-600">
                              {file.issues.length} issue
                              {file.issues.length !== 1 ? "s" : ""} detected
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="h-7 px-2 text-xs font-medium flex items-center"
                            variant="outline"
                            onClick={() => {
                              // Placeholder for compile and run functionality
                              setOutputContent(
                                "Compilation and execution not implemented yet.",
                              );
                              setShowOutput(true);
                            }}
                          >
                            Compile & Run
                          </Button>
                          <Button
                            size="sm"
                            className="h-7 px-2 text-xs font-medium flex items-center"
                            onClick={() => {
                              // Placeholder for save functionality
                              console.log(
                                "File saved:",
                                files.find((f) => f.id === activeFile.id)?.name,
                              );
                            }}
                          >
                            <Save className="mr-1 h-3 w-3" /> Save File
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            {showOutput && (
              <div className="bg-black text-white p-4 h-1/3 overflow-auto">
                <h3 className="text-lg font-semibold mb-2">Output</h3>
                <pre>{outputContent}</pre>
              </div>
            )}
            {showErrors && errorContent && (
              <div className="bg-red-100 text-red-900 p-4 h-1/3 overflow-auto">
                <h3 className="text-lg font-semibold mb-2">Errors</h3>
                <pre>{errorContent}</pre>
              </div>
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </Dialog>
  );
};

const files: FileStructure = {
  "main.s": `# RISC-V Assembly Example
.text
.globl _start

_start:
    li a0, 1        # File descriptor: 1 is stdout
    la a1, message  # Load address of message
    li a2, 13       # Length of message
    li a7, 64       # System call: write
    ecall

    li a7, 93       # System call: exit
    li a0, 0        # Exit code: 0
    ecall

.data
message:
    .string "Hello, RISC-V"
`,
  "functions.s": `# RISC-V Assembly Functions
.text
.globl add_numbers

add_numbers:
    add a0, a0, a1
    ret
`,
  examples: {
    "loop.s": `# RISC-V Assembly Loop Example
.text
.globl _start

_start:
    li t0, 0       # Initialize counter
    li t1, 10      # Set loop limit

loop:
    addi t0, t0, 1 # Increment counter
    blt t0, t1, loop # Branch if less than limit

    li a7, 93      # System call: exit
    li a0, 0       # Exit code: 0
    ecall
`,
  },
};
export function AppSidebar({
  createFile,
  searchFile,
  ...props
}: { createFile: () => void; searchFile: () => void } & React.ComponentProps<
  typeof Sidebar
>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <SidebarMenuButton className="w-fit px-1.5">
          <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <GalleryVerticalEndIcon className="size-3" />
          </div>
          <span className="truncate font-semibold">RISCV Editor</span>
        </SidebarMenuButton>
        <SearchForm />

        <div className="space-x-1 ml-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant={"outline"}
                onClick={() => createFile()}
                className="h-6 w-6 rounded-none "
              >
                <Plus className="w-3 h-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Create</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant={"outline"}
                onClick={() => searchFile()}
                className="h-6 w-6 rounded-none bg-primary text-primary-foreground"
              >
                <Search className="w-3 h-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Search</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="px-4 py-1">{renderFileTree(files)}</div>
        </ScrollArea>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search the docs..."
            className="pl-8"
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
