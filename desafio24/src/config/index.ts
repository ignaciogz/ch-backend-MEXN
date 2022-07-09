import "https://deno.land/x/dotenv@v3.2.0/load.ts"

export const config = {
    PORT: Number(Deno.env.get("PORT")) || 8080
}