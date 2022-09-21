FROM node:16.17.0

RUN mkdir -p /user/src/app

WORKDIR /user/src/app

COPY ./ /user/src/app

RUN npm install && npm run build

CMD ["/bin/bash"]
