"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shop } from '@/types';
import ShopCard from '@/components/result/shopCard';
import axios from 'axios';
import { convertKeysToSnakeCase } from '@/utils/utils';
import ResultContainer from "@/app/result/components/resultContainer";

type ClientProps = {
    shops: Shop[];
    numberOfResults: number;
    searchParams: {
        largeServiceArea: string;
        largeArea?: string;
        middleArea?: string;
        smallArea?: string;
        genre: string;
    };
};

const Client: React.FC<ClientProps> = ({
                                           shops: initialShops,
                                           numberOfResults,
                                           searchParams
                                       }) => {
    const [loading, setLoading] = React.useState(false);
    const [shops, setShops] = useState(initialShops);
    const [resultsCount, setResultsCount] = useState(numberOfResults);
    const router = useRouter();

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        router.push('/');
    };

    const handleRetry = async () => {
        setLoading(true);
        try {
            const snakeCaseParams = convertKeysToSnakeCase(searchParams);

            const baseURL: string = process.env.NEXT_PUBLIC_API_BASE_URL || '';
            const response = await axios.get(`${baseURL}/hotpepper/search/one`, { params: snakeCaseParams });
            if (response.data) {
                setShops(response.data.shop);
                setResultsCount(response.data.results_available);
            }
        } catch (error: any) {
            console.error('Error fetching data', error.message || error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ResultContainer
            loading={loading}
            onClickHome={handleClick}
            onClickRetry={handleRetry}
            resultsCount={resultsCount}
        >
            {resultsCount > 0 ? (
                shops.map((shop, index) => (
                    <ShopCard key={index} shop={shop} />
                ))
            ) : (
                <div className="flex flex-col items-center mt-10">
                    <p className="text-center text-xl font-semibold mb-4">検索結果がありません</p>
                </div>
            )}
        </ResultContainer>
    );
};

export default Client;