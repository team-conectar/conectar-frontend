FROM node:latest

ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
ENV AMAZON_URL=https://conectar.s3.sa-east-1.amazonaws.com/uploads/
RUN npm install

WORKDIR /app
ADD . /app

EXPOSE 8000
EXPOSE 35729

ENTRYPOINT ["/bin/bash", "/app/run.sh"]
CMD ["start"]
