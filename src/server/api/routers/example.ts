import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
// import { validateBytes } from "public/gltf-validetor";

/** funtion for valadating spec */

// async function validateGltf(url: string) {
//   const response = await fetch(url);
//   const arrayBuffer = await response.arrayBuffer();
//   return await validateBytes(new Uint8Array(arrayBuffer), {});
// }

function validateFileExtension(downloadLink: string): boolean {
  const fileExtensionSchema = z.union([z.literal("glb"), z.literal("gltf")]);
  const url = new URL(downloadLink);
  const path = url.pathname;
  const filename = path.substring(path.lastIndexOf("/") + 1);
  const extension = filename.substring(filename.lastIndexOf(".") + 1);
  console.log(extension);
  return fileExtensionSchema.safeParse(extension.toLowerCase()).success;
}

export const exampleRouter = createTRPCRouter({
  gltfSplit: publicProcedure
    .input(
      z.object({
        url: z
          .string()
          .url()
          .refine((url) => validateFileExtension(url), {
            message: "invalide gltf url",
          }),
        /** valadating the gltf spec  */
        // .refine(async (url) => await validateGltf(url), {
        //   message: "invalide gltf format",
        // }),
      })
    )
    .query(({ input }) => {
      console.log("hi");
      const url = input.url;
      const isvalid = true;
      //do the split
      return {
        isvalid,
        url,
      };
    }),
});
