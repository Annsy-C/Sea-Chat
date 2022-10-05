import React from 'react';
import Header from './header';
import { Container, Spacer } from '@nextui-org/react';
import '../App.css';

type LayoutProps = {
    children: React.ReactNode,
}

const Layout = ({ children }: LayoutProps) => {
    const sectionStyle = {
        height: "100vh",

        backgroundImage:
            "url('/images/water.jpeg') ",

        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };
    return (
        <div style={sectionStyle}>
            <Header />
            <Spacer y={6} />
            <Container fluid>
                {children}
            </Container>
        </div>

    )
};

export default Layout;
