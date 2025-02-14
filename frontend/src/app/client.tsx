"use client"

import { useState } from "react";
import LocationSearch from "@/components/form/locationSearch";
import AreaSearch from "@/components/form/areaSearch";
import { Area, Genre } from "@/types";

type ClientProps = {
    largeServiceAreas: Area[];
    genres: Genre[];
};

const Client = ({ largeServiceAreas, genres }: ClientProps) => {
    const [activeTab, setActiveTab] = useState("location");

    return (
        <div className="mx-auto">
            <div className="flex justify-center mb-5">
                <button
                    className={`px-4 py-2 ${activeTab === "location" ? "border-b-2 border-amber-500" : ""}`}
                    onClick={() => setActiveTab("location")}
                >
                    現在地で検索
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === "area" ? "border-b-2 border-amber-500" : ""}`}
                    onClick={() => setActiveTab("area")}
                >
                    地域で検索
                </button>
            </div>

            <div className="max-w-lg mx-auto">
                {activeTab === "location" && <LocationSearch genres={genres} />}
                {activeTab === "area" && <AreaSearch largeServiceAreas={largeServiceAreas} genres={genres} />}
            </div>
        </div>
    );
};

export default Client;