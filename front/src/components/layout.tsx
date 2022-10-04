import React from 'react';
import Header from './header';
import Footer from './footer';

type LayoutProps = {
    children: React.ReactNode,
}

const Layout = ({ children }: LayoutProps) => (
    <div>
        <Header />
        <section className="section">
            <div className="container">
                {children}
            </div>
        </section>
        <Footer />
    </div>
);

export default Layout;
