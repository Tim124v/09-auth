import AuthProvider from "@/components/AuthProvider/AuthProvider";
 
export default function PrivateLayout({ children, modal }: { children: React.ReactNode, modal: React.ReactNode }) {
  return <AuthProvider>{children}{modal}</AuthProvider>;
} 