import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer className="body-font mt-24">
            <div className="container px-5 pt-14 mx-auto flex items-center flex-col">
                <div className="flex-grow flex flex-wrap text-center">
                    <div className="w-full px-4">
                        <nav className="list-none mb-1">
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-gray-600 hover:text-gray-400"
                                >
                                    利用規約
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacyPolicy"
                                    className="text-gray-600 hover:text-gray-400"
                                >
                                    プライバシーポリシー
                                </Link>
                            </li>
                        </nav>
                        <p className="text-gray-400 text-sm text-center mb-2">
                            © 2023 Game Lottery
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
