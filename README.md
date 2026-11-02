# Software testing study guide

## Run with Docker

Build the image from the repository root so Docker can include both the frontend and its Markdown chapter sources:

```sh
docker build -t software-testing-guide .
docker run --rm -p 8080:80 software-testing-guide
```

Open [http://localhost:8080](http://localhost:8080). The production frontend is served by Nginx on container port 80.