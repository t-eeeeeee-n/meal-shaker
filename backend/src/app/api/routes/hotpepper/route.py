from typing import Optional

from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse

from ....services.hotpepper.service import get_restaurant_data, get_large_service_area, get_service_area, \
    get_large_area, \
    get_middle_area, get_small_area, get_genre, get_restaurant_data_location, get_restaurant_start, \
    get_restaurant_location_start

router = APIRouter()


# グルメサーチAPI
@router.get("/search", response_class=JSONResponse)
async def hotpepper_search(
        large_service_area: str = Query(...),
        large_area: Optional[str] = Query(None),
        middle_area: Optional[str] = Query(None),
        small_area: Optional[str] = Query(None),
        genre: Optional[str] = Query(None),
        start: Optional[str] = Query(None),
        count: Optional[str] = Query(None)
):
    results = await get_restaurant_data(large_service_area, large_area, middle_area, small_area, genre, start, count)
    return JSONResponse(content=results)


# グルメサーチAPI
@router.get("/search/one", response_class=JSONResponse)
async def hotpepper_search(
        large_service_area: str = Query(...),
        large_area: Optional[str] = Query(None),
        middle_area: Optional[str] = Query(None),
        small_area: Optional[str] = Query(None),
        genre: Optional[str] = Query(None)
):
    start = await get_restaurant_start(large_service_area, large_area, middle_area, small_area, genre)
    results = await get_restaurant_data(large_service_area, large_area, middle_area, small_area, genre, str(start), "1")
    return JSONResponse(content=results)


# グルメサーチAPI
@router.get("/location/search", response_class=JSONResponse)
async def hotpepper_search(
        latitude: str = Query(...),
        longitude: str = Query(...),
        genre: Optional[str] = Query(None),
        _range: Optional[str] = Query(None),
        start: Optional[str] = Query(None),
        count: Optional[str] = Query(None)
):
    results = await get_restaurant_data_location(latitude, longitude, genre, _range, start, count)
    return JSONResponse(content=results)


# グルメサーチAPI
@router.get("/location/search/one", response_class=JSONResponse)
async def hotpepper_search(
        latitude: str = Query(...),
        longitude: str = Query(...),
        genre: Optional[str] = Query(None),
        _range: Optional[str] = Query(None),
):
    start = await get_restaurant_location_start(latitude, longitude, genre, _range)
    results = await get_restaurant_data_location(latitude, longitude, genre, _range, str(start), "1")
    return JSONResponse(content=results)


# 大サービスエリアマスタAPI
@router.get("/large_service_area", response_class=JSONResponse)
async def hotpepper_large_service_area():
    results = await get_large_service_area()
    return JSONResponse(content=results)


# サービスエリアマスタAPI
@router.get("/service_area", response_class=JSONResponse)
async def hotpepper_service_area(region_code: str = Query(...)):
    results = await get_service_area(region_code)
    return JSONResponse(content=results)


# 大エリアマスタAPI
@router.get("/large_area", response_class=JSONResponse)
async def hotpepper_large_area(region_code: str = Query(...)):
    results = await get_large_area(region_code)
    return JSONResponse(content=results)


# 中エリアマスタAPI
@router.get("/middle_area", response_class=JSONResponse)
async def hotpepper_middle_area(large_area_code: str = Query(...)):
    results = await get_middle_area(large_area_code)
    return JSONResponse(content=results)


# 小エリアマスタAPI
@router.get("/small_area", response_class=JSONResponse)
async def hotpepper_small_area(middle_area_code: str = Query(...)):
    results = await get_small_area(middle_area_code)
    return JSONResponse(content=results)


# ジャンルマスタAPI
@router.get("/genre", response_class=JSONResponse)
async def hotpepper_genre():
    results = await get_genre()
    return JSONResponse(content=results)
