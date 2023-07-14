import React from "react";
import Head from "next/head";
import Header from "./Header";
import { CommonTypeProps } from "@/types/Type";

import Footer from "./Footer";

const Layout: React.FC<CommonTypeProps> = ({
    children,
    title = "Game Lottery",
}) => {
    return (
        <div className="min-h-screen items-center justify-center font-mono">
            <Head>
                <title>{title}</title>
                <meta name="og:title" property="og:title" content={title} />
                <meta name="description" content="ゲームのおすすめを..." />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                ></meta>
                <meta
                    property="og:image"
                    key="ogImage"
                    content={`https://game-lottery-one.vercel.app/ogp.png`}
                />
                <meta
                    name="twitter:card"
                    key="twitterCard"
                    content="summary_large_image"
                />
                <meta
                    name="twitter:image"
                    key="twitterImage"
                    content={`https://game-lottery-one.vercel.app/ogp.png`}
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="flex max-w-screen-sm flex-1 sm:w-screen sm:max-w-screen-xl mx-auto">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
