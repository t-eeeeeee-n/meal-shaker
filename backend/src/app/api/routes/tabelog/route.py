from fastapi import APIRouter, Query
from fastapi.responses import HTMLResponse
from ....services.tabelog.service import list_entries

router = APIRouter()


@router.get("/search", response_class=HTMLResponse)
async def tabelog_search(area: str = Query(...), keyword: str = Query(...)):
    search_results = await list_entries(area, keyword)
    return HTMLResponse(content=search_results)
