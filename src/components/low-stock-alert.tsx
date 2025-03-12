"use client"

import { useState } from "react"
import { AlertCircle, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { toast } from "sonner"

export function LowStockAlert() {
    const [isVisible, setIsVisible] = useState(true)

    const handleDismiss = () => {
        setIsVisible(false)
        toast.info("Alert Dismissed", {
            description: "You can view low stock items in the Inventory section",
        })
    }

    if (!isVisible) return null

    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Low Stock Alert</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
                <div>
                    You have 5 products that are low in stock and 2 products that are out of stock.
                    <Button variant="link" className="h-auto p-0 ml-2" asChild>
                        <Link href="/inventory?status=low-stock">View Items</Link>
                    </Button>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleDismiss}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Dismiss</span>
                </Button>
            </AlertDescription>
        </Alert>
    )
}

