import { Link, useParams } from "react-router-dom";
import { useRecords } from "../hooks/UseRecords";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { useDaoData } from "@daohaus/moloch-v3-hooks";
import { BlogPost } from "../utils/types";

import ReactMarkdown from "react-markdown";

function BlogDetail() {
  const { chainId, daoId, contentId } = useParams();
  const { dao } = useDaoData({
    daoId: daoId || "",
    daoChain: chainId as ValidNetwork,
  });

  let { records } = useRecords({
    daoId: daoId,
    chainId: chainId as ValidNetwork,
    recordType: "DUCEREF",
    hash: contentId,
  });

  const { records: comment } = useRecords({
    daoId: daoId,
    chainId: chainId as ValidNetwork,
    recordType: "DUCE",
    hash: contentId,
  });

  if (records?.length === 0) {
    records = comment;
  }

  const getBlogURL = (URI: string) => {
    // TODO: this is very fagile
    // example: https://dinhaus.github.io/din-admin/#/molochv3/0xaa36a7/0x738e841225bef5059640591f453eb7e9074c42c2/articles/0x53621709eb82041098d03fdd421cf0b78cd4dca68ee294084bff16ca9c66c689
    // format molochV3/chainId/daoId/articles/contentId
    // blog example: http://localhost:5173/din-blog/#/content/0xaa36a7/0x738e841225bef5059640591f453eb7e9074c42c2/0x53621709eb82041098d03fdd421cf0b78cd4dca68ee294084bff16ca9c66c689
    // new format content/chainId/daoId/contentId
    const parts = URI.split("/");
    return `/content/${parts[6]}/${parts[7]}/${parts[9]}`;
  };

  return (
    <div className="w-full">
      <h1 className="text-lg font-semibold">
        {dao?.name ? `${dao?.name}'s blog` : "Not Found"}
      </h1>

      <article className="py-6 prose dark:prose-invert">
        {records?.map((record) => {
          const parsedContent: BlogPost = record.parsedContent as BlogPost;
          const date = new Date(Number(record.createdAt) * 1000);
          const formattedDate = `${date.getFullYear()} ${date.toLocaleString(
            "default",
            { month: "short" }
          )} ${date.getDate()}`;
          return (
            <div key={record.id}>
              <div>
                <h2 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
                  {parsedContent.title}
                </h2>

                <hr className="my-4" />

                {(record.parsedContent as BlogPost)?.contentURI && (
                  <Link
                    className="text-blue-500 hover:text-blue-800 "
                    to={`${getBlogURL(
                      (record.parsedContent as BlogPost)?.contentURI
                    )}`}
                  >
                    See original post
                  </Link>
                )}
                <div className="flex justify-between my-4 text-sm">
                  <p>{formattedDate}</p>
                  <Link
                    className="text-blue-500 hover:text-blue-800"
                    to={`/blog/${chainId}/${daoId}`}
                  >
                    See all posts
                  </Link>
                </div>
              </div>
              <div className="mt-8 mb-8 text-lg">
                <ReactMarkdown>{parsedContent?.content}</ReactMarkdown>
              </div>
            </div>
          );
        })}
      </article>
    </div>
  );
}

export default BlogDetail;
