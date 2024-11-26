"use client";

import React, { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  X,
  Plus,
  Save,
  FileCode,
  Menu,
  Terminal,
  AlertTriangle,
  Check,
  XIcon,
  File,
  Folder,
} from "lucide-react";
import { lintRISCVAssembly, LinterIssue } from "@/lib/linter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface File {
  id: string;
  name: string;
  content: string;
  issues: LinterIssue[];
}

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
  const [activeFileId, setActiveFileId] = useState("1");
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
    const activeFile = files.find((file) => file.id === activeFileId);
    if (activeFile) {
      const issues = lintRISCVAssembly(activeFile.content);
      if (JSON.stringify(issues) !== JSON.stringify(activeFile.issues)) {
        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.id === activeFileId ? { ...file, issues } : file,
          ),
        );
      }
    }
  }, [activeFileId, files]);

  const addNewFile = () => {
    if (newFileName) {
      const newFile: File = {
        id: String(Date.now()),
        name: newFileName.endsWith(".s") ? newFileName : `${newFileName}.s`,
        content: "# New RISC-V Assembly File\n",
        issues: [],
      };
      setFiles([...files, newFile]);
      setActiveFileId(newFile.id);
      setNewFileName("");
    }
  };

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter((file) => file.id !== fileId);
    setFiles(updatedFiles);

    if (updatedFiles.length > 0) {
      setActiveFileId(updatedFiles[0].id);
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
        className="text-right pr-2 bg-gray-50 text-gray-500 select-none"
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
    <div className="flex flex-col h-screen border border-gray-200">
      <div className="flex p-2 items-center bg-gray-100 justify-between">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mr-2 h-6 w-6">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle>
                  <div className="flex items-center">
                    <FileCode className="mr-2" />
                    Project Files
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <Input
                  placeholder="New file name"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  className="mb-2"
                />
                <Button
                  onClick={addNewFile}
                  size="sm"
                  className="w-full h-7 px-2 text-xs font-medium"
                >
                  <Plus className="mr-1 h-3 w-3" /> Add File
                </Button>
              </div>
              <div className="mb-2 px-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Folder className="mr-2 h-4 w-4" />
                  <span>Project Files</span>
                </div>
              </div>
              <ScrollArea className="h-[calc(100vh-200px)] mt-4">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between py-2 px-2 hover:bg-gray-100 rounded-md"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs font-medium flex items-center justify-start w-full text-left"
                      onClick={() => setActiveFileId(file.id)}
                    >
                      <File className="mr-1 h-3 w-3" />
                      <span className="truncate">{file.name}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs font-medium text-red-500 hover:text-red-700"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            </SheetContent>
          </Sheet>
          <h2 className="text-lg font-semibold">RISC-V Code Editor</h2>
        </div>
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
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Tabs value={activeFileId} className="flex-1 flex flex-col h-full">
          <TabsList className="bg-gray-100 p-1 h-10 rounded-none">
            {files.map((file) => (
              <TabsTrigger
                key={file.id}
                value={file.id}
                className="px-3 py-1 text-sm rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none border-b-2 data-[state=active]:border-blue-500 border-transparent"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveFileId(file.id);
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
            <TabsContent key={file.id} value={file.id} className="flex-1 p-2">
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
                          files.find((f) => f.id === activeFileId)?.name,
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
  );
};
