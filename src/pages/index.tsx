import React from 'react';
import Layout from '@/components/common/Layout';
import TopContents from '@/components/topPage/TopContents';

export default function Home() {
    return (
        <Layout title="Game Lottery">
            <div className="container flex flex-col items-center sm:max-w-7xl">
                <div className="container mt-24">
                    <TopContents />
                </div>
            </div>
        </Layout>
    );
}
