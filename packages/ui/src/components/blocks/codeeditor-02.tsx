"use client";

import React, { useEffect } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

// Import our custom RISC-V mode
import "./riscv-mode";

interface CodeEditorProps {
  name: string;
  width: string;
  height: string;
  code: string;
  readOnly: boolean;
  useWorker: boolean;
  theme: "monokai" | "tomorrow" | "github";
  setCode: (code: string) => {};
}
export const CodeEditor: React.FC<CodeEditorProps> = ({
  name = "code",
  width,
  height,
  code,
  readOnly = false,
  useWorker = false,
  theme = "monokai",
  setCode,
}) => {
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
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <AceEditor
        mode={name}
        theme={theme}
        onChange={setCode}
        name={name + "-editor"}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          readOnly: readOnly,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          useWorker: useWorker,
          tabSize: 4,
        }}
        value={code}
        style={{ width: width, height: height }}
      />
    </div>
  );
};
