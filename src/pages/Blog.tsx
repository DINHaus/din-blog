import { Link, useParams } from "react-router-dom";
import { useRecords } from "../hooks/UseRecords";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { useDaoData } from "@daohaus/moloch-v3-hooks";
import { BlogPost } from "../utils/types";
import { useState } from "react";

function Blog() {
  const [selectedTag, setSelectedTag] = useState("");

  const { chainId, daoId } = useParams();
  const { dao } = useDaoData({
    daoId: daoId || "",
    daoChain: chainId as ValidNetwork,
  });

  const { records: dinRecords } = useRecords({
    daoId: daoId,
    chainId: chainId as ValidNetwork,
    recordType: "DUCEREF",
  });

  const { records: commentRecords } = useRecords({
    daoId: daoId,
    chainId: chainId as ValidNetwork,
    recordType: "DUCE",
  });

  const organisedRecords = [...(dinRecords || []), ...(commentRecords || [])];

  const tags = Array.from(
    new Set(
      organisedRecords.map((record) => {
        const parsedContent: BlogPost = record.parsedContent as BlogPost;
        return parsedContent.tag;
      })
    )
  );

  const filteredContent = selectedTag
    ? organisedRecords.filter((record) => {
        const parsedContent: BlogPost = record.parsedContent as BlogPost;
        return parsedContent.tag === selectedTag;
      })
    : organisedRecords;

  console.log("dao", dao);
  console.log("din records", dinRecords);
  console.log("comment records", commentRecords);
  console.log("organised records", organisedRecords);
  console.log("filteredContent", filteredContent);

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center mt-8 mb-8">
        <h1 className="text-4xl text-center font-bold mb-8">
          {dao?.name ? `${dao?.name}'s blog` : "Not Found"}
        </h1>
        <div className="flex flex-wrap mt-4 mb-4 border-t border-b border-gray-300 justify-between p-8">
          {tags.map((tag) => (
            <p
              key={tag}
              onClick={() => setSelectedTag(tag || "")}
              className={`font-semibold text-sm ${
                selectedTag === tag && "text-blue-400"
              } cursor-pointer`}
            >
              {tag}
            </p>
          ))}
          <p
            onClick={() => setSelectedTag("")}
            className={`font-semibold text-sm ${
              selectedTag === "" && "text-blue-400"
            } cursor-pointer`}
          >
            All
          </p>
        </div>
      </div>
      <div>
        {filteredContent.map((record) => {
          const parsedContent: BlogPost = record.parsedContent as BlogPost;
          const date = new Date(Number(record.createdAt) * 1000);
          const formattedDate = `${date.getFullYear()} ${date.toLocaleString(
            "default",
            { month: "short" }
          )} ${date.getDate()}`;
          return (
            <div className="mt-4 mb-8" key={record.id}>
              <p className="text-sm font-semibold mb-0">{formattedDate}</p>
              <h2 className="text-2xl font-bold mt-1 mb-1">
                <Link
                  className="text-blue-500 hover:text-blue-800"
                  to={`/content/${chainId}/${daoId}/${parsedContent.id}`}
                >
                  {parsedContent.title || "no title"}
                </Link>
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Blog;
