"use client"

import React from "react";

type ClientProps = {
    data: string;  // HTMLの文字列が入っていると仮定
};

const Client: React.FC<ClientProps> = ({ data }) => {
    return(
        <div>
            <h2>取得したデータ</h2>
            <div dangerouslySetInnerHTML={{__html: data}}/>
            <button className="btn btn-primary btn-lg btn-block">test</button>
        </div>
    )
}
export default Client;