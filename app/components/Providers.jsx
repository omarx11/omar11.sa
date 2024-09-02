"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatementProvider } from "@/app/context/statement";

const Providers = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StatementProvider>{children}</StatementProvider>
    </QueryClientProvider>
  );
};

export default Providers;
