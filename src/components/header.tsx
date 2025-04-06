"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useEffect } from "react";
import { Shield, Hotel, Wallet, Globe, CheckCircle } from "lucide-react";

export function Header() {
  const account = useAccount();

  useEffect(() => {}, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Hotel className="h-6 w-6 text-purple-600" />
          <span className="text-xl font-bold">POLY STAY</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link
            href="#features"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="#for-owners"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            For Hotel Owners
          </Link>
          <Link
            href="./booking"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            For Travelers
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {!account?.address ? (
            <ConnectButton />
          ) : (
            <>
              <nav className="hidden md:flex gap-4 sm:gap-6">
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="/"
                >
                  About
                </Link>
              </nav>
              <ConnectButton /> {/* Show ConnectButton if user is connected */}
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
