import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

// env 파일 파싱 함수
function parseEnv(filePath: string) {
  const env: Record<string, string> = {};
  if (fs.existsSync(filePath)) {
    const lines = fs.readFileSync(filePath, "utf-8").split("\n");
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return; // 주석 무시
      const [key, ...vals] = trimmed.split("=");
      env[key.trim()] = vals.join("=").trim();
    });
  }
  return env;
}

// NODE_ENV에 따라 env 파일 선택
const envFile =
  process.env.NODE_ENV === "production"
    ? path.join(process.cwd(), "src/env/.env.production")
    : path.join(process.cwd(), "src/env/.env.development");

// env 파싱
const envVars = parseEnv(envFile);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: envVars, // process.env.NEXT_PUBLIC_* 형태로 접근 가능
};

export default nextConfig;
