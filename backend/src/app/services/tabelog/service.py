import urllib.parse
from datetime import datetime

import httpx
from fastapi import HTTPException, requests
import requests


# async def list_entries(area: str, keyword: str):
#     url = f"https://tabelog.com/rst/rstsearch/?LstKind=1&voluntary_search=1&lid=top_navi1&sa={area}&sk={keyword}&vac_net=&search_date=2022%2F11%2F29%28火%29&svd=20221129&svt=1900&svps=2&hfc=1&form_submit=&area_datatype=MajorMunicipal&area_id=27100&key_datatype=Genre3&key_id=40&sa_input={area}"
#     # httpx使ってみた
#     async with httpx.AsyncClient(follow_redirects=True) as client:
#         try:
#             response = await client.get(url)
#             return response.text
#         except httpx.HTTPStatusError as e:
#             error_message = f"HTTP error occurred: {e.response.status_code} - {e.response.text}"
#             raise HTTPException(status_code=e.response.status_code, detail=error_message)
#         except httpx.RequestError as e:
#             error_message = f"Request error occurred: {str(e)}"
#             raise HTTPException(status_code=500, detail=error_message)

async def list_entries(area: str, keyword: str):
    print(area, keyword)
    # Get area info
    area_info = await get_area_info(area)
    if not area_info or len(area_info) == 0:
        raise Exception("No area info found")
    area_data = area_info["suggestResult"][0]
    area_name = area_data["name"]
    area_type = area_data["type"]
    area_id = area_data["typeId"]
    latitude = area_data["latitude"]
    longitude = area_data["longitude"]

    # Get keyword info
    keyword_info = await get_keyword_info(keyword, area_type, area_id, latitude, longitude)
    keyword_data = keyword_info["suggestResult"][0]
    keyword_type = keyword_data["type"]
    keyword_id = keyword_data["typeId"]

    # Construct search URL
    search_url = construct_search_url(area_name, keyword, area_type, area_id, keyword_type, keyword_id)

    # Step 4: Make search request
    search_results = await fetch_search_results(search_url)
    return search_results


async def get_area_info(area):
    url = f"https://tabelog.com/web-api/v1/search-suggestions/area?area={urllib.parse.quote(area)}"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Failed to fetch area info: {response.status_code}")


async def get_keyword_info(keyword, area_type, area_id, latitude, longitude):
    url = f"https://tabelog.com/web-api/v1/search-suggestions/keyword?keyword={urllib.parse.quote(keyword)}&areaType={area_type}&areaId={area_id}&latitude={latitude}&longitude={longitude}"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Failed to fetch keyword info: {response.status_code}")


def construct_search_url(area_name, keyword, area_type, area_id, keyword_type, keyword_id):
    base_url = "https://tabelog.com/rst/rstsearch/"
    today = datetime.today().strftime('%Y/%m/%d(%a)')
    params = {
        'LstKind': '1',
        'voluntary_search': '1',
        'lid': 'top_navi1',
        'sa': area_name,
        'sk': keyword,
        'vac_net': '',
        'search_date': '',
        'svd': '',
        'svt': '',
        'svps': '2',
        'hfc': '1',
        'form_submit': '',
        'area_datatype': area_type,
        'area_id': area_id,
        'key_datatype': keyword_type,
        'key_id': keyword_id,
        'sa_input': area_name
    }
    return base_url + '?' + urllib.parse.urlencode(params)


async def fetch_search_results(search_url):
    async with httpx.AsyncClient(follow_redirects=True) as client:
        response = await client.get(search_url)
        if response.status_code == 200:
            return response.text
        else:
            raise Exception(f"Failed to fetch search results: {response.status_code}")
