from fastapi import HTTPException, Depends, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from secrets import compare_digest
from dotenv import load_dotenv
import os

load_dotenv()

security = HTTPBasic()

docs_username = os.getenv("DOCS_USERNAME")
docs_password = os.getenv("DOCS_PASSWORD")

def basic_auth(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = compare_digest(credentials.username, docs_username)
    correct_password = compare_digest(credentials.password, docs_password)
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username