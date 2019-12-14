FROM node:10.16.3-alpine

RUN apk add --no-cache python git-perl bash make gcc g++
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
ENV USERNAME nodeuser

RUN adduser -D $USERNAME && \
    mkdir /code && \
    chown $USERNAME:$USERNAME /code

USER $USERNAME
WORKDIR /code

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
COPY package-lock.json package.json /code/

RUN if [ "$NODE_ENV" == "production" ]; then npm install --production; else npm install; fi

EXPOSE 3000

COPY . /code

USER root
RUN find /code -user 0 -print0 | xargs -0 chown $USERNAME:$USERNAME
USER $USERNAME

# See README for additional information
ENV DEPLOYED=${DEPLOYED}

CMD [ "node", "app.js" ]
