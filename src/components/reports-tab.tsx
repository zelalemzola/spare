"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Download, FileText, RefreshCw } from "lucide-react"
import { toast } from "sonner"

export function ReportsTab() {
    const [isGenerating, setIsGenerating] = useState(false)

    const handleGenerateReport = () => {
        setIsGenerating(true)

        // Simulate report generation
        setTimeout(() => {
            setIsGenerating(false)
            toast.success("Report Generated", {
                description: "Your report has been generated successfully",
            })
        }, 1500)
    }

    const handleDownloadReport = (format: string) => {
        toast.success("Report Downloaded", {
            description: `Your report has been downloaded in ${format.toUpperCase()} format`,
        })
    }

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Generate Reports</CardTitle>
                    <CardDescription>Create detailed reports for your inventory and sales data</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Report Type
                            </label>
                            <Select defaultValue="sales">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select report type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sales">Sales Report</SelectItem>
                                    <SelectItem value="inventory">Inventory Report</SelectItem>
                                    <SelectItem value="profit">Profit Analysis</SelectItem>
                                    <SelectItem value="products">Product Performance</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Time Period
                            </label>
                            <Select defaultValue="month">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select time period" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="day">Daily</SelectItem>
                                    <SelectItem value="week">Weekly</SelectItem>
                                    <SelectItem value="month">Monthly</SelectItem>
                                    <SelectItem value="quarter">Quarterly</SelectItem>
                                    <SelectItem value="year">Yearly</SelectItem>
                                    <SelectItem value="custom">Custom Range</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Format
                            </label>
                            <Select defaultValue="pdf">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select format" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pdf">PDF</SelectItem>
                                    <SelectItem value="excel">Excel</SelectItem>
                                    <SelectItem value="csv">CSV</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Reset</Button>
                    <Button onClick={handleGenerateReport} disabled={isGenerating}>
                        {isGenerating ? (
                            <>
                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <FileText className="mr-2 h-4 w-4" />
                                Generate Report
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Reports</CardTitle>
                    <CardDescription>Access and download your previously generated reports</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="sales" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="sales">Sales</TabsTrigger>
                            <TabsTrigger value="inventory">Inventory</TabsTrigger>
                            <TabsTrigger value="profit">Profit</TabsTrigger>
                        </TabsList>

                        <TabsContent value="sales" className="space-y-4">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <div className="text-sm font-medium">Monthly Sales Report</div>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <CalendarIcon className="mr-1 h-3 w-3" />
                                            Generated on June 15, 2023
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => handleDownloadReport("pdf")}>
                                            <Download className="mr-2 h-4 w-4" />
                                            PDF
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDownloadReport("excel")}>
                                            <Download className="mr-2 h-4 w-4" />
                                            Excel
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <div className="text-sm font-medium">Weekly Sales Report</div>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <CalendarIcon className="mr-1 h-3 w-3" />
                                            Generated on June 10, 2023
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => handleDownloadReport("pdf")}>
                                            <Download className="mr-2 h-4 w-4" />
                                            PDF
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDownloadReport("excel")}>
                                            <Download className="mr-2 h-4 w-4" />
                                            Excel
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="inventory" className="space-y-4">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <div className="text-sm font-medium">Current Inventory Report</div>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <CalendarIcon className="mr-1 h-3 w-3" />
                                            Generated on June 12, 2023
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => handleDownloadReport("pdf")}>
                                            <Download className="mr-2 h-4 w-4" />
                                            PDF
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDownloadReport("excel")}>
                                            <Download className="mr-2 h-4 w-4" />
                                            Excel
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <div className="text-sm font-medium">Low Stock Report</div>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <CalendarIcon className="mr-1 h-3 w-3" />
                                            Generated on June 8, 2023
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => handleDownloadReport("pdf")}>
                                            <Download className="mr-2 h-4 w-4" />
                                            PDF
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDownloadReport("excel")}>
                                            <Download className="mr-2 h-4 w-4" />
                                            Excel
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="profit" className="space-y-4">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <div className="text-sm font-medium">Monthly Profit Analysis</div>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <CalendarIcon className="mr-1 h-3 w-3" />
                                            Generated on June 14, 2023
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => handleDownloadReport("pdf")}>
                                            <Download className="mr-2 h-4 w-4" />
                                            PDF
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDownloadReport("excel")}>
                                            <Download className="mr-2 h-4 w-4" />
                                            Excel
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <div className="text-sm font-medium">Product Profit Margins</div>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <CalendarIcon className="mr-1 h-3 w-3" />
                                            Generated on June 5, 2023
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => handleDownloadReport("pdf")}>
                                            <Download className="mr-2 h-4 w-4" />
                                            PDF
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDownloadReport("excel")}>
                                            <Download className="mr-2 h-4 w-4" />
                                            Excel
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}

