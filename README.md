# sm-rando-tracker
SM Rando tracker that allows for collaborative tracking.  Broken into a frontend React website and a very small node websocket backend server for maintaining state.

This is a modified fork+branch to show SM: Subversion items.

# running
npm install concurrently

cd backend && npm install

cd frontend && npm install

npm start

# packaging frontend only
Run above steps to install dependencies

cd frontend

npm run build

Copy/host resulting `build` directory
