"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, Clock, Bell, X } from "lucide-react"

interface Notification {
  id: string
  title: string
  description: string
  date: string
  type: "alert" | "info" | "success"
  read: boolean
}

export function NotificationsTab() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Low Stock Alert",
      description: "5 products are running low on stock",
      date: "2023-06-15",
      type: "alert",
      read: false,
    },
    {
      id: "2",
      title: "New Sale Completed",
      description: "Sale #SALE-007 was completed successfully",
      date: "2023-06-14",
      type: "success",
      read: false,
    },
    {
      id: "3",
      title: "Price Update",
      description: "Prices for 3 products were updated",
      date: "2023-06-13",
      type: "info",
      read: true,
    },
    {
      id: "4",
      title: "Inventory Check Reminder",
      description: "Monthly inventory check is due in 3 days",
      date: "2023-06-12",
      type: "info",
      read: true,
    },
    {
      id: "5",
      title: "Out of Stock Alert",
      description: "2 products are out of stock",
      date: "2023-06-11",
      type: "alert",
      read: true,
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </CardDescription>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">No notifications</h3>
              <p className="text-sm text-muted-foreground">You're all caught up! No notifications to display.</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-4 rounded-lg border p-4 ${!notification.read ? "bg-muted/50" : ""}`}
              >
                <div className="mt-0.5">
                  {notification.type === "alert" && <AlertCircle className="h-5 w-5 text-destructive" />}
                  {notification.type === "info" && <Clock className="h-5 w-5 text-blue-500" />}
                  {notification.type === "success" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">
                      {notification.title}
                      {!notification.read && (
                        <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                          New
                        </Badge>
                      )}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{notification.date}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{notification.description}</p>
                  {!notification.read && (
                    <Button
                      variant="link"
                      size="sm"
                      className="mt-2 h-auto p-0 text-xs"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as read
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

