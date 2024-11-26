"use client";

import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import { Folder, File, Play } from "lucide-react";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

// Import our custom RISC-V mode
import "./riscv-mode";

interface FileStructure {
  [key: string]: string | FileStructure;
}

const initialFiles: FileStructure = {
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

export const RiscvCodeEditor: React.FC = () => {
  const [files, setFiles] = useState<FileStructure>(initialFiles);
  const [openFiles, setOpenFiles] = useState<string[]>(["main.s"]);
  const [activeFile, setActiveFile] = useState<string>("main.s");
  const [code, setCode] = useState<{ [key: string]: string }>({
    "main.s": initialFiles["main.s"] as string,
  });

  const handleCodeChange = (newCode: string) => {
    setCode({ ...code, [activeFile]: newCode });
  };

  const handleSaveCode = () => {
    console.log("Saving code:", code[activeFile]);
  };

  const handleRunCode = () => {
    console.log("Running code:", code[activeFile]);
    // Here you would typically send the code to a backend for execution
    alert("Code execution is not implemented in this demo.");
  };

  const openFile = (path: string) => {
    if (!openFiles.includes(path)) {
      setOpenFiles([...openFiles, path]);
    }
    setActiveFile(path);
    if (!code[path]) {
      setCode({ ...code, [path]: getFileContent(files, path) });
    }
  };

  const closeFile = (path: string) => {
    const newOpenFiles = openFiles.filter((file) => file !== path);
    setOpenFiles(newOpenFiles);
    if (activeFile === path) {
      setActiveFile(newOpenFiles[newOpenFiles.length - 1] || "");
    }
  };

  const getFileContent = (structure: FileStructure, path: string): string => {
    const parts = path.split("/");
    let current: string | FileStructure = structure[parts[0]];
    for (let i = 1; i < parts.length; i++) {
      if (typeof current === "object") {
        current = current[parts[i]];
      } else {
        return "";
      }
    }
    return typeof current === "string" ? current : "";
  };

  const renderFileTree = (structure: FileStructure, path: string = "") => {
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

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          RISC-V Assembly Editor
        </h1>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex">
          <div className="flex-grow">
            <Tabs value={activeFile} onValueChange={setActiveFile}>
              <div className="flex justify-between items-center bg-gray-50 border-b">
                <TabsList>
                  {openFiles.map((file) => (
                    <TabsTrigger key={file} value={file} className="relative">
                      {file}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          closeFile(file);
                        }}
                        className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        aria-label={`Close ${file}`}
                      >
                        ×
                      </button>
                    </TabsTrigger>
                  ))}
                </TabsList>
                <div className="flex space-x-2 p-2">
                  <Button onClick={handleSaveCode}>Save</Button>
                  <Button
                    onClick={handleRunCode}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Run
                  </Button>
                </div>
              </div>
              {openFiles.map((file) => (
                <TabsContent key={file} value={file} className="p-0 m-0">
                  <AceEditor
                    mode="riscv"
                    theme="monokai"
                    onChange={handleCodeChange}
                    name={`riscv-editor-${file}`}
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                      enableBasicAutocompletion: true,
                      enableLiveAutocompletion: true,
                      enableSnippets: true,
                      showLineNumbers: true,
                      tabSize: 4,
                    }}
                    value={code[file] || ""}
                    style={{ width: "100%", height: "calc(100vh - 200px)" }}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
          <div className="w-64 border-l">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="text-lg font-semibold">File Manager</h2>
            </div>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="p-4">{renderFileTree(files)}</div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};
