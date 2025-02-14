import React from "react";
import { Shop } from "@/types";

type ShopCardProps = {
    shop: Shop;
};

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
    return (
        <div className="my-4 p-6 border rounded-lg bg-white shadow-lg" data-shop-id={shop.id}>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{shop.name}</h2>
            {shop.logo_image && <img src={shop.logo_image} alt={shop.name} className="my-4 rounded-md shadow-sm"/>}
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">住所</h3>
                <p className="text-gray-600">{shop.address}</p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">ジャンル</h3>
                <p className="text-gray-600">{shop.genre.name}</p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">予算</h3>
                <p className="text-gray-600">{shop.budget.name}</p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">キャッチコピー</h3>
                <p className="text-gray-600">{shop.catch}</p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">アクセス</h3>
                <p className="text-gray-600">{shop.access}</p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">営業時間</h3>
                <p className="text-gray-600">{shop.open}</p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">定休日</h3>
                <p className="text-gray-600">{shop.close}</p>
            </div>
            <a href={shop.urls.pc} target="_blank"
               className="text-blue-600 font-semibold hover:text-blue-800 underline">More info</a>
        </div>
    );
};

export default ShopCard;