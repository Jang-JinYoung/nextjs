import { useMutation, UseMutationOptions } from "@tanstack/react-query";

interface LoginData {
  email: string;
  password: string;
}

// 서버에서 반환할 응답 타입 (원하는 형태로 수정 가능)
interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
}

export const useLogin = (
  options?: UseMutationOptions<LoginResponse, Error, LoginData>
) => {
  return useMutation<LoginResponse, Error, LoginData>({
    mutationFn: async (data: LoginData) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include", // ✅ 세션/쿠키 필요 시
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        const message = errorBody.message || "로그인 실패";
        throw new Error(message);
      }

      return res.json();
    },
    ...options, // ✅ 외부에서 전달한 onSuccess, onError 적용
  });
};
