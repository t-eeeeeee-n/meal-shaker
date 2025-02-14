from fastapi import HTTPException, Request

ALLOWED_IPS = ["192.168.1.1", "127.0.0.1"]  # Replace with your allowed IPs

def ip_limited(request: Request):
    ip = request.client.host
    if ip not in ALLOWED_IPS:
        raise HTTPException(status_code=403, detail="Forbidden access")