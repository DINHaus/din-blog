import { Link, useParams } from "react-router-dom";
import { useRecords } from "../hooks/UseRecords";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { useDaoData } from "@daohaus/moloch-v3-hooks";
import { BlogPost } from "../utils/types";

// example record data
// [
//     {
//         "id": "0xe9633cd5b831ab45357079ef33c0e88e23f55ef5-record-170907680443",
//         "createdAt": "1709076804",
//         "createdBy": "0x0dd188df013bc8913b1837fa598fb73a3b320027",
//         "tag": "0x3577aebf71d9bfbe235b0b98b53c9f1865b0f0dc68290b2b64c6251dc4de7800",
//         "table": "DIN",
//         "contentType": "json",
//         "content": "{\"daoId\":\"0xe9633cd5b831ab45357079ef33c0e88e23f55ef5\",\"table\":\"DIN\",\"queryType\":\"list\",\"title\":\"Phoenix\",\"content\":\"```\\n                (                           )\\n          ) )( (                           ( ) )( (\\n       ( ( ( )  ) )                     ( (   (  ) )(\\n      ) )     ,,\\\\\\\\\\\\                     ///,,       ) (\\n   (  ((    (\\\\\\\\\\\\\\\\//                     \\\\\\\\////)      )\\n    ) )    (-(__//                       \\\\\\\\__)-)     (\\n   (((   ((-(__||                         ||__)-))    ) )\\n  ) )   ((-(-(_||           ```\\\\__        ||_)-)-))   ((\\n  ((   ((-(-(/(/\\\\\\\\        ''; 9.- `      //\\\\)\\\\)-)-))    )\\n   )   (-(-(/(/(/\\\\\\\\      '';;;;-\\\\~      //\\\\)\\\\)\\\\)-)-)   (   )\\n(  (   ((-(-(/(/(/\\\\======,:;:;:;:,======/\\\\)\\\\)\\\\)-)-))   )\\n    )  '(((-(/(/(/(//////:%%%%%%%:\\\\\\\\\\\\\\\\\\\\\\\\)\\\\)\\\\)\\\\)-)))`  ( (\\n   ((   '((-(/(/(/('uuuu:WWWWWWWWW:uuuu`)\\\\)\\\\)\\\\)-))`    )\\n     ))  '((-(/(/(/('|||:wwwwwwwww:|||')\\\\)\\\\)\\\\)-))`    ((\\n  (   ((   '((((/(/('uuu:WWWWWWWWW:uuu`)\\\\)\\\\))))`     ))\\n        ))   '':::UUUUUU:wwwwwwwww:UUUUUU:::``     ((   )\\n          ((      '''''''\\\\uuuuuuuu/``````         ))\\n           ))            `JJJJJJJJJ`           ((\\n             ((            LLLLLLLLLLL         ))\\n               ))         ///|||||||\\\\\\\\\\\\       ((\\n                 ))      (/(/(/(^)\\\\)\\\\)\\\\)       ((\\n                  ((                           ))\\n                    ((                       ((\\n                      ( )( ))( ( ( ) )( ) (()\\n```\",\"contentURI\":\"\",\"contentURIType\":\"url\",\"parentId\":\"0\",\"id\":\"0xca4de48b626824de4e35009fcfb45d91d4dc1a109c7edbed7fdd5e7a2ad8eb58\",\"authorAddress\":\"0xCED608Aa29bB92185D9b6340Adcbfa263DAe075b\",\"createdAt\":\"1709072869\",\"chainId\":\"0xaa36a7\"}",
//         "queryType": "list",
//         "dao": {
//             "id": "0xe9633cd5b831ab45357079ef33c0e88e23f55ef5"
//         },
//         "parsedContent": {
//             "daoId": "0xe9633cd5b831ab45357079ef33c0e88e23f55ef5",
//             "table": "DIN",
//             "queryType": "list",
//             "title": "Phoenix",
//             "content": "```\n                (                           )\n          ) )( (                           ( ) )( (\n       ( ( ( )  ) )                     ( (   (  ) )(\n      ) )     ,,\\\\\\                     ///,,       ) (\n   (  ((    (\\\\\\\\//                     \\\\////)      )\n    ) )    (-(__//                       \\\\__)-)     (\n   (((   ((-(__||                         ||__)-))    ) )\n  ) )   ((-(-(_||           ```\\__        ||_)-)-))   ((\n  ((   ((-(-(/(/\\\\        ''; 9.- `      //\\)\\)-)-))    )\n   )   (-(-(/(/(/\\\\      '';;;;-\\~      //\\)\\)\\)-)-)   (   )\n(  (   ((-(-(/(/(/\\======,:;:;:;:,======/\\)\\)\\)-)-))   )\n    )  '(((-(/(/(/(//////:%%%%%%%:\\\\\\\\\\\\)\\)\\)\\)-)))`  ( (\n   ((   '((-(/(/(/('uuuu:WWWWWWWWW:uuuu`)\\)\\)\\)-))`    )\n     ))  '((-(/(/(/('|||:wwwwwwwww:|||')\\)\\)\\)-))`    ((\n  (   ((   '((((/(/('uuu:WWWWWWWWW:uuu`)\\)\\))))`     ))\n        ))   '':::UUUUUU:wwwwwwwww:UUUUUU:::``     ((   )\n          ((      '''''''\\uuuuuuuu/``````         ))\n           ))            `JJJJJJJJJ`           ((\n             ((            LLLLLLLLLLL         ))\n               ))         ///|||||||\\\\\\       ((\n                 ))      (/(/(/(^)\\)\\)\\)       ((\n                  ((                           ))\n                    ((                       ((\n                      ( )( ))( ( ( ) )( ) (()\n```",
//             "contentURI": "",
//             "contentURIType": "url",
//             "parentId": "0",
//             "id": "0xca4de48b626824de4e35009fcfb45d91d4dc1a109c7edbed7fdd5e7a2ad8eb58",
//             "authorAddress": "0xCED608Aa29bB92185D9b6340Adcbfa263DAe075b",
//             "createdAt": "1709072869",
//             "chainId": "0xaa36a7",
//             "tag": "DIN"
//         }

function Blog() {
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

  console.log("din records", dinRecords);
  console.log("dao", dao);
  console.log("comment records", commentRecords);

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center mt-8 mb-8">
        <h1 className="text-4xl text-center font-bold mb-8">
          {dao?.name ? `${dao?.name}'s blog` : "Not Found"}
        </h1>
        {/* <div className="flex flex-wrap mt-4 mb-4 border-t border-b border-gray-300 justify-between p-8">
          include tags here
        </div> */}
      </div>
      <div>
        {commentRecords?.map((record) => {
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

        {dinRecords?.map((record) => {
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
