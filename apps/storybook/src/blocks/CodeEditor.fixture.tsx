import { RiscvCodeEditor } from "@/components/blocks/codeeditor-03.tsx";
import { RISCVCodeEditor } from "@/components/blocks/codeeditor-04.tsx";
import { RISCVCodeEditor as RISCVCodeEditor05 } from "@/components/blocks/codeeditor-05.tsx";
import { RISCVCodeEditor as RISCVCodeEditor06 } from "@/components/blocks/codeeditor-06.tsx";
import { CodeEditor } from "@/components/blocks/codeeditor-01.tsx";
import { useState } from "react";

export default {
  Simple: () => {
    const [code, setCode] = useState("");
    return (
      <div className="flex min-h-screen">
        <CodeEditor
          className="px-8 py-6 my-auto mx-auto"
          width="80%"
          height="80vh"
          code={code}
          setCode={setCode}
          name="riscv"
        />
      </div>
    );
  },

  "RISCV Editor": <RiscvCodeEditor />,
  "RISCV CodeEditor - v0": <RISCVCodeEditor />,
  "RISCV CodeEditor": <RISCVCodeEditor05 />,
  "RISCV CodeEditor 06": <RISCVCodeEditor06 />,
};
