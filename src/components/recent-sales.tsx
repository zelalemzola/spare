import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
    return (
        <div className="space-y-8">
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Jackson Davis</p>
                    <p className="text-sm text-muted-foreground">Brake Pads (4x) + Oil Filter</p>
                </div>
                <div className="ml-auto font-medium">+$242.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Sarah Miller</p>
                    <p className="text-sm text-muted-foreground">Suspension Kit</p>
                </div>
                <div className="ml-auto font-medium">+$189.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback>RK</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Robert Kim</p>
                    <p className="text-sm text-muted-foreground">Alternator + Battery</p>
                </div>
                <div className="ml-auto font-medium">+$325.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback>LJ</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Lisa Johnson</p>
                    <p className="text-sm text-muted-foreground">Timing Belt Kit</p>
                </div>
                <div className="ml-auto font-medium">+$156.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback>MT</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Michael Thompson</p>
                    <p className="text-sm text-muted-foreground">Spark Plugs (6x)</p>
                </div>
                <div className="ml-auto font-medium">+$78.00</div>
            </div>
        </div>
    )
}

