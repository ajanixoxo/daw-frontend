import CooperativeAuthLayout from "@/components/(dashboards)/cooperative-dashboard/cooperative-auth/cooperative-auth-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CooperativeAuthLayout>{children}</CooperativeAuthLayout>;
}
