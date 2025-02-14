import urllib.parse
import httpx
from fastapi import HTTPException


async def fetch_data(endpoint: str) -> dict:
    """
    この関数は指定されたエンドポイントからデータを非同期に取得し、JSON形式で返します。
    リクエストのステータスコードが200でない場合や、JSONの解析に失敗した場合は例外をスローします。

    :param endpoint: データを取得するエンドポイント
    :return: 取得したデータをJSON形式で返す
    :raises HTTPException: ステータスコードが200でない場合や、JSONの解析に失敗した場合
    """
    async with httpx.AsyncClient() as client:
        response = await client.get(endpoint, timeout=10.0)
        if response.status_code == 200:
            try:
                data = response.json()
                return data["results"]
            except Exception as e:
                print(f"Error parsing JSON response from endpoint {endpoint}:", e)
                raise HTTPException(status_code=500, detail="Failed to parse JSON response")
        else:
            print(f"HTTP response status code from endpoint {endpoint}:", response.status_code)
            raise HTTPException(status_code=response.status_code,
                                detail=f"Failed to fetch data from endpoint {endpoint}: {response.status_code}")


def construct_url(endpoint: str, params: dict) -> str:
    """
    この関数は指定されたエンドポイントとクエリパラメータを使用してリクエスト用のエンドポイントを構築し、結果を返します。

    :param endpoint: クエリパラメータが追加されるエンドポイント
    :param params: クエリパラメータを表す任意のキーワード引数
    :return: エンコードされたクエリパラメータを含む構築されたエンドポイント
    """
    return endpoint + '?' + urllib.parse.urlencode(params)
