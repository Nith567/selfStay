"use client";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { createPublicClient } from "viem";
import { WagmiProvider } from "wagmi";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { ToastAction } from "@/components/ui/toast";
import "viem/window";
import {
celoAlfajores
} from "wagmi/chains";
import { createWalletClient, custom } from "viem";
import { http } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: " selfStay",
  projectId:
    process.env.NEXT_PUBLIC_PROJECT_ID || "3edba4009c97c98400b0c8df8ca3d590",
  chains: [celoAlfajores],
  transports: {
    [celoAlfajores.id]: http(
      "https://celo-alfajores.g.alchemy.com/v2/QyxMOKTYrNkmofq71rof8WEO1kw9VuI4"
    )
  },
});

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export const walletClient = createWalletClient({
  chain: celoAlfajores,
  transport: custom(window.ethereum!),
  // transport: http(),
});

export const publicClient = createPublicClient({
  chain: celoAlfajores,
  transport: http("https://celo-alfajores.g.alchemy.com/v2/QyxMOKTYrNkmofq71rof8WEO1kw9VuI4"),
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#111111",
            accentColorForeground: "white",
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
