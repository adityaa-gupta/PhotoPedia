"use client";

import useAuth from "@/hooks/useAuth";
import useAuthStore from "@/store/useAuthStore";


const ProtectedRoute = ({ children }) => {
  useAuth("", "/auth");
  const { isAuthenticated, isLoading } = useAuthStore();
  return isLoading ? (
    <div>Loading...</div>
  ) : isAuthenticated ? (
    children
  ) : (
    <div></div>
  );
};

export default ProtectedRoute;