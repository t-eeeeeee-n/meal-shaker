import os
import random

from dotenv import load_dotenv

from .utils import construct_url, fetch_data

# .envファイルから環境変数を読み込む
load_dotenv()
API_KEY = os.getenv("RECRUIT_API_KEY")


async def get_restaurant_data(large_service_area: str, large_area: str, middle_area: str, small_area: str, genre: str, start: str, count: str):
    """
    グルメサーチAPI
    :param large_service_area:
    :param large_area:
    :param middle_area:
    :param small_area:
    :param genre:
    :param start:
    :param count:
    :return:
    """

    # エンドポイント生成
    base_endpoint: str = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/"
    params: dict = {
        'key': API_KEY,
        'large_service_area': large_service_area,
        'large_area': large_area,
        'middle_area': middle_area,
        'small_area': small_area,
        'genre': genre,
        'start': start,
        'count': count,
        'format': 'json'
    }

    # `None` のパラメータを削除
    params = {k: v for k, v in params.items() if v}

    endpoint: str = construct_url(base_endpoint, params)

    # リクエスト
    response: dict = await fetch_data(endpoint)
    if response.get("results_available", 0) == 0:
        return []
    return response


async def get_restaurant_start(large_service_area: str, large_area: str, middle_area: str, small_area: str, genre: str):
    """
    検索店舗をカウントしてその中からランダムな数字を返却
    :param large_service_area:
    :param large_area:
    :param middle_area:
    :param small_area:
    :param genre:
    :return: 店舗startのnumber
    """
    # エンドポイント生成
    base_endpoint: str = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/"
    params: dict = {
        'key': API_KEY,
        'large_service_area': large_service_area,
        'large_area': large_area,
        'middle_area': middle_area,
        'small_area': small_area,
        'genre': genre,
        'count': "0",
        'format': 'json'
    }

    # `None` のパラメータを削除
    params = {k: v for k, v in params.items() if v}

    endpoint: str = construct_url(base_endpoint, params)
    # リクエスト
    response = await fetch_data(endpoint)
    start_number = random.randint(1, response["results_available"])
    return start_number


async def get_restaurant_data_location(latitude: str, longitude: str, genre: str, _range: str, start: str, count: str):
    """
    グルメサーチAPI
    :param longitude:
    :param latitude:
    :param genre:
    :param _range:
    :param start:
    :param count:
    :return:
    """
    # エンドポイント生成
    base_endpoint: str = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/"
    params: dict = {
        'key': API_KEY,
        'genre': genre,
        'lat': latitude,
        'lng': longitude,
        'range': _range,
        'start': start,
        'count': count,
        'format': 'json'
    }

    # `None` のパラメータを削除
    params = {k: v for k, v in params.items() if v}

    endpoint: str = construct_url(base_endpoint, params)

    # リクエスト
    response: dict = await fetch_data(endpoint)
    if response["results_available"] == 0:
        return []
    return response


async def get_restaurant_location_start(latitude: str, longitude: str, genre: str, _range: str):
    """
    検索店舗をカウントしてその中からランダムな数字を返却
    :param longitude:
    :param latitude:
    :param genre:
    :param _range:
    :return:
    """
    # エンドポイント生成
    base_endpoint: str = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/"
    params: dict = {
        'key': API_KEY,
        'genre': genre,
        'lat': latitude,
        'lng': longitude,
        'range': _range,
        'count': "0",
        'format': 'json'
    }

    # `None` のパラメータを削除
    params = {k: v for k, v in params.items() if v}

    endpoint: str = construct_url(base_endpoint, params)

    # リクエスト
    response: dict = await fetch_data(endpoint)
    start_number = random.randint(1, response["results_available"])
    return start_number


async def get_large_service_area():
    """
    大サービスエリアマスタAPI
    :return:
    """
    # エンドポイント生成
    base_endpoint: str = "http://webservice.recruit.co.jp/hotpepper/large_service_area/v1/"
    params: dict = {
        'key': API_KEY,
        'format': 'json'
    }
    endpoint: str = construct_url(base_endpoint, params)

    # リクエスト
    response: dict = await fetch_data(endpoint)
    if response["results_available"] == 0:
        return []

    response_list: list = list()
    for large_service_area in response["large_service_area"]:
        response_list.append({"code": large_service_area["code"], "name": large_service_area["name"]})

    return response_list


async def get_service_area(regions_code: str):
    # エンドポイント生成
    base_endpoint: str = "http://webservice.recruit.co.jp/hotpepper/service_area/v1/"
    params: dict = {
        'key': API_KEY,
        'format': 'json'
    }
    endpoint: str = construct_url(base_endpoint, params)

    # リクエスト
    response: dict = await fetch_data(endpoint)
    if response["results_available"] == 0:
        return []

    response_list: list = list()

    for service_area in response["service_area"]:
        if regions_code == service_area["large_service_area"]["code"]:
            response_list.append({"code": service_area["code"], "name": service_area["name"]})

    return response_list


async def get_large_area(regions_code: str):
    # エンドポイント生成
    base_endpoint: str = "http://webservice.recruit.co.jp/hotpepper/large_area/v1/"
    params: dict = {
        'key': API_KEY,
        'format': 'json'
    }
    endpoint: str = construct_url(base_endpoint, params)

    # リクエスト
    response: dict = await fetch_data(endpoint)
    if response["results_available"] == 0:
        return []

    response_list: list = list()

    for large_area in response["large_area"]:
        if regions_code == large_area["large_service_area"]["code"]:
            response_list.append({"code": large_area["code"], "name": large_area["name"]})

    return response_list


async def get_middle_area(large_area_code: str):
    # エンドポイント生成
    base_endpoint: str = "http://webservice.recruit.co.jp/hotpepper/middle_area/v1/"
    params: dict = {
        'key': API_KEY,
        'large_area': large_area_code,
        'format': 'json'
    }
    endpoint: str = construct_url(base_endpoint, params)

    # リクエスト
    response: dict = await fetch_data(endpoint)
    if response["results_available"] == 0:
        return []

    response_list: list = list()
    for middle_area in response["middle_area"]:
        response_list.append({"code": middle_area["code"], "name": middle_area["name"]})

    return response_list


async def get_small_area(middle_area_code: str):
    # エンドポイント生成
    base_endpoint: str = "http://webservice.recruit.co.jp/hotpepper/small_area/v1/"
    params: dict = {
        'key': API_KEY,
        'middle_area': middle_area_code,
        'format': 'json'
    }
    endpoint: str = construct_url(base_endpoint, params)

    # リクエスト
    response: dict = await fetch_data(endpoint)
    if response["results_available"] == 0:
        return []

    response_list: list = list()
    for small_area in response["small_area"]:
        response_list.append({"code": small_area["code"], "name": small_area["name"]})

    return response_list


async def get_genre():
    # エンドポイント生成
    base_endpoint: str = "http://webservice.recruit.co.jp/hotpepper/genre/v1/"
    params: dict = {
        'key': API_KEY,
        'format': 'json'
    }
    endpoint: str = construct_url(base_endpoint, params)

    # リクエスト
    response: dict = await fetch_data(endpoint)
    if response["results_available"] == 0:
        return []

    response_list: list = list()
    for genre in response["genre"]:
        response_list.append({"code": genre["code"], "name": genre["name"]})

    return response_list
