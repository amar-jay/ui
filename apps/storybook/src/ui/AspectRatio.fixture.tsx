// This is the fixture file for AspectRatio
import "~/index.css";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default (
  <AspectRatio ratio={16 / 9} className="bg-muted">
    <img
      src="https://images.unsplash.com/photo-1721332155545-c7a8005a2581?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Photo from Unsplash by Samsung"
      //fill="true"
      className="h-full w-full rounded-md object-cover"
    />
  </AspectRatio>
);
