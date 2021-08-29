import {getCookie} from "../utils";

export async function handleAuthorizeRequest(request: Request): Promise<Response> {
    const token = getCookie(request, "token")

    if (!token) {
        const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&scope=identify`

        return new Response("", {
            status: 302,
            headers: {
                location: url
            }
        })
    }
    return new Response("", {status: 500})
}
