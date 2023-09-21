# app
For Js / Generative stuff

## Getting started
- Download and install [Node.js](https://nodejs.org/en)
- Clone this repo
- Open a terminal in the root of the project and run:
1. `npm i`
2. `npm run dev` - if you want to make changes to the project - or `npm start` if you just want to start it
- Open your browser and go to `localhost:5000`

## Add a new sketch
Please follow the file structure of existing sketches - see `public/view_sample_data_sketch`.
Your new sketch should be contained in a folder, and no orphan files should remain in the public folder. There should be no need to register the new route, `index.js` already takes care of registering new folders as routes and serving them statically. The name of your folder should end with `_sketch` to let express now that it has to also create a new route for you. If you want to, you can create other folders in the `public` directory with a name that does not end with `_sketch`. Those folders will only be served statically and will be accessible from your sketches.

## Windows pc setup
To be able to sync your files with wht Windows pc, check if you see a drive in File explorer called DOKAN (N:). If you don#t see it, you need to:
1. Search ´cmd´ in the start menu
2. Right click on ´Command Prompt´ and click on ´Run as Administrator´
3. Run this command: ´C:\Program Files\Dokan\Dokan Library-2.0.6\sample\mirror/mirror.exe /r \\wsl.localhost\Ubuntu /l N´
The terminal windows HAS to stay open. When you close it, you lose the ability to sync your files.