from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, conlist
from typing import List, Optional
import pandas as pd
from model import recommend, format_recommended_recipes, get_img_url

# initialize api
app = FastAPI()

# for cors
origins = [
   # "http://localhost:5173/"
   "*"
]
app.add_middleware(
   CORSMiddleware,
   allow_origins=origins,
   allow_credentials=True,
   allow_methods=["*"],
   allow_headers=["*"],
)

# Use the compressed dataset
dataset=pd.read_csv('../Data/compressed_file/dataset.gz',compression='gzip')

'''
Defines the structure for parameters
'''
class parameters(BaseModel):
    n_neighbors:int=5
    return_distance:bool=False

'''
Defines the structure for Input for the Model
'''
class ModelInput(BaseModel):
    nutrition_input:conlist(float, min_items=3, max_items=3) # type: ignore
    params:Optional[parameters]

'''
Defines the structure for each recommended meal's recipes
'''
class Recipe(BaseModel):
    Name:str
    CookTime:str
    PrepTime:str
    TotalTime:str
    RecipeIngredientParts:list[str]
    Calories:float
    FatContent:float
    SaturatedFatContent:float
    CholesterolContent:float
    SodiumContent:float
    CarbohydrateContent:float
    FiberContent:float
    SugarContent:float
    ProteinContent:float
    RecipeInstructions:list[str]

'''
Defines the structure for the Model Output
which is a list of recipes (list within a list)
'''
class ModelOutput(BaseModel):
    output: Optional[List[Recipe]] = None
    img_url: Optional[List[str]]


@app.get("/")
def home():
    return {"Diet Recommendation System Backend": "OK"}

@app.post("/predict/", response_model=ModelOutput)
def prediction(model_input:ModelInput):
    recommendations = recommend(
        dataset,
        model_input.nutrition_input,
        model_input.params.dict())
    
    formatted_recommendations = format_recommended_recipes(recommendations)
    meal_names = []
    for meal in formatted_recommendations:
        meal_names.append(meal["Name"])
    
    img_url = []
    for name in meal_names:
        img_url.append(get_img_url(name))
    
    if formatted_recommendations is None:
        return {"output":None, "img_url":None}
    else:
        return {"output":formatted_recommendations, "img_url":img_url}
