from fastapi import FastAPI
from pydantic import BaseModel, conlist
from typing import List, Optional
import pandas as pd
from model import recommend, format_recommended_recipes

# initialize api
app = FastAPI()

# Use the compressed dataset
dataset=pd.read_csv('../Data/dataset.csv',compression='gzip')

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
    _input:conlist(float, min_items=9, max_items=9) # type: ignore
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


@app.get("/")
def home():
    return {"Diet Recommendation System Backend": "OK"}


@app.post("/predict/", response_model=ModelOutput)
def prediction(model_input:ModelInput):
    recommendations = recommend(
        dataset,
        model_input._input,
        model_input.params.dict())
    
    formatted_recommendations = format_recommended_recipes(recommendations)
    
    if formatted_recommendations is None:
        return {"output":None}
    else:
        return {"output":formatted_recommendations}

