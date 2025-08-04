"use client";

import * as React from "react";
import Link from "next/link";
import { Package, Search, ShoppingCart, Users, BarChart3 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import UserMenu from "@/components/user-menu";
import ThemeToggle from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <div className="hidden md:flex">
          <Link href="/" className="flex items-center space-x-2">
            <Package className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Gestor de Estoque
            </span>
          </Link>
        </div>

        {/* Navigation Menu - Centralizado */}
        <NavigationMenu className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
          <NavigationMenuList className="">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/dashboard"
                  className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  )}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/produtos"
                  className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  )}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Produtos
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/vendas"
                  className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  )}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Vendas
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/clientes"
                  className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  )}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Clientes
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="w-auto flex-none">
            <Button
              variant="outline"
              className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
            >
              <Search className="h-4 w-4 xl:mr-2" aria-hidden="true" />
              <span className="hidden xl:inline-flex">Buscar produtos...</span>
              <span className="sr-only">Buscar produtos</span>
            </Button>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
