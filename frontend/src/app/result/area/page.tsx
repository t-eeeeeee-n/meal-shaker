    import {Metadata, NextPage} from "next";
    import axios from "axios";
    import React from "react";
    import Client from "@/app/result/area/client";
    import {Shop} from "@/types";
    import {convertKeysToSnakeCase} from "@/utils/utils";

    type PageProps = {
        searchParams: {
            largeServiceArea: string;
            largeArea?: string;
            middleArea?: string;
            smallArea?: string;
            genre: string;
        };
    };

    export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
        return {
            title: `Results for ${searchParams.largeServiceArea}`,
        };
    }

    const fetchData = async (params: Record<string, string>) => {
        const baseURL: string = process.env.API_BASE_URL || "";

        const snakeCaseParams = convertKeysToSnakeCase(params);

        try {
            // ランダムで一件取得
            const response = await axios.get(`${baseURL}/hotpepper/search/one`, { params: snakeCaseParams });
            return {
                restaurantData: response,
                params: snakeCaseParams
            }
        } catch (error: any) {
            console.error('Error fetching data', error.message || error);
            throw new Error('Error fetching data');
        }
    };


    const Page: NextPage<PageProps> = async ({ searchParams }: PageProps) => {

        let shops: Shop[] = [];
        let numberOfResults: number = 0;
        let response;
        try {
            response = await fetchData(searchParams);
        } catch (error) {
            console.error('Error fetching data', error);
            throw new Error('Error fetching data');
        }
        if(response){
            shops = response.restaurantData.data.shop;
            numberOfResults = response.restaurantData.data.results_available
        }

        return <Client
            shops={shops}
            numberOfResults={numberOfResults}
            searchParams={searchParams}
        />;
    };
    export default Page;