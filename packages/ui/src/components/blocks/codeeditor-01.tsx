"use client";

import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import { Button } from "@/components/ui/button";

// Import our custom RISC-V mode
import "./riscv-mode";

interface CodeEditorProps {
  name: string;
  width: string;
  height: string;
  code: string;
  readOnly: boolean;
  useWorker: boolean;
  className: string;
  theme: "One Dark" | "Github Light Default";
  setCode: (code: string) => {};
}
export const CodeEditor: React.FC = ({
  name = "code",
  width,
  height,
  code,
  className,
  setCode,
  theme,
  readOnly = false,
  useWorker = false,
}: CodeEditorProps) => {
  useEffect(() => {
    // Set initial code
    setCode(`# RISC-V Assembly Example
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
`);
  }, []);

  return (
    <AceEditor
      mode={name}
      className={className}
      theme="monokai"
      onChange={setCode}
      name={name + "-editor"}
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        readOnly: readOnly,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        theme: theme,
        useWorker: useWorker,
        tabSize: 4,
      }}
      value={code}
      style={{ width: width, height: height }}
    />
  );
};
