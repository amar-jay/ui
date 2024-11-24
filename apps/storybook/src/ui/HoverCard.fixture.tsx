// This is the fixture file for HoverCard
import "~/index.css";
import { CalendarIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default (
  <HoverCard>
    <HoverCardTrigger asChild>
      <span>
        Hover over <Button variant="link">@amar-jay</Button>
      </span>
    </HoverCardTrigger>
    <HoverCardContent className="w-80">
      <div className="flex justify-between space-x-4">
        <Avatar>
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/64834413"
            alt="@amar-jay"
          />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">@amar-jay</h4>
          <p className="text-sm">Amar Jay - Github.com</p>
          <div className="flex items-center pt-2">
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
            <span className="text-xs text-muted-foreground">
              Joined December 2019
            </span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);
