from fastapi import APIRouter
from app.api.routes.tabelog import routes as tabelog
from app.api.routes.test import routes as test

api_router = APIRouter()
api_router.include_router(tabelog.router, prefix="/tabelog", tags=["tabelog"])
api_router.include_router(test.router, prefix="/test", tags=["test"])
