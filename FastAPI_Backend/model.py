'''
KNN model: content-based filtering
'''
import numpy as np
import re, requests
from bs4 import BeautifulSoup
from urllib.parse import quote

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
        recommendations = dataframe.iloc[pipeline.transform(_input)[0]]
        
        if(recommendations.shape[0] == parameters['n_neighbors']):
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
    
def get_img_url(searchTerm):
    NotFound = "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
    try:
        # formats {] in string to the searchTerm}
        searchUrl = "https://www.google.com/search?q={}&site=webhp&tbm=isch".format(quote(searchTerm))
        
        # sends a get request using the search url and 
        # retrieves the content of the response as a Unicode string
        d = requests.get(searchUrl).text
        
        # create a beautiful soup object from the HTML content 'd'
        # using the specified parser
        soup = BeautifulSoup(d, 'html.parser') # im assuming d is the whole site
        
        # retrieve all img elements
        img_tags = soup.find_all('img')
        img_urls = []
        for img in img_tags:
            src = img.get('src')  # Use .get() to safely access attributes
            if src and src.startswith("https"):  # Check if src is not None before accessing
                img_urls.append(src)
        
        return(img_urls[0])
    except:
        return NotFound