"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false)

    const handleSaveProfile = () => {
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            toast.success("Profile Updated", {
                description: "Your profile has been updated successfully",
            })
        }, 1000)
    }

    const handleSaveCompany = () => {
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            toast.success("Company Settings Updated", {
                description: "Your company settings have been updated successfully",
            })
        }, 1000)
    }

    const handleSaveNotifications = () => {
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            toast.success("Notification Settings Updated", {
                description: "Your notification preferences have been updated",
            })
        }, 1000)
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
            </div>

            <Tabs defaultValue="profile" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="company">Company</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>Manage your personal information and preferences</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" defaultValue="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" defaultValue="john.doe@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Input id="role" defaultValue="Administrator" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSaveProfile} disabled={isLoading}>
                                {isLoading ? "Saving..." : "Save Changes"}
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>Update your password</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input id="confirm-password" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="mr-2">
                                Cancel
                            </Button>
                            <Button>Change Password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="company" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Company Information</CardTitle>
                            <CardDescription>Manage your company details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="company-name">Company Name</Label>
                                <Input id="company-name" defaultValue="Acme Auto Parts" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company-address">Address</Label>
                                <Textarea id="company-address" defaultValue="123 Main St, Anytown, USA 12345" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company-phone">Phone</Label>
                                <Input id="company-phone" type="tel" defaultValue="+1 (555) 987-6543" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company-email">Email</Label>
                                <Input id="company-email" type="email" defaultValue="info@acmeautoparts.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company-website">Website</Label>
                                <Input id="company-website" type="url" defaultValue="https://acmeautoparts.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tax-id">Tax ID / VAT Number</Label>
                                <Input id="tax-id" defaultValue="US123456789" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSaveCompany} disabled={isLoading}>
                                {isLoading ? "Saving..." : "Save Changes"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>Configure how and when you receive notifications</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Email Notifications</h3>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="email-low-stock">Low Stock Alerts</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Receive an email when products are running low on stock
                                        </p>
                                    </div>
                                    <Switch id="email-low-stock" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="email-out-of-stock">Out of Stock Alerts</Label>
                                        <p className="text-sm text-muted-foreground">Receive an email when products are out of stock</p>
                                    </div>
                                    <Switch id="email-out-of-stock" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="email-sales">Sales Notifications</Label>
                                        <p className="text-sm text-muted-foreground">Receive an email for each completed sale</p>
                                    </div>
                                    <Switch id="email-sales" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="email-reports">Weekly Reports</Label>
                                        <p className="text-sm text-muted-foreground">Receive weekly sales and inventory reports</p>
                                    </div>
                                    <Switch id="email-reports" defaultChecked />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">System Notifications</h3>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="system-low-stock">Low Stock Alerts</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Show notifications in the dashboard for low stock items
                                        </p>
                                    </div>
                                    <Switch id="system-low-stock" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="system-sales">Sales Notifications</Label>
                                        <p className="text-sm text-muted-foreground">Show notifications for completed sales</p>
                                    </div>
                                    <Switch id="system-sales" defaultChecked />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSaveNotifications} disabled={isLoading}>
                                {isLoading ? "Saving..." : "Save Preferences"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="appearance" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                            <CardDescription>Customize the look and feel of your dashboard</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Theme</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className="h-24 w-full rounded-md bg-white border"></div>
                                        <Label className="text-sm font-medium">Light</Label>
                                    </div>
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className="h-24 w-full rounded-md bg-gray-950 border border-gray-800"></div>
                                        <Label className="text-sm font-medium">Dark</Label>
                                    </div>
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className="h-24 w-full rounded-md bg-gradient-to-b from-white to-gray-950 border"></div>
                                        <Label className="text-sm font-medium">System</Label>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Dashboard Layout</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className="h-24 w-full rounded-md border p-2">
                                            <div className="h-4 w-full rounded bg-gray-200 mb-2"></div>
                                            <div className="grid grid-cols-2 gap-2 h-12">
                                                <div className="rounded bg-gray-200"></div>
                                                <div className="rounded bg-gray-200"></div>
                                            </div>
                                        </div>
                                        <Label className="text-sm font-medium">Compact</Label>
                                    </div>
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className="h-24 w-full rounded-md border p-2">
                                            <div className="h-4 w-full rounded bg-gray-200 mb-4"></div>
                                            <div className="grid grid-cols-1 gap-2 h-12">
                                                <div className="rounded bg-gray-200"></div>
                                            </div>
                                        </div>
                                        <Label className="text-sm font-medium">Comfortable</Label>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save Preferences</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

