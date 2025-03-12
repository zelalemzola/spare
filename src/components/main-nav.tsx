import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
    pathname?: string
}

export function MainNav({ className, pathname = "", ...props }: MainNavProps) {
    const routes = [
        { href: "/", label: "Dashboard" },
        { href: "/inventory", label: "Inventory" },
        { href: "/sales", label: "Sales" },
        { href: "/reports", label: "Reports" },
        { href: "/settings", label: "Settings" },
    ]

    return (
        <nav className={cn("flex items-center", className)} {...props}>
            {/* Mobile Menu (Hamburger) */}
            <div className="flex md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="mr-2">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                        <div className="flex flex-col space-y-4 py-4">
                            {routes.map((route) => {
                                const isActive = pathname === route.href || (route.href !== "/" && pathname.startsWith(route.href))
                                return (
                                    <Link
                                        key={route.href}
                                        href={route.href}
                                        className={cn(
                                            "px-2 py-2 text-base font-medium transition-colors hover:text-primary",
                                            isActive ? "text-primary" : "text-muted-foreground",
                                        )}
                                    >
                                        {route.label}
                                    </Link>
                                )
                            })}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-6">
                {routes.map((route) => {
                    const isActive = pathname === route.href || (route.href !== "/" && pathname.startsWith(route.href))
                    return (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                isActive ? "text-primary" : "text-muted-foreground",
                            )}
                        >
                            {route.label}
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}

