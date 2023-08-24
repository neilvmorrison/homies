import { useEffect } from "react";
import { useAuthenticationContext } from "@/contexts/Authentication.context";
import { useRouter } from "next/router";

function usePrivateRoute() {
  const { isAuthenticated, isLoading } = useAuthenticationContext();
  const { push } = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      push("/");
    }
  }, [isLoading, isAuthenticated, push]);
}

export default usePrivateRoute;
