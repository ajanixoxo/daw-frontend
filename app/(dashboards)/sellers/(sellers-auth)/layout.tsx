import type { FC, ReactNode } from "react";

interface SellersAuthLayoutProps {
  children: ReactNode;
}

const SellersAuthLayout: FC<SellersAuthLayoutProps> = ({ children }) => {
  return <div className="min-h-screen w-full bg-white">{children}</div>;
};

export default SellersAuthLayout;

