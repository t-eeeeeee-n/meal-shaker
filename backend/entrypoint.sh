#!/bin/sh
echo $DEBUG
if [ $DEBUG = "True" ]
then
    poetry run uvicorn app.main:app --host 0.0.0.0 --port ${BACKEND_PORT:-7001} --reload
else
    poetry run uvicorn app.main:app --host 0.0.0.0 --port ${BACKEND_PORT:-7001}
fi