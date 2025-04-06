import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HotelRegistrationDialog} from "./Dialog";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Hotel, Wallet, Globe, CheckCircle } from "lucide-react";
import { Header } from "@/components/header";
export function Body() {
  const router = useRouter();
  function handleRedirect() {
    router.push("competitions");
  }

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Book Hotels on the{" "}
                  <span className="text-purple-600">Blockchain</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  POLY STAY is a decentralized hotel booking platform that
                  connects travelers with hotel owners across multiple
                  blockchains with privacy selfproof zk verification.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <HotelRegistrationDialog />
                </div>
              </div>
              <div className="relative h-[300px] lg:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/zkhotelimgdemo.png?height=400&width=600"
                  alt="Luxury hotel room"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className=" bg-gray-800 w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-700 dark:bg-purple-800/30 dark:text-purple-400">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Why Choose Self Stay?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform combines the best of privacy enabling with
                  privacy-preserving verification for a seamless booking
                  experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle>Privacy-First Verification</CardTitle>
                  <CardDescription>
                    Verify your identity with self protocol proofs that reveal
                    only necessary information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our self-protocol system allows you to verify your
                    nationality and gender without revealing your full passport
                    details.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Wallet className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle>Multi-Chain Payments</CardTitle>
                  <CardDescription>
                    Pay with your preferred cryptocurrency across multiple
                    blockchains supported by CCTPV2 - Circle
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Hotel owners can choose which chain they want to receive
                    payments on, giving you flexibility and users can pay in any
                    supported CCTPV2 chains.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Globe className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle>Global Availability</CardTitle>
                  <CardDescription>
                    Access hotels worldwide with no geographical restrictions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our decentralized platform connects you with hotels around
                    the world without intermediaries.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        {/* For Hotel Owners */}
        <section id="for-owners" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-700 dark:bg-purple-800/30 dark:text-purple-400">
                  For Hotel Owners
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Expand Your Reach with Blockchain
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Join the future of hospitality by listing your property on
                  POLY STAY and accepting cryptocurrency payments.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>
                      Choose which blockchain you want to receive payments on
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>
                      Access a global market of crypto-savvy travelers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>
                      Reduce fees compared to traditional booking platforms
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>
                      Manage your property with our intuitive dashboard
                    </span>
                  </li>
                </ul>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Register Your Hotel
                </Button>
              </div>
              <div className="relative h-[300px] lg:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Hotel owner using dashboard"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* For Travelers */}
        <section
          id="for-travelers"
          className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="order-2 lg:order-1 relative h-[300px] lg:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Traveler using mobile app"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 lg:order-2 space-y-4">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-700 dark:bg-purple-800/30 dark:text-purple-400">
                  For Travelers
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Travel with Privacy and Freedom
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Book hotels worldwide while maintaining your privacy and using
                  your preferred cryptocurrency.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>
                      Verify your identity with Self Protocol App that protect
                      your personal information
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Pay with your preferred blockchain USDC enabled</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>
                      Book directly with hotel owners with no intermediaries
                    </span>
                  </li>
                </ul>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Start Booking
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Blockchains */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Supported Blockchains
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  POLY STAY supports multiple blockchains for maximum
                  flexibility.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-4">
              <Card className="flex flex-col items-center justify-center p-6">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <span className="font-bold text-purple-600">BS</span>
                </div>
                <CardTitle className="text-center">BaseSepolia</CardTitle>
              </Card>
              <Card className="flex flex-col items-center justify-center p-6">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <span className="font-bold text-purple-600">
                    avalance fuji
                  </span>
                </div>
                <CardTitle className="text-center">Avalanche Fuji</CardTitle>
              </Card>
              <Card className="flex flex-col items-center justify-center p-6">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <span className="font-bold text-purple-600">Sepolia</span>
                </div>
                <CardTitle className="text-center">Ethereum Sepolia</CardTitle>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Join the Future of Hotel Booking?
                </h2>
                <p className="max-w-[900px] text-purple-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Whether you're a hotel owner or a traveler, POLY STAY offers a
                  secure, private, and flexible booking experience.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-purple-100"
                >
                  Book a Stay
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-purple-700"
                >
                  Register Your Hotel
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <Hotel className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold">POLY STAY</span>
          </div>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} POLY STAY. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}


