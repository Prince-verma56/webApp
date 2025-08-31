import React, { useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  Users,
  Library,
  FileText,
  Type,
  MoreHorizontal,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sidebar menu config
const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "lifecycle", label: "Lifecycle", icon: FolderKanban },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "projects", label: "Projects", icon: FileText },
  { id: "team", label: "Team", icon: Users },
];

const docsItems = [
  { id: "library", label: "Data Library", icon: Library },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "assistant", label: "Word Assistant", icon: Type },
];

export default function UserDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  // Render different content based on sidebar selection
  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">$1,250.00</p>
                <p className="text-sm text-muted-foreground">
                  Trending up this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>New Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">1,234</p>
                <p className="text-sm text-muted-foreground">
                  Down 20% this period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">45,678</p>
                <p className="text-sm text-muted-foreground">
                  Strong user retention
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Growth Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">4.5%</p>
                <p className="text-sm text-muted-foreground">
                  Steady performance increase
                </p>
              </CardContent>
            </Card>
          </div>
        );
      case "analytics":
        return <p className="text-lg">📊 Analytics page coming soon...</p>;
      case "projects":
        return <p className="text-lg">📂 Projects page coming soon...</p>;
      case "team":
        return <p className="text-lg">👥 Team management page...</p>;
      default:
        return <p className="text-lg">⚡ Select a menu option.</p>;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`bg-card border-r transition-all duration-300 ${
          collapsed ? "w-16" : "w-60"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && <h2 className="font-bold text-xl">Acme Inc.</h2>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>

        {/* Main menu */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activePage === item.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActivePage(item.id)}
            >
              <item.icon className="h-5 w-5 mr-2" />
              {!collapsed && item.label}
            </Button>
          ))}

          {/* Documents */}
          {!collapsed && (
            <p className="px-3 mt-4 text-xs uppercase text-muted-foreground">
              Documents
            </p>
          )}
          {docsItems.map((item) => (
            <Button
              key={item.id}
              variant={activePage === item.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActivePage(item.id)}
            >
              <item.icon className="h-5 w-5 mr-2" />
              {!collapsed && item.label}
            </Button>
          ))}
        </nav>

        {/* Footer with dropdown */}
        <div className="p-4 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <MoreHorizontal className="mr-2 h-5 w-5" />
                {!collapsed && "More"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top navbar */}
        <header className="flex justify-between items-center border-b bg-card px-6 py-3">

          <h1 className="text-lg font-semibold capitalize text-center">{activePage}</h1>
          
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
}
