from fastapi import APIRouter

from app.api.routes.hotpepper import route as hotpepper
from app.api.routes.tabelog import route as tabelog
from app.api.routes.test import route as test

api_router = APIRouter()
api_router.include_router(tabelog.router, prefix="/tabelog", tags=["tabelog"])
api_router.include_router(hotpepper.router, prefix="/hotpepper", tags=["hotpepper"])
api_router.include_router(test.router, prefix="/test", tags=["test"])
