import html from '../show_token.html'

export async function handleShowTokenRequest(request: Request): Promise<Response> {
    return new Response(
        html,
        {
            headers: {
                "Content-Type": "text/html"
            }
        }
    )
}