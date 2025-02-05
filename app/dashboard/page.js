import Dashboard from "@/components/Dashboard";
import Main from "@/components/Main";

export const metadata = {
  title: "Mood Tracker • Dashboard",
};

export default function DashboardPage() {
  const isAuthenticated = false;
  let children = <Login />;

  if (isAuthenticated) {
    children = <Dashboard />;
  }

  return <Main>{children}</Main>;
}
