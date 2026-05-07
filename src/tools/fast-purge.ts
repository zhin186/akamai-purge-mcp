import { z } from "zod";

import { edgeGrid } from "../auth/edgegrid-client.js";

const purgeSchema = z.object({
  urls: z.array(z.string().url()),
});

export async function invalidateUrls(input: unknown) {
  const parsed = purgeSchema.parse(input);

  return new Promise((resolve, reject) => {
    edgeGrid
      .auth({
        path: "/ccu/v3/invalidate/url",

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          objects: parsed.urls,
        }),
      })

      .send((error: any, response: any, body: any) => {
        if (error) {
          reject(error);
          return;
        }

        try {
          resolve(JSON.parse(body));
        } catch {
          resolve(body);
        }
      });
  });
}