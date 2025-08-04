import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-[100vh] bg-neutral-900 m-0 p-8">
      {children}
    </div>
  );
}
