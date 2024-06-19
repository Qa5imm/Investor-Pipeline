## About
It's an investor CRM, which helps startup founders manage potential investors.

### Technologies
React, tailwindcss, json-server.


## How to run

#### Note: All commands below should be run in app's root directory. 

1. Start by cloning the repo using `git clone https://github.com/Qa5imm/Investor-Pipeline.git`
2. Run `yarn install` to install dependencies
4. Run `npx json-server src/data/db.json --port 7000` to run the mock api.
3. Run `yarn run start` to start web app, default port is 3000.


## How to test
1. Run `yarn run test` to launch the test runner.

## Challenges
Implementing complex user-iteractions (drag and drop, resizable columns etc) without using any library was challenging. I overcame these challenges using `console.log()`.