// This is the fixture file for Avatar
import "~/index.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default (
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
);
