import requests, json
import random as rnd

class Generator:
    def generate(self, nutrition_input):
        request={
            'nutrition_input':nutrition_input,
            'params': {
                'n_neighbors': 5,
                'return_distance': False
            }
        }
        response=requests.post(
            url='http://backend:8081/predict/',
            data=json.dumps(request))
        
        return response