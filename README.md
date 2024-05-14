# Installation

Run the following commands in your terminal
## Install Necessary system dependencies

1. `brew install nvm`
2. `nvm install --lts`
3. `brew install yarn`
4. `brew install postgresql@14`

## Create Database

1. `brew services start postgresql@14`
2. `createdb homies`

## Install Project Deps

1. `git clone` the project anywhere
2. `cd path/to/project/root`
3. `yarn install`

## Setup project
In the root of the project, run:
1. `yarn db:push`
2. `yarn db:seed`
3. `yarn dev`