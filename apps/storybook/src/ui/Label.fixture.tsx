// This is the fixture file for Label
import "~/index.css";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default (
  <div className="flex items-center space-x-2">
    <Checkbox id="terms" />
    <Label htmlFor="terms">Accept terms and conditions</Label>
  </div>
);
