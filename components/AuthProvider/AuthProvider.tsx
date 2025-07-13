"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSession } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const PRIVATE_PATHS = ["/profile", "/notes"];

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const session = await getSession();
        if (session) {
          setUser(session);
        } else {
          clearIsAuthenticated();
          if (PRIVATE_PATHS.some((p) => pathname.startsWith(p))) {
            router.replace("/sign-in");
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        clearIsAuthenticated();
        if (PRIVATE_PATHS.some((p) => pathname.startsWith(p))) {
          router.replace("/sign-in");
        }
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [pathname, setUser, clearIsAuthenticated, router]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  return <>{children}</>;
} 