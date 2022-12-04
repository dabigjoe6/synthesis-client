import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../config";
import Dialog from "./dialog";

const Layout = () => {
  const Container = styled.div`
    background-color: ${COLORS.BACKGROUND};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
  `;
  return (
    <Container>
      <Outlet />
      <Dialog />
    </Container>
  );
};

export default Layout;
