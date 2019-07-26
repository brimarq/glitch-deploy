# Glitch Deploy  

This simple app adds a [GitHub Webhook](https://developer.github.com/webhooks/) endpoint to [Glitch's hello-express app](https://glitch.com/~hello-express), that employs HMAC signature verification to deploy to Glitch upon push events from a GitHub repository.  

Inspired by [Git Glitched](https://github.com/noise-machines/git-glitched), code for the endpoint route is adapted from [this article](https://medium.com/chingu/how-to-verify-the-authenticity-of-a-github-apps-webhook-payload-8d63ccc81a24).  

## Setup  

- Fork [this repo](https://github.com/brimarq/glitch-deploy) on GitHub.  
- On [Glitch](https://glitch.com), create a new project with the option to "Clone from Git Repo", using the git URL from your newly created fork (e.g. `https://github.com/username/reponame.git`). When the new project loads, replace the contents of `.env` with the contents of `.env.example` there. After doing this, the `.env.example` on Glitch can be deleted.    
- Clone your fork from GitHub to your computer.  
- In your computer's terminal, `cd` to your cloned repo's directory and rename `.env.example` to `.env`. Now, run `node create-secret.js`, copy the output, and paste it as the value to `SECRET` in the `.env` file, both in your local project and on Glitch.  
- Back in your GitHub repo's webhooks settings (`https://github.com/username/reponame/settings/hooks`), create a new webhook setting the payload URL to your Glitch project's endpoint (`https://your-project-name.glitch.me/glitch-deploy`), content type to `application/json`, secret to the value of `SECRET` in the `.env` file, and triggering events as "Just the `push` event.". 
- Now you're ready to go! When you push to GitHub from your local project, the webhook will automatically notify your Glitch project to pull in the new changes.  

## Start  
- Install dependencies with `npm install`.  
- To start the app with `nodemon` run `npm run dev`. Otherwise, `npm start`.   

## NOTE:  
- By default, the Glitch project will pull from the repo `master` branch. If you create additional branches in your repo and want it to pull from a different one, just uncomment the `PULL_BRANCH` variable in the project `.env` file *on Glitch* (this file is untracked), and add your preferred branch as the value (e.g. `PULL_BRANCH=glitch`). 


---
--- 

Welcome to Glitch
=================

Click `Show` in the header to see your app live. Updates to your code will instantly deploy and update live.

**Glitch** is the friendly community where you'll build the app of your dreams. Glitch lets you instantly create, remix, edit, and host an app, bot or site, and you can invite collaborators or helpers to simultaneously edit code with you.

Find out more [about Glitch](https://glitch.com/about).


Your Project
------------

On the front-end,
- edit `public/client.js`, `public/style.css` and `views/index.html`
- drag in `assets`, like images or music, to add them to your project

On the back-end,
- your app starts at `server.js`
- add frameworks and packages in `package.json`
- safely store app secrets in `.env` (nobody can see this but you and people you invite)


Made by [Glitch](https://glitch.com/)
-------------------

\ ゜o゜)ノ
