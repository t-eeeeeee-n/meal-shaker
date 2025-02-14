"use client"

import React from 'react';
import { FaHome } from 'react-icons/fa';

interface CommonContainerProps {
    loading: boolean;
    onClickHome: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onClickRetry: () => void;
    resultsCount: number;
    children: React.ReactNode;
}

const ResultContainer: React.FC<CommonContainerProps> = ({
                                                             loading,
                                                             onClickHome,
                                                             onClickRetry,
                                                             resultsCount,
                                                             children
                                                         }) => {
    return (
        <div className="container mt-0 mx-auto px-4 py-8 w-full max-w-4xl bg-amber-50 rounded shadow">
            <div className="flex items-center justify-center mb-4">
                <button
                    className="flex justify-center items-center w-full py-2 h-12 border-2 border-gray-200 bg-amber-500 hover:bg-amber-700 text-white font-semibold rounded-md"
                    disabled={loading}
                    onClick={onClickHome}
                >
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <div className="spinner border-t-4 border-amber-500 rounded-full w-6 h-6 animate-spin"></div>
                        </div>
                    ) : (
                        <>
                            <FaHome className="w-5 h-5" />
                            <span className="ml-2 text-white">HOME</span>
                        </>
                    )}
                </button>
            </div>
            <div className="flex items-center justify-center mb-4">
                <button
                    className="flex justify-center items-center w-full py-2 h-12 border-2 border-gray-200 bg-slate-500 hover:bg-slate-700 text-white font-semibold rounded-md"
                    disabled={loading}
                    onClick={onClickRetry}
                >
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <div className="spinner border-t-4 border-slate-500 rounded-full w-6 h-6 animate-spin"></div>
                        </div>
                    ) : (
                        <span className="text-white">再検索</span>
                    )}
                </button>
            </div>
            {/*{resultsCount > 0 && (*/}
            {/*    <div className="my-8">*/}
            {/*        <div className="flex mb-2">*/}
            {/*            <span className="font-medium text-gray-700 flex-shrink-0 w-32">検索結果:</span>*/}
            {/*            <span className="text-gray-900 flex-grow">{resultsCount}件</span>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
            {children}
        </div>
    );
};

export default ResultContainer;