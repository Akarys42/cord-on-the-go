import {getCookie} from "../utils";
import {decode, verify} from "@tsndr/cloudflare-worker-jwt";
import {tryGenerateToken} from "../authorization";

export async function handleAuthorizeRequest(request: Request): Promise<Response> {
    const token = getCookie(request, "token")

    if (!token || !await verify(token, HMAC_SECRET)) {
        const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&scope=identify`

        return new Response("", {
            status: 302,
            headers: {
                location: url
            }
        })
    }

    const decodedToken = decode(token)
    // @ts-ignore
    const refreshToken = decodedToken.refresh
    const postData = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: refreshToken
    }

    return tryGenerateToken(postData)
}
