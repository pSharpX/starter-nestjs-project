FROM node:14-alpine AS builder

ARG ENV=production
ARG SOURCE_CODE_URL=https://github.com/pSharpX/starter-nestjs-project.git
ARG MAIN_DIR=techstore
ARG WORKPLACE_PATH=/opt/source

WORKDIR ${WORKPLACE_PATH}

RUN apk update && \
    apk add git && \
    git clone ${SOURCE_CODE_URL} ${MAIN_DIR}

WORKDIR ${WORKPLACE_PATH}/${MAIN_DIR}

RUN npm install && npm run build

FROM node:14-alpine

ARG ENV=production
ARG MAIN_DIR=techstore
ARG WORKPLACE_PATH=/opt/source

ENV NODE_ENV=production

LABEL edu.cibertec.techstore.project.name="Tech Store" \
    edu.cibertec.techstore.project.key="techstore" \
    edu.cibertec.techstore.project.version="1.0" \
    edu.cibertec.techstore.project.description="Tech Store Application" \
    edu.cibertec.techstore.author.name="Christian Rivera" \
    edu.cibertec.techstore.author.email="crivera2093@gmail.com" \
    edu.cibertec.techstore.author.url="https://github.com/pSharpX"

WORKDIR ${WORKPLACE_PATH}/${MAIN_DIR}

COPY env_secrets_expand.sh env_secrets_expand.sh
COPY entrypoint.sh entrypoint.sh
COPY --from=builder ${WORKPLACE_PATH}/${MAIN_DIR}/package.json package.json
COPY --from=builder ${WORKPLACE_PATH}/${MAIN_DIR}/dist dist

RUN chmod +x env_secrets_expand.sh entrypoint.sh
RUN npm install --only=production

EXPOSE 3000
#CMD [ "npm", "run", "start:prod" ]
ENTRYPOINT [ "./entrypoint.sh" ] 
