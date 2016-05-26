[![Stories in Backlog](https://badge.waffle.io/BuoyantPyramid/buoyantpyramid.svg?label=backlogy&title=Backlog)](http://waffle.io/BuoyantPyramid/buoyantpyramid)
[![Stories in Ready](https://badge.waffle.io/BuoyantPyramid/buoyantpyramid.svg?label=ready&title=Ready)](http://waffle.io/BuoyantPyramid/buoyantpyramid)
[![Stories in In Progress](https://badge.waffle.io/BuoyantPyramid/buoyantpyramid.svg?label=In%20Progress&title=In%20Progress)](http://waffle.io/BuoyantPyramid/buoyantpyramid)
[![Stories in Done](https://badge.waffle.io/BuoyantPyramid/buoyantpyramid.svg?label=done&title=Done)](http://waffle.io/BuoyantPyramid/buoyantpyramid)
[![Build Status](https://travis-ci.org/BuoyantPyramid/buoyantpyramid.svg?branch=master)](https://travis-ci.org/BuoyantPyramid/buoyantpyramid)

# [Audiopile](https://www.google.com)

Audio organization platform for team collaboration among recording artists

## Team
  - __Product Owner__: Brian Fogg
  - __Scrum Master__: Nick Echols
  - __Development Team Members__: Sondra Silverhawk, Erick Paepke

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)


## Requirements

- Node
- Nodemon
- Eslint

## Development

### Installing Dependencies

From within the main directory of the repo:

```sh
npm install -g nodemon
npm install -g eslint
npm install -g eslint-plugin-react
npm install -g webpack-cli
npm install
sh ./pomander.sh
```



## Usage
### Server configuration


1. Update config files on primary server
  (do this manually)
2. Update config files on compression_server
  (do this manually)

from project root

3. Install dependencies

  npm install;
  bower install;
  cd ./compression_server;
  npm install;
  cd ..;


5. Start postgres database
  
  Start:
  pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
  
  Stop:
  pg_ctl -D /usr/local/var/postgres stop -s -m fast

6. Clear all databases
  
  drop table users cascade; drop table groups cascade; drop table users; drop table groups; drop table "userGroups"; drop table playlists; drop table songs cascade; drop table "playlistSongs";

7. Start primary server
  gulp

8. Start compression server
  cd ./compression_server;
  npm start

### --- Using Docker ---


install with these instructions:
  https://docs.docker.com/engine/installation/mac/

start docker CLI
  bash --login '/Applications/Docker/Docker Quickstart Terminal.app/Contents/Resources/Scripts/start.sh'

display images
  docker images
  docker images -a

list running containers
  docker ps

show latest created container
  docker ps -l



Delete all containers
  docker rm $(docker ps -a -q)

Delete all images
  docker rmi $(docker images -q)

build image
  docker build -t brian/testapp .

run container
  docker run
    -p - port settings 
    49160:8080
    -d 
    test_app

docker run -p 3000:3000 -d brian/testapp

POSTGRES

pull it down
  docker pull postgres

start it
  docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres

connect to it from an app
  docker run --link some-postgres:postgres -d brian/testapp

##########################

--------------- Docker Environment Setup ---------------
Docker Quickstart

docker-compose up

Wait for the long download!

visit: 192.168.99.100


### Roadmap

View the project roadmap [here](https://github.com/BuoyantPyramid/buoyantpyramid/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Dropping all tables
drop table songs cascade;
drop table groups cascade;
drop table playlists cascade;
drop table userGroups cascade;
drop table users cascade;
