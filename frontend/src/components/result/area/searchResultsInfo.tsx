import React from "react";

type SearchResultsInfoProps = {
    largeServiceArea: string;
    largeArea: string;
    middleArea: string;
    smallArea: string;
    genre: string;
    numberOfResults: number;
};

const SearchResultsInfo: React.FC<SearchResultsInfoProps> = ({
                                                                 largeServiceArea,
                                                                 largeArea,
                                                                 middleArea,
                                                                 smallArea,
                                                                 genre,
                                                                 numberOfResults,
                                                             }) => {
    return (
        <div className="my-4">
            <div className="flex mb-2">
                <span className="font-medium text-gray-700 flex-shrink-0 w-24">検索結果:</span>
                <span className="text-gray-900 flex-grow">{numberOfResults}件</span>
            </div>
            <div className="flex mb-2">
                <span className="font-medium text-gray-700 flex-shrink-0 w-24">地方:</span>
                <span className="text-gray-900 flex-grow">{largeServiceArea}</span>
            </div>
            <div className="flex mb-2">
                <span className="font-medium text-gray-700 flex-shrink-0 w-24">都道府県:</span>
                <span className="text-gray-900 flex-grow">{largeArea}</span>
            </div>
            <div className="flex mb-2">
                <span className="font-medium text-gray-700 flex-shrink-0 w-24">地域:</span>
                <span className="text-gray-900 flex-grow">{middleArea}</span>
            </div>
            <div className="flex mb-2">
                <span className="font-medium text-gray-700 flex-shrink-0 w-24">地区:</span>
                <span className="text-gray-900 flex-grow">{smallArea}</span>
            </div>
            <div className="flex">
                <span className="font-medium text-gray-700 flex-shrink-0 w-24">ジャンル:</span>
                <span className="text-gray-900 flex-grow">{genre}</span>
            </div>
        </div>
    );
};

export default SearchResultsInfo;