
import { Link, useParams } from 'react-router-dom'
import '../App.css'
import { useRecords } from '../hooks/UseRecords';
import { ValidNetwork } from "@daohaus/keychain-utils";
import { useDaoData } from '@daohaus/moloch-v3-hooks';
import { BlogPost } from '../utils/types';
import styled from 'styled-components';

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

const BlogTitle = styled.h1`
    font-size: 2rem;
    border-bottom: 1px solid #ccc;
`;

const BlogTitleBlockWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
    max-width: 800px;
`;

const BlogEntityItem = styled.div`
    margin-top: 1rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid #ccc;
`;

const BlogEntityDate = styled.p`
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0;
`;

const BlogEntityTitle = styled.h2`
    font-size: 1.5rem;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;

`;

const TagsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    justify-content: space-between;
    padding: 2rem;
`;

const StyledLink = styled(Link)`
  color: hsl(226, 70.0%, 55.5%);
  text-decoration: none;

  &:hover {
    color: #888;
  }
`;


function Blog() {
    const { chainId, daoId } = useParams()
    const { dao } = useDaoData({
        daoId: daoId || "",
        daoChain: chainId as ValidNetwork,
    });

    const { records: dinRecords } = useRecords({
        daoId: daoId,
        chainId: chainId as ValidNetwork,
        recordType: "DIN",
    });

    const { records: commentRecords } = useRecords({
        daoId: daoId,
        chainId: chainId as ValidNetwork,
        recordType: "DINComment",
    });

    console.log(dinRecords);
    console.log(dao);
    console.log(commentRecords);

    return (
        <>
            <BlogTitleBlockWrapper>
                <BlogTitle>{dao?.name || "Not Found"}</BlogTitle>
                {/* <TagsList>
                    <StyledLink to={``}>Document</StyledLink>
                    <StyledLink to={``}>Event</StyledLink>
                    <StyledLink to={``}>Special</StyledLink>
                </TagsList> */}
            </BlogTitleBlockWrapper>
            <div>
                {commentRecords?.map((record) => {
                    const parsedContent: BlogPost = record.parsedContent as BlogPost;
                    const date = new Date(Number(record.createdAt) * 1000);
                    const formattedDate = `${date.getFullYear()} ${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
                    return (
                        <BlogEntityItem key={record.id}>
                            <BlogEntityDate>{formattedDate}</BlogEntityDate>
                            <BlogEntityTitle>
                                <StyledLink to={`/content/${chainId}/${daoId}/${parsedContent.id}`}>{parsedContent.title || "no title"}</StyledLink>
                            </BlogEntityTitle>
                        </BlogEntityItem>
                    )

                }
                )}

                {dinRecords?.map((record) => {
                    const parsedContent: BlogPost = record.parsedContent as BlogPost;
                    const date = new Date(Number(record.createdAt) * 1000);
                    const formattedDate = `${date.getFullYear()} ${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
                    return (
                        <BlogEntityItem key={record.id}>
                            <BlogEntityDate>{formattedDate}</BlogEntityDate>
                            <BlogEntityTitle>
                                <StyledLink to={`/content/${chainId}/${daoId}/${parsedContent.id}`}>{parsedContent.title || "no title"}</StyledLink>
                            </BlogEntityTitle>
                        </BlogEntityItem>
                    )
                })}
            </div>
        </>
    )
}

export default Blog
