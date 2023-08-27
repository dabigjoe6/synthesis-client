import * as React from 'react';
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../config";
import Dialog from "./dialog";

const Layout = () => {
  const Container = styled.div`
    background-color: ${Colors.BACKGROUND};
    display: flex;
    align-items: center;
    justify-content: center;
    height: min-content;
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
