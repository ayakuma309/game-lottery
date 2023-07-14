import Link from "next/link";

const TopContents: React.FC = () => {
    return (
        <div className="relative h-screen overflow-hidden">
            <div className="container relative z-10 flex items-center px-6 py-32 mx-auto md:px-12 xl:py-40">
                <div className="relative z-10 flex flex-col items-center w-full">
                    <h1 className="mt-4 font-extrabold leading-tight text-center text-white text-7xl sm:text-8xl">
                        Game Lottery
                    </h1>
                    <p className="mt-4 text-center text-black">
                        あなたが選んだゲームからおすすめのゲームを提案します
                    </p>
                    <div className="flex justify-between">
                        <Link href="/search">
                            <button className="block px-4 py-3 mt-10 text-lg font-bold text-white uppercase bg-gray-800 hover:bg-gray-900 ml-1">
                                はじめる
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TopContents;
