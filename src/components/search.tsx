"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface SearchItem {
    id: string
    name: string
    href: string
}

interface SearchGroup {
    category: string
    items: SearchItem[]
}

export function Search() {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [activeIndex, setActiveIndex] = useState(-1)
    const [filteredResults, setFilteredResults] = useState<SearchGroup[]>([])
    const searchInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    // Mock search results - in a real app, this would be fetched from the API
    const searchResults: SearchGroup[] = [
        {
            category: "Products",
            items: [
                { id: "1", name: "Brake Pad (Front)", href: "/inventory/1" },
                { id: "2", name: "Brake Pad (Rear)", href: "/inventory/2" },
                { id: "3", name: "Oil Filter", href: "/inventory/3" },
            ],
        },
        {
            category: "Sales",
            items: [
                { id: "1", name: "Sale #SALE-001", href: "/sales/1" },
                { id: "2", name: "Sale #SALE-002", href: "/sales/2" },
            ],
        },
        {
            category: "Pages",
            items: [
                { id: "1", name: "Dashboard", href: "/" },
                { id: "2", name: "Inventory", href: "/inventory" },
                { id: "3", name: "Sales", href: "/sales" },
                { id: "4", name: "Reports", href: "/reports" },
                { id: "5", name: "Settings", href: "/settings" },
            ],
        },
    ]

    const showSearchDialog = useCallback(() => {
        setOpen(true)
    }, [])

    const handleSelect = useCallback(
        (href: string) => {
            setOpen(false)
            router.push(href)
        },
        [router],
    )

    // Filter results based on query
    useEffect(() => {
        if (!query) {
            setFilteredResults(searchResults)
            return
        }

        const filtered = searchResults
            .map((group) => ({
                ...group,
                items: group.items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())),
            }))
            .filter((group) => group.items.length > 0)

        setFilteredResults(filtered)
        setActiveIndex(-1)
    }, [query, searchResults])

    // Focus search input when dialog opens
    useEffect(() => {
        if (open && searchInputRef.current) {
            setTimeout(() => {
                searchInputRef.current?.focus()
            }, 100)
        }
    }, [open])

    // Keyboard shortcut to open search
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Get all selectable items
        const allItems = filteredResults.flatMap((group) => group.items)

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault()
                setActiveIndex((prev) => (prev < allItems.length - 1 ? prev + 1 : prev))
                break
            case "ArrowUp":
                e.preventDefault()
                setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev))
                break
            case "Enter":
                e.preventDefault()
                if (activeIndex >= 0 && activeIndex < allItems.length) {
                    handleSelect(allItems[activeIndex].href)
                }
                break
            case "Escape":
                e.preventDefault()
                setOpen(false)
                break
        }
    }

    return (
        <>
            <div className="relative w-full max-w-[160px] sm:max-w-sm">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full pl-8 pr-10"
                    onClick={showSearchDialog}
                    readOnly
                />
                <kbd className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[550px] p-0" onKeyDown={handleKeyDown}>
                    <div className="flex flex-col">
                        <div className="border-b p-4">
                            <Input
                                ref={searchInputRef}
                                placeholder="Search for products, sales, or pages..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-9"
                                autoComplete="off"
                            />
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto p-0">
                            {filteredResults.length === 0 ? (
                                <div className="p-4 text-center text-sm text-muted-foreground">No results found.</div>
                            ) : (
                                <div className="py-2">
                                    {filteredResults.map((group, groupIndex) => (
                                        <div key={group.category} className="px-2">
                                            <div className="text-xs font-medium text-muted-foreground px-2 py-1.5">{group.category}</div>
                                            <div className="mt-1 space-y-1">
                                                {group.items.map((item, itemIndex) => {
                                                    // Calculate the absolute index across all groups
                                                    const absoluteIndex =
                                                        filteredResults.slice(0, groupIndex).reduce((acc, g) => acc + g.items.length, 0) + itemIndex

                                                    return (
                                                        <button
                                                            key={`${group.category}-${item.id}`}
                                                            className={`w-full text-left px-2 py-1.5 text-sm rounded-md ${activeIndex === absoluteIndex
                                                                    ? "bg-accent text-accent-foreground"
                                                                    : "hover:bg-accent hover:text-accent-foreground"
                                                                }`}
                                                            onClick={() => handleSelect(item.href)}
                                                            onMouseEnter={() => setActiveIndex(absoluteIndex)}
                                                        >
                                                            {item.name}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="border-t p-2 text-xs text-muted-foreground">
                            <div className="flex justify-between">
                                <div>
                                    <span className="font-semibold">↑↓</span> to navigate
                                </div>
                                <div>
                                    <span className="font-semibold">↵</span> to select
                                </div>
                                <div>
                                    <span className="font-semibold">ESC</span> to close
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

