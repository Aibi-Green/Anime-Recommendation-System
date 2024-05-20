# Backend DockerFile
FROM python:3.10.8

# create a directory
# creating intermediate directories along with it if specified in path
RUN mkdir -p app/backend

# copy requirements.txt to image's filesystem
COPY FastAPI_Backend/requirements.txt app/backend/requirements.txt
# copy dataset to image's filesystem
COPY Data/compressed_file app/Data/compressed_file

# copy backend folder to image's filesystem
COPY FastAPI_Backend app/backend

# cd to backend in image's filesystem
WORKDIR /app/backend

# always checks if pip needs an update
RUN pip install --upgrade pip
# installs all the required dependencies stated inside the text file
RUN pip install -r requirements.txt

# indicates that the container will listen for network connections on 8080
# does not actually publish the ports, just a documentation
EXPOSE 8081

CMD ["uvicorn","main:app","--host","0.0.0.0","--port","8081","--reload"]
# uvicorn - runs the Uvicorn ASGI server, used to serve FastAPI applications
# main:app - specifies the Python module (main.py) 
#            and the FastAPI instance (app) to be served by Uvicorn
#            Main is typically where the fastapi app object is created
# --host 0.0.0.0 - specifies that uvicorn should listen on all network interfaces
#                  of the container.
#                  allows the container to accept connections from outside the
#                  container (i.e. access the server from your host machine or 
#                  from other machines on the same network)
# --port 8080 - specifies the port in which uvicorn should listen for incoming 
#               connections.
# --reload - tell uvicorn to automatically reload the application when changes 
#            are detected in the code. Useful for development and does not
#            require you to restart the container manually.
