FROM node:16.13.1

ENV PORT 3200

# Create app directory
RUN mkdir -p /usr/src/app #&& chown -R node:node /usr/src/app
WORKDIR /usr/src/app

# Copying source files
COPY . /usr/src/app/
# RUN mv '.env example' .env
RUN yarn install

# Create & Access permission to .next/trace
# RUN mkdir -p /usr/src/app/.next/trace && chmod -R 777 /usr/src/app/.next/trace



# Building app
# RUN yarn run build
# EXPOSE 3200

# Running the app
CMD "yarn" "run" "dev"
