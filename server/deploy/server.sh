# Pull code
cd /var/www/html/fresherFriend
git checkout master
git pull origin master

# Build and deploy
yarn install
yarn run build
pm2 restart server
