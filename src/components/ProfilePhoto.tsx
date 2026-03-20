import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function ProfilePhoto() {
  return (
    <div className="mx-auto mb-5 w-[120px] h-[120px] transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg rounded-full profile-photo-wrapper">
      <Avatar className="w-[120px] h-[120px] ring-2 ring-border shadow-md">
        <AvatarImage
          src="/img/20240731-240731MBB-3329-Role-Edit.webp"
          alt="Erik Role"
        />
        <AvatarFallback className="text-2xl font-heading">ER</AvatarFallback>
      </Avatar>
    </div>
  )
}
