// This is the fixture file for AspectRatio
import "~/index.css";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default (
  <AspectRatio ratio={16 / 9} className="bg-muted">
    <Image
      src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
      alt="Photo by Drew Beamer"
      fill
      className="h-full w-full rounded-md object-cover"
    />
  </AspectRatio>
);
