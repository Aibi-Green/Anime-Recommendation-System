# Diet-Recommendation-System
A simple diet recommender system that uses Docker to manage the application's backend and frontend.

Calorie Calculator based on [this](https://mohap.gov.ae/en/more/awareness-center/calories-calculation).

## Table of Content
- [Requirement](#requirements)
- [Tools and Technologies](#tools-and-technologies)
- [Run Docker](#run-docker)
- [Backend Testing](#backend-testing)
- [App Preview](#app-preview)
- [Resources](#resources)

## Requirements:
- Download and install both [Docker Desktop and Docker Compose](https://docs.docker.com/compose/install/).

## Tools and Technologies
- Docker
- Python
- FastAPI 
- Uvicorn
- ReactJS

## Run Docker
To run the application make sure, you already have Docker Desktop and Docker Compose.

### Clone Repository
After installing, clone this repository.
```
git clone https://github.com/Aibi-Green/Diet-Recommendation-System.git
```
### Docker Compose
Run docker-compose in terminal of your project root:
```
docker-compose up -d --build
```

### Web Application
After building the docker containers, open Web App with this link: [http://localhost:5173](http://localhost:5173)

#### Building React Vite in Docker
Add this into vite config
```
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // this makes it work in docker container
    strictPort: true,
    port: 5173
  }
})
```

## Backend Testing
Download and Install an API platform such as [Insomnia](https://insomnia.rest/download) or [Postman](https://www.postman.com/downloads/).

Then, create an HTTP request (GET or POST).

![example_backend_testing](Assets/example_backend_testing.png)

## App Preview
![full-app-screenshot](/Assets/full-app-screenshot.png)

## Resources
Dataset - [Kaggle](https://www.kaggle.com/datasets/irkaal/foodcom-recipes-and-reviews?select=recipes.csv)