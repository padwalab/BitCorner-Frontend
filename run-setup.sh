# author Abhijeet Padwal [ padwalab@gmail.com / abhijeet.padwal@sjsu.edu ]

#!/bin/sh

if [ $# -eq 0 ]; then
    docker-compose -f docker-compose.dev.yml up
fi
if [ $1 == "clean" ]; then
    docker-compose -f docker-compose.dev.yml up --build --no-deps 
fi