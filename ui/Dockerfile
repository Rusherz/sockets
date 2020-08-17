FROM nginx:1.17.8-alpine
WORKDIR /home/app
COPY ./build/ /home/app/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# RUN npm install
# CMD [ "npm", "run", "start" ]
