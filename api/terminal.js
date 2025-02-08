import { readableStreamFromIterable } from "@vercel/edge";

export const config = { runtime: "edge" };

export default async function (req) {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(controller) {
            controller.enqueue(encoder.encode("Welcome to the terminal!\n"));
            await new Promise((resolve) => setTimeout(resolve, 2000));
            controller.enqueue(encoder.encode("You can only receive data from this terminal.\n"));
            controller.close();
        }
    });
    return new Response(stream, { headers: { "Content-Type": "text/plain" } });
}
