import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import React from "react";
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";

const handleLogout = async () => {
    try {
        await signOut(auth);
        console.log("User signed out successfully");
    } catch (error) {
        console.error("Error signing out:", error);
    }
};

const Banner = () => {
    return (
        <div className="flex">
            <NavigationMenu className="flex w-full">
                <NavigationMenuList className="flex w-full gap-2">
                    <NavigationMenuItem className="text-white">
                        <NavigationMenuLink href="/login">
                            Home
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="text-white">
                        <NavigationMenuLink href="/about">
                            About
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="text-white">
                        <NavigationMenuLink href="/contact">
                            Contact
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="text-white">
                        <NavigationMenuLink href="/form">
                            Form
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="text-white">
                        <NavigationMenuLink href="/" onClick={handleLogout}>
                            Logout
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
};

export default Banner;
