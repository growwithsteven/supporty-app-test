import axios, { AxiosInstance } from "axios";
import { createSupabaseUser } from "@/lib/supabase";

type AuthType = "project" | "user";

export function createApiClient(authType: AuthType): AxiosInstance {
    const client = axios.create({
        baseURL: "/api",
    });

    client.interceptors.request.use(async (config) => {
        let token: string | null = null;

        if (authType === "project") {
            token = localStorage.getItem("project-token");
        } else if (authType === "user") {
            const supabase = createSupabaseUser();
            const {
                data: { session },
            } = await supabase.auth.getSession();
            if (session) {
                token = session.access_token;
            }
        }

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    });

    return client;
}
