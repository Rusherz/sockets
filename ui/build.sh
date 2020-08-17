npm install
npm run build
rm -rf node_modules
docker build --no-cache -t registry.jmir.org:5000/jmirx/dashboard-ui:$1 .
docker push registry.jmir.org:5000/jmirx/dashboard-ui:$1
npm install
