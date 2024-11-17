// This is the fixture file for Toggle
import "~/index.css";
import { Bold } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

export default (
  <Toggle aria-label="Toggle bold">
    <Bold className="h-4 w-4" />
  </Toggle>
);
