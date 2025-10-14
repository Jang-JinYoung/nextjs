import { useMutation, useQueryClient } from "@tanstack/react-query";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message?: string;
}

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginData>({
    mutationFn: async (data) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "로그인 실패");
      }

      return res.json();
    },
    onSuccess: () => {
      // 로그인 성공 시, me 쿼리 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
