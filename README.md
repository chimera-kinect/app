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
To be able to sync your files with the Windows pc, check if you see a drive in File explorer called DOKAN (N:). If you don't see it, you need to double click on the mirror file on the Windows pc Desktop. That will open a terminal window which will just stay blank and idle. You should now see the N: drive in File explorer.
The terminal windows HAS to stay open. When you close it, you lose the ability to sync your files.

## Syncing sketches
To start, make sure that:
- You have the `ssh`, `sshpass`, `scp` command line utilities installed on your pc. The sync process will make sure you have them installed and prompt you to install them if they're not found.
- Duplicate the `.env.example` file, rename it to `.env` and fill in the required variables there.

You can run `npm run sync` to sync your sketch. The process will ask you for which folder you want to sync and then sync it for you