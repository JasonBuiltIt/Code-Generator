# this is just to run our application, its a basic entry point
from src.app import app

if __name__ == "__main__": # if we run this python file directly, import uvicorn which is a webserver to serve our fastapi application
    import uvicorn #web server to serve fastapi

    uvicorn.run(app,host="0.0.0.0", port=8000)

