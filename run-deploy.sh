# author Abhijeet Padwal [ padwalab@gmail.com / abhijeet.padwal@sjsu.edu ]

#!/bin/sh

if [ $# -eq 0 ]; then
    docker-compose up
fi
if [ $1 == "clean" ]; then
    docker-compose up --build --no-deps 
fi