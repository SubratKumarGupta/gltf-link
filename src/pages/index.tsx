import { UploadButton } from "@uploadthing/react";

import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import type { OurFileRouter } from "~/server/uploadthing";
import { api } from "~/utils/api";

type ValidOrnotProps = {
  url: string;
};
const ValidOrnot: React.FC<ValidOrnotProps> = ({ url }) => {
  const { data, error, isLoading } = api.example.gltfSplit.useQuery(
    {
      url: url,
    },
    {
      retry: false,
    }
  );

  if (error) {
    console.log(error);
    return <div className="text-red-600">{error.message}</div>;
  }
  if (data) {
    // console.log(data.v, "this");
    return (
      <div>
        <span>{data.isvalid ? "gltf valid" : "gltf invalid"}</span>
      </div>
    );
  }
  return (
    <div>
      <span>{isLoading ? "valadating on server" : null}</span>
    </div>
  );
};

const Home: NextPage = () => {
  const [Displayurl, setDisplayurl] = useState<string | undefined>();

  return (
    <>
      <Head>
        <title>GLTF link</title>
        <meta name="description" content="gltflink" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#9fbbdc] to-[#15162c]">
        <UploadButton<OurFileRouter>
          endpoint="gltfUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            if (res === undefined) throw Error("no responce from the server");
            if (res[0]?.fileUrl === undefined) {
              throw Error("no url from the server");
            }
            console.log("Files: ", res);
            setDisplayurl(res[0]?.fileUrl);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            console.log("Files: ", error);
            alert(`ERROR! ${error.message}`);
          }}
        />
        {Displayurl ? (
          <h1 className="mt-5">
            <b>Link </b>
            {Displayurl}
            <ValidOrnot url={Displayurl} />
          </h1>
        ) : null}
      </main>
    </>
  );
};

export default Home;
