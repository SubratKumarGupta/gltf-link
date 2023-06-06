import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();

// FileRouter  can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes , each with a unique routeSlug
  gltfUploader: f({ blob: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute

    .onUploadComplete(function ({ file }) {
      // This code RUNS ON YOUR SERVER after upload

      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
