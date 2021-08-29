import {DISCORD_API} from "../constants";
import {tryGenerateToken} from "../authorization";

export async function handleCallbackRequest(request: Request): Promise<Response> {
    const code = new URL(request.url).searchParams.get("code")
    if (!code) {
        return new Response("Missing code", {status: 400})
    }

    const formData = new FormData()
    const postData = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code
    }
    for (const [k, v] of Object.entries(postData)) {
        formData.set(k, v)
    }

    const tokenResponse = await fetch(
        `${DISCORD_API}/oauth2/token`,
        {
            method: "POST",
            body: formData
        }
    )

    if (!tokenResponse.ok) {
        return new Response("Failed to authenticate. Please try again.", {status: 401})
    }
    const tokenBody = await tokenResponse.json()

    return tryGenerateToken(tokenBody.access_token, tokenBody.refresh_token)
}
