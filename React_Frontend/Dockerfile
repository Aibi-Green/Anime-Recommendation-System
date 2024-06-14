# Frontend/Dockerfile

FROM node:18-alpine

RUN mkdir -p app/frontend

COPY React_Frontend/package.json app/frontend/package.json
COPY React_Frontend/package-lock.json app/frontend/package-lock.json

WORKDIR /app/frontend
RUN npm install

COPY React_Frontend .

EXPOSE 5173

CMD ["npm", "run", "dev"]

# COPY React_Frontend app/frontend

# WORKDIR /app/frontend
# RUN npm install

# EXPOSE 5173

# CMD ["npm", "run", "dev"]
