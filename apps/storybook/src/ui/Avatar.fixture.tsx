// This is the fixture file for Avatar
import "~/index.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default (
  <Avatar>
    <AvatarImage
      src="https://avatars.githubusercontent.com/u/64834413"
      alt="@amar-jay"
    />
    <AvatarFallback>AM</AvatarFallback>
  </Avatar>
);
