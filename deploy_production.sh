export NODE_ENV=production
export RWHOLEY_PORT=4357
export RWHOLEY_HOST=0.0.0.0

rm -rf node_modules
npm cache clean

npm install --production 

echo "starting server..."
node_modules/.bin/forever start server/server.js
