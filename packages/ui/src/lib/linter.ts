export interface LinterIssue {
  line: number;
  severity: "error" | "warning";
  message: string;
}

export const lintRISCVAssembly = (content: string): LinterIssue[] => {
  const issues: LinterIssue[] = [];
  const lines = content.split("\n");
  const validInstructions = new Set([
    "add",
    "sub",
    "and",
    "or",
    "xor",
    "sll",
    "srl",
    "sra",
    "addi",
    "andi",
    "ori",
    "xori",
    "slli",
    "srli",
    "srai",
    "lw",
    "sw",
    "lb",
    "lbu",
    "sb",
    "beq",
    "bne",
    "blt",
    "bge",
    "bltu",
    "bgeu",
    "jal",
    "jalr",
    "lui",
    "auipc",
  ]);

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine === "" || trimmedLine.startsWith("#")) return;

    const parts = trimmedLine.split(/\s+/);
    const instruction = parts[0];

    if (!validInstructions.has(instruction) && !instruction.startsWith(".")) {
      issues.push({
        line: index + 1,
        severity: "error",
        message: `Invalid instruction: ${instruction}`,
      });
    }

    const registerPattern =
      /\b([xat][0-9]|[sa][0-7]|t[p0-6]|fp|ra|sp|gp|tp)\b/g;
    const registers = trimmedLine.match(registerPattern) || [];
    registers.forEach((reg) => {
      if (!["x0", "x1", "x2", "sp", "fp", "ra", "zero"].includes(reg)) {
        issues.push({
          line: index + 1,
          severity: "warning",
          message: `Unusual register name: ${reg}`,
        });
      }
    });

    if (
      index === 0 &&
      !trimmedLine.startsWith(".text") &&
      !trimmedLine.startsWith(".data")
    ) {
      issues.push({
        line: index + 1,
        severity: "warning",
        message: "Missing section directive (.text or .data)",
      });
    }

    if (instruction === "lui" && parts.length !== 3) {
      issues.push({
        line: index + 1,
        severity: "error",
        message: "Incorrect LUI instruction format",
      });
    }
  });

  return issues;
};
