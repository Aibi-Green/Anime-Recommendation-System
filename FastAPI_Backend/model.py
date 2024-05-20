'''
KNN model: content-based filtering
'''
import numpy as np
import re
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import FunctionTransformer

'''
dataframe is the dataset
parameters(dict) is for changing the number of meals it will recommend
_input(list) must have 9 items (refer to ipynb to see the datatype of each item
    and what it corresponds to)
'''
def recommend(dataframe,_input,parameters={'n_neighbors':5,'return_distance':False}):
        # Data preprocessing (Numerical columns)
        scaler = StandardScaler()
        prep_data=scaler.fit_transform(dataframe.iloc[:,6:15].to_numpy())
        
        # Initialize model
        model = NearestNeighbors(metric='cosine', algorithm='brute')
        model.fit(prep_data)
        
        # Building pipeline
        transformer = FunctionTransformer(model.kneighbors, kw_args=parameters)
        pipeline = Pipeline([('std_scaler', scaler), ('NN', transformer)])
        
        # Apply pipeline to _input
        _input=np.array(_input).reshape(1,-1)
        recommendations = prep_data.iloc[pipeline.transform(_input)[0]]
        
        if(recommendations.shape[0]==parameters['n_neighbors']):
            return recommendations
        else:
            return None

'''
Separates recipes into a list of strings
'''
def format_recommended_recipes(dataframe):
    if dataframe is not None:
        recommendations=dataframe.to_dict("records")
        for recipe in recommendations:
            recipe['RecipeIngredientParts'] = re.findall(r'"([^"]*)"', recipe['RecipeIngredientParts'])
            recipe['RecipeInstructions'] = re.findall(r'"([^"]*)"', recipe['RecipeInstructions'])
        return recommendations
    else:
        return None