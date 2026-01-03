// src/hooks/useRole.jsx
import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const useRole = () => {
  const { user } = useContext(AuthContext);

  const {
    data: role,
    isLoading: roleLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `https://movie-master-server-theta.vercel.app/users/${user.email}/role`,
      );

      return res.data.role; // "admin" | "user"
    },
  });

  return { role, roleLoading, isError, error };
};

export default useRole;
