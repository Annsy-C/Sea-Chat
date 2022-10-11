import React from 'react';
import Header from './header';
import { Container, Spacer } from '@nextui-org/react';

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
            <Spacer y={4} />
            <Container fluid>
                {children}
            </Container>
        </div>

    )
};

export default Layout;
