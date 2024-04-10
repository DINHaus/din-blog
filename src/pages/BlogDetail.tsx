
import { Link, useParams } from 'react-router-dom'
import '../App.css'
import { useRecords } from '../hooks/UseRecords';
import { ValidNetwork } from "@daohaus/keychain-utils";
import { useDaoData } from '@daohaus/moloch-v3-hooks';
import { BlogPost } from '../utils/types';

import styled from "styled-components";
import ReactMarkdown from "react-markdown";



const ReactMarkdownWrapper = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
    font-size: 1.5rem;
    `;

const BlogDetailTitleBlock = styled.div`

`

const BlogDetailInfo = styled.div`
display: flex;
justify-content: space-between;
`

const StyledLink = styled(Link)`
  color: hsl(226, 70.0%, 55.5%);
  text-decoration: none;

  &:hover {
    color: #888;
  }
`;


function BlogDetail() {
    const { chainId, daoId, contentId } = useParams()
    const { dao } = useDaoData({
        daoId: daoId || "",
        daoChain: chainId as ValidNetwork,
    });

    let { records } = useRecords({
        daoId: daoId,
        chainId: chainId as ValidNetwork,
        recordType: "DUCEREF",
        hash: contentId
    });

    const { records: comment } = useRecords({
        daoId: daoId,
        chainId: chainId as ValidNetwork,
        recordType: "DUCE",
        hash: contentId
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
    }

    return (
        <>
            <h1>{dao?.name || "Not Found"}</h1>

            <div>
                {records?.map((record) => {
                    const parsedContent: BlogPost = record.parsedContent as BlogPost;
                    const date = new Date(Number(record.createdAt) * 1000);
                    const formattedDate = `${date.getFullYear()} ${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
                    return (
                        <div key={record.id}>
                            <BlogDetailTitleBlock>
                                <h2>{parsedContent.title}</h2>
                                {(record.parsedContent as BlogPost)?.contentURI && <StyledLink to={`${getBlogURL((record.parsedContent as BlogPost)?.contentURI)}`}>See original post</StyledLink>}
                                <BlogDetailInfo>
                                    <p>{formattedDate}</p>
                                    <StyledLink to={`/blog/${chainId}/${daoId}`}>See all posts</StyledLink>
                                </BlogDetailInfo>
                            </BlogDetailTitleBlock>
                            <ReactMarkdownWrapper>
                                <ReactMarkdown>{parsedContent?.content}</ReactMarkdown>
                            </ReactMarkdownWrapper>
                        </div>
                    )
                })}
            </div>


        </>
    )
}

export default BlogDetail
