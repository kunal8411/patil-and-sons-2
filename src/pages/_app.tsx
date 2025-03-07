import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "@/lib/queryClient"; // Ensure this file exists
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import Navigation from "@/components/Navigation";

export default function App({ Component, pageProps }: AppProps) {
  const [client] = useState(() => queryClient);

  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <Navigation />
        <Component {...pageProps} />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
