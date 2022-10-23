import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Layout = () => {
  const Container = styled.div`
    background-color: #0D1117;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
  `;
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default Layout;
