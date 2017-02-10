php artisan migrate --seed --force

# Normal dependencies are already installed by Heroku, but still need Webpack, Modernizer, etc
# npm install --only=dev

npm run build
