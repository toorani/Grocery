# Grocery
For creating a docker container for the server app, follow the commands 
1. docker build -t groceryapi-image .
2. docker run -it --rm -p 5001:80 --name groceryapi groceryapi-image
