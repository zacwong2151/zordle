# Zordle

This project was created because 1 wordle a day is simply not enough. Click the link below to visit zordle!

<a href="https://zordle.fly.dev/" 
    target="_blank">https://zordle.fly.dev/
</a>

---

> ### Phase 1: build basic wordle
> completed on 26th Jan 2025
  - Basic wordle functionality
  - Create a nice dataset of 5-letter words
  - TODO: UI (letters jump) when user gets the correct word


> ### Phase 2: deploy website
> completed on 29th Jan 2025
1. Install flyio using
```curl -L https://fly.io/install.sh | sh```
2. Create `Dockerfile` and `.dockerignore` in each microservice
3. Build docker image and run container locally to test if `Dockerfile` is correct
4. Run `fly launch` -> to deploy new application (remember to be at the correct directory)
5. Run `fly deploy` -> to redeploy after new changes (you don’t have to push changes to GitHub to redeploy on Fly.io. Fly.io deploys directly from your local machine)


> ### Phase 3: extend functionality to n-letter words 
> KIV

 

> ### Phase 4: implement user service
> completed on 5th March 2025
  - DONE: basic login logout functions using Auth0. Make the /battle route protected


> ### Phase 5.1: implement user stats (e.g. similar to wordle's accuracy system)
> WIP


> ### Phase 5.2: implement 1v1 system (which user can guess the fastest? Users can see each other's progress live) (game modes are: n-letter words, maximum no. of guesses, how many rounds etc)
> WIP
