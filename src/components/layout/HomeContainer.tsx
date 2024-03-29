
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const BlogContainerLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    margin-top: 2rem;
    max-width: 800px;
    `;

export const HomeContainer = () => {

  return (
    <BlogContainerLayout>
      <Outlet />
    </BlogContainerLayout>
  );
};
