# Frontend/Dockerfile

FROM node:18-alpine

RUN mkdir -p app/frontend

COPY React_Frontend/requirements.txt app/frontend/
COPY React_Frontend app/frontend

WORKDIR /app/frontend

RUN npm install

EXPOSE 8501

CMD ["npm", "run", "dev"]
