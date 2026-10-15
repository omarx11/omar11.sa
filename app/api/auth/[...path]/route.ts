import { auth } from "@/app/lib/auth/server";

export const { GET, POST } = auth.handler();
