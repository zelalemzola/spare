"use client"

import type React from "react"

import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <div className="flex min-h-screen flex-col">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <MainNav className="mx-0 md:mx-6" pathname={pathname} />
                    <div className="ml-auto flex items-center space-x-4">
                        <Search />
                        <UserNav />
                    </div>
                </div>
            </div>
            <div className="flex-1">{children}</div>
        </div>
    )
}

