import {tryGenerateToken} from "../authorization";

export async function handleCallbackRequest(request: Request): Promise<Response> {
    const code = new URL(request.url).searchParams.get("code")
    if (!code) {
        return new Response("Missing code", {status: 400})
    }

    const postData = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code
    }

    return tryGenerateToken(postData)
}
