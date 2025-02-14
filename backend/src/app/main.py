from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware import Middleware
from dotenv import load_dotenv
import os

from app.api.main import api_router
from app.core.config import settings
from app.midlewares import basic_auth, ip_limited

load_dotenv()
origins = os.getenv("CORS_ORIGINS", "").split(",")

# ミドルウェア設定
middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
]

app = FastAPI(middleware=middleware, docs_url=None, redoc_url=None)

app.include_router(api_router, prefix=settings.API_V1_STR)



# @app.get("/redoc", dependencies=[Depends(ip_limited), Depends(basic_auth)])
@app.get("/redoc", dependencies=[Depends(basic_auth)])
async def get_redoc_ui():
    from fastapi.openapi.docs import get_redoc_html

    return get_redoc_html(
        openapi_url=app.openapi_url,
        title=app.title
    )

# @app.get("/docs", dependencies=[Depends(ip_limited), Depends(basic_auth)])
@app.get("/docs", dependencies=[Depends(basic_auth)])
async def get_swagger_ui():
    from fastapi.openapi.docs import get_swagger_ui_html

    return get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title=app.title,
        oauth2_redirect_url=app.swagger_ui_oauth2_redirect_url,
        swagger_favicon_url="https://fastapi.tiangolo.com/img/favicon.png"
    )