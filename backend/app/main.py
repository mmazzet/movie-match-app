from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()


movies: list[dict]  = [
    {
        "id": 1,
        "title": "Gone with the Wind",
        "director": "Victor Fleming",
        "year": 1939
    },
    {
        "id": 2,
        "title": "Casablanca",
        "director": "Michael Curtiz",
        "year": 1942
    },

]

@app.get("/", response_class=HTMLResponse)
def home():
    return f"<h1>{movies[0]['title']}</h1>"f"<h1>{movies[1]['title']}</h1>"

@app.get("/v1/movies")
def get_movies():
    return movies