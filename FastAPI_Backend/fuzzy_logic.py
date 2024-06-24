import numpy as np
# !pip install -U scikit-fuzzy matplotlib
import skfuzzy as fuzz
from skfuzzy import control as ctrl
    
def fuzzy(i):
    # Define Fuzzy sets for input variables
    bmi = ctrl.Antecedent(np.arange(0, 41, 1), 'bmi')
    age = ctrl.Antecedent(np.arange(0, 101, 1), 'age')
    pal = ctrl.Antecedent(np.arange(0, 5, 1), 'pal')

    # Define Fuzzy sets for output variables
    calories = ctrl.Consequent(np.arange(0, 601, 1), 'calories')
    fat = ctrl.Consequent(np.arange(0, 41, 1), 'fat')
    fat_saturated = ctrl.Consequent(np.arange(0, 31, 1), 'fat_saturated')
    cholesterol = ctrl.Consequent(np.arange(0, 101, 1), 'cholesterol')
    sodium = ctrl.Consequent(np.arange(0, 501, 1), 'sodium')
    carbohydrate = ctrl.Consequent(np.arange(0, 51, 1), 'carbohydrate')
    fiber = ctrl.Consequent(np.arange(0, 31, 1), 'fiber')
    sugar = ctrl.Consequent(np.arange(0, 51, 1), 'sugar')
    protein = ctrl.Consequent(np.arange(0, 41, 1), 'protein')

    # Define fuzzy membership functions for inputs
    bmi['underweight'] = fuzz.trimf(bmi.universe, [0, 0, 18.5])
    bmi['normal'] = fuzz.trimf(bmi.universe, [18.5, 21.5, 24.9])
    bmi['overweight'] = fuzz.trimf(bmi.universe, [25.0, 27.5, 29.9])
    bmi['obesity'] = fuzz.trimf(bmi.universe, [30.0, 35.0, 40.0])

    age['young'] = fuzz.trimf(age.universe, [0, 0, 21])
    age['adult'] = fuzz.trimf(age.universe, [18, 35, 55])
    age['old'] = fuzz.trimf(age.universe, [50, 75, 100])

    pal['low'] = fuzz.trimf(pal.universe, [0, 0, 2])
    pal['medium'] = fuzz.trimf(pal.universe, [1, 2, 3])
    pal['high'] = fuzz.trimf(pal.universe, [2, 4, 4])

    # Define fuzzy membership functions for outputs
    calories['low'] = fuzz.trimf(calories.universe, [0, 150, 350])
    calories['medium'] = fuzz.trimf(calories.universe, [300, 450, 525])
    calories['high'] = fuzz.trimf(calories.universe, [450, 525, 600])

    fat['low'] = fuzz.trimf(fat.universe, [0, 10, 20])
    fat['medium'] = fuzz.trimf(fat.universe, [15, 20, 30])
    fat['high'] = fuzz.trimf(fat.universe, [25, 30, 40])

    fat_saturated['low'] = fuzz.trimf(fat_saturated.universe, [0, 10, 15])
    fat_saturated['medium'] = fuzz.trimf(fat_saturated.universe, [10, 15, 20])
    fat_saturated['high'] = fuzz.trimf(fat_saturated.universe, [15, 25, 30])

    cholesterol['low'] = fuzz.trimf(cholesterol.universe, [0, 25, 50])
    cholesterol['medium'] = fuzz.trimf(cholesterol.universe, [30, 50, 75])
    cholesterol['high'] = fuzz.trimf(cholesterol.universe, [50, 75, 100])

    sodium['low'] = fuzz.trimf(sodium.universe, [0, 100, 250])
    sodium['medium'] = fuzz.trimf(sodium.universe, [150, 250, 400])
    sodium['high'] = fuzz.trimf(sodium.universe, [300, 400, 500])

    carbohydrate['low'] = fuzz.trimf(carbohydrate.universe, [0, 10, 20])
    carbohydrate['medium'] = fuzz.trimf(carbohydrate.universe, [15, 25, 35])
    carbohydrate['high'] = fuzz.trimf(carbohydrate.universe, [30, 40, 50])

    fiber['low'] = fuzz.trimf(fiber.universe, [0, 5, 15])
    fiber['medium'] = fuzz.trimf(fiber.universe, [10, 15, 25])
    fiber['high'] = fuzz.trimf(fiber.universe, [20, 25, 30])

    sugar['low'] = fuzz.trimf(sugar.universe, [0, 10, 20])
    sugar['medium'] = fuzz.trimf(sugar.universe, [15, 25, 35])
    sugar['high'] = fuzz.trimf(sugar.universe, [30, 40, 50])

    protein['low'] = fuzz.trimf(protein.universe, [0, 10, 20])
    protein['medium'] = fuzz.trimf(protein.universe, [15, 20, 30])
    protein['high'] = fuzz.trimf(protein.universe, [25, 30, 40])

    # Define fuzzy rules
    rule1 = ctrl.Rule(age['young'] & bmi['underweight'] & pal['low'], 
                    (calories['high'], fat['medium'], fat_saturated['medium'], 
                    cholesterol['medium'], sodium['medium'], carbohydrate['high'], 
                    fiber['high'], sugar['low'], protein['high']))
    rule2 = ctrl.Rule(age['young'] & bmi['normal'] & pal['low'], 
                    (calories['medium'], fat['medium'], fat_saturated['low'], 
                    cholesterol['low'], sodium['low'], carbohydrate['medium'], 
                    fiber['high'], sugar['medium'], protein['medium']))
    rule3 = ctrl.Rule(age['young'] & bmi['overweight'] & pal['low'], 
                    (calories['low'], fat['low'], fat_saturated['low'], 
                    cholesterol['low'], sodium['low'], carbohydrate['low'], 
                    fiber['high'], sugar['low'], protein['low']))
    rule3 = ctrl.Rule(age['young'] & bmi['obesity'] & pal['low'], 
                    (calories['low'], fat['low'], fat_saturated['low'], 
                    cholesterol['low'], sodium['low'], carbohydrate['low'], 
                    fiber['high'], sugar['low'], protein['low']))

    rule4 = ctrl.Rule(age['adult'] & bmi['underweight'] & pal['low'], 
                    (calories['high'], fat['high'], fat_saturated['medium'], 
                    cholesterol['medium'], sodium['medium'], carbohydrate['high'], 
                    fiber['high'], sugar['low'], protein['high']))
    rule5 = ctrl.Rule(age['adult'] & bmi['normal'] & pal['low'], 
                    (calories['medium'], fat['medium'], fat_saturated['low'], 
                    cholesterol['low'], sodium['low'], carbohydrate['medium'], 
                    fiber['medium'], sugar['medium'], protein['medium']))
    rule6 = ctrl.Rule(age['adult'] & bmi['overweight'] & pal['low'], 
                    (calories['low'], fat['low'], fat_saturated['low'], 
                    cholesterol['low'], sodium['low'], carbohydrate['low'], 
                    fiber['high'], sugar['low'], protein['low']))
    rule7 = ctrl.Rule(age['adult'] & bmi['obesity'] & pal['low'], 
                    (calories['low'], fat['low'], fat_saturated['low'], 
                    cholesterol['low'], sodium['low'], carbohydrate['low'], 
                    fiber['high'], sugar['low'], protein['low']))

    rule8 = ctrl.Rule(age['old'] & bmi['underweight'] & pal['low'], 
                    (calories['high'], fat['high'], fat_saturated['medium'], 
                    cholesterol['medium'], sodium['medium'], carbohydrate['high'], 
                    fiber['high'], sugar['low'], protein['high']))
    rule9 = ctrl.Rule(age['old'] & bmi['normal'] & pal['low'], 
                    (calories['medium'], fat['medium'], fat_saturated['low'], 
                    cholesterol['low'], sodium['low'], carbohydrate['medium'], 
                    fiber['medium'], sugar['medium'], protein['medium']))
    rule10 = ctrl.Rule(age['old'] & bmi['overweight'] & pal['low'], 
                    (calories['low'], fat['low'], fat_saturated['low'], 
                        cholesterol['low'], sodium['low'], carbohydrate['low'], 
                        fiber['high'], sugar['low'], protein['low']))
    rule11 = ctrl.Rule(age['old'] & bmi['obesity'] & pal['low'], 
                    (calories['low'], fat['low'], fat_saturated['low'], 
                        cholesterol['low'], sodium['low'], carbohydrate['low'], 
                        fiber['high'], sugar['low'], protein['low']))


    rule12 = ctrl.Rule(age['young'] & bmi['underweight'] & pal['medium'], 
                    (calories['high'], fat['high'], fat_saturated['medium'], 
                        cholesterol['medium'], sodium['medium'], carbohydrate['high'], 
                        fiber['high'], sugar['low'], protein['high']))
    rule13 = ctrl.Rule(age['young'] & bmi['normal'] & pal['medium'], 
                    (calories['medium'], fat['medium'], fat_saturated['low'], 
                        cholesterol['low'], sodium['low'], carbohydrate['medium'], 
                        fiber['medium'], sugar['medium'], protein['medium']))
    rule14 = ctrl.Rule(age['young'] & bmi['overweight'] & pal['medium'], 
                    (calories['low'], fat['low'], fat_saturated['low'], 
                        cholesterol['low'], sodium['low'], carbohydrate['low'], 
                        fiber['high'], sugar['low'], protein['low']))
    rule15 = ctrl.Rule(age['young'] & bmi['obesity'] & pal['medium'], 
                    (calories['low'], fat['low'], fat_saturated['low'], 
                        cholesterol['low'], sodium['low'], carbohydrate['low'], 
                        fiber['high'], sugar['low'], protein['low']))

    rule16 = ctrl.Rule(age['adult'] & bmi['underweight'] & pal['medium'], 
                    (calories['high'], fat['high'], fat_saturated['medium'], 
                        cholesterol['medium'], sodium['medium'], carbohydrate['high'], 
                        fiber['high'], sugar['low'], protein['high']))
    rule17 = ctrl.Rule(age['adult'] & bmi['normal'] & pal['medium'], 
                    (calories['medium'], fat['medium'], fat_saturated['low'], 
                        cholesterol['low'], sodium['low'], carbohydrate['medium'], 
                        fiber['medium'], sugar['medium'], protein['medium']))
    rule18 = ctrl.Rule(age['adult'] & bmi['overweight'] & pal['medium'], 
                    (calories['low'], fat['low'], fat_saturated['low'], 
                        cholesterol['low'], sodium['low'], carbohydrate['low'], 
                        fiber['high'], sugar['low'], protein['low']))
    rule19 = ctrl.Rule(age['adult'] & bmi['obesity'] & pal['medium'], 
                    (calories['low'], fat['low'], fat_saturated['low'], 
                        cholesterol['low'], sodium['low'], carbohydrate['low'], 
                        fiber['high'], sugar['low'], protein['low']))

    rule20 = ctrl.Rule(age['old'] & bmi['underweight'] & pal['medium'], 
                    (calories['high'], fat['high'], fat_saturated['medium'], 
                        cholesterol['medium'], sodium['medium'], carbohydrate['high'], 
                        fiber['high'], sugar['low'], protein['high']))
    rule21 = ctrl.Rule(age['old'] & bmi['normal'] & pal['medium'], 
                    (calories['medium'], fat['medium'], fat_saturated['low'], 
                        cholesterol['low'], sodium['low'], carbohydrate['medium'], 
                        fiber['medium'], sugar['medium'], protein['medium']))
    rule22 = ctrl.Rule(age['old'] & bmi['overweight'] & pal['medium'], 
                    (calories['low'], fat['low'], fat_saturated['low'], 
                        cholesterol['low'], sodium['low'], carbohydrate['low'], 
                        fiber['high'], sugar['low'], protein['low']))
    rule23 = ctrl.Rule(age['old'] & bmi['obesity'] & pal['medium'], 
                    (calories['low'], fat['low'], fat_saturated['low'], 
                        cholesterol['low'], sodium['low'], carbohydrate['low'], 
                        fiber['high'], sugar['low'], protein['low']))


    rule24 = ctrl.Rule(age['young'] & bmi['underweight'] & pal['high'], 
                    (calories['high'], fat['high'], fat_saturated['medium'], 
                        cholesterol['medium'], sodium['medium'], carbohydrate['high'], 
                        fiber['high'], sugar['low'], protein['high']))
    rule25 = ctrl.Rule(age['young'] & bmi['normal'] & pal['high'], 
                    (calories['medium'], fat['medium'], fat_saturated['low'], 
                        cholesterol['low'], sodium['low'], carbohydrate['medium'], 
                        fiber['medium'], sugar['medium'], protein['medium']))
    rule26 = ctrl.Rule(age['young'] & bmi['overweight'] & pal['high'], 
                    (calories['low'], fat['low'], fat_saturated['low'], 
                        cholesterol['low'], sodium['low'], carbohydrate['low'], 
                        fiber['high'], sugar['low'], protein['low']))
    rule27 = ctrl.Rule(age['young'] & bmi['obesity'] & pal['high'], 
                    (calories['low'], fat['low'], fat_saturated['low'], 
                        cholesterol['low'], sodium['low'], carbohydrate['low'], 
                        fiber['high'], sugar['low'], protein['low']))

    rule28 = ctrl.Rule(age['adult'] & bmi['underweight'] & pal['high'], 
                    (calories['high'], fat['high'], fat_saturated['medium'], 
                        cholesterol['medium'], sodium['medium'], carbohydrate['high'], 
                        fiber['high'], sugar['low'], protein['high']))
    rule29 = ctrl.Rule(age['adult'] & bmi['normal'] & pal['high'], 
                    (calories['medium'], fat['medium'], fat_saturated['low'], 
                        cholesterol['low'], sodium['low'], carbohydrate['medium'], 
                        fiber['medium'], sugar['medium'], protein['medium']))
    rule30 = ctrl.Rule(age['adult'] & bmi['overweight'] & pal['high'], 
                    (calories['low'], fat['low'], fat_saturated['low'], 
                        cholesterol['low'], sodium['low'], carbohydrate['low'], 
                        fiber['high'], sugar['low'], protein['low']))
    rule31 = ctrl.Rule(age['adult'] & bmi['obesity'] & pal['high'], 
                    (calories['low'], fat['low'], fat_saturated['low'], 
                        cholesterol['low'], sodium['low'], carbohydrate['low'], 
                        fiber['high'], sugar['low'], protein['low']))

    rule32 = ctrl.Rule(age['old'] & bmi['underweight'] & pal['high'], 
                    (calories['high'], fat['high'], fat_saturated['medium'], 
                        cholesterol['medium'], sodium['medium'], carbohydrate['high'], 
                        fiber['high'], sugar['low'], protein['high']))
    rule33 = ctrl.Rule(age['old'] & bmi['normal'] & pal['high'], 
                    (calories['medium'], fat['medium'], fat_saturated['low'], 
                        cholesterol['low'], sodium['low'], carbohydrate['medium'], 
                        fiber['medium'], sugar['medium'], protein['medium']))
    rule34 = ctrl.Rule(age['old'] & bmi['overweight'] & pal['high'], 
                    (calories['low'], fat['low'], fat_saturated['low'],
                        cholesterol['low'], sodium['low'], carbohydrate['low'], 
                        fiber['high'], sugar['low'], protein['low']))
    rule35 = ctrl.Rule(age['old'] & bmi['obesity'] & pal['high'], 
                    (calories['low'], fat['low'], fat_saturated['low'], 
                        cholesterol['low'], sodium['low'], carbohydrate['low'], 
                        fiber['high'], sugar['low'], protein['low']))

    # Implement the fuzzy inference system
    diet_ctrl = ctrl.ControlSystem(
        [rule1, rule2, rule3, rule4, rule5, rule6, rule7, rule8, rule9, rule10, 
        rule11, rule12, rule13, rule14, rule15, rule16, rule17, rule18, rule19, 
        rule20, rule21, rule22, rule23, rule24, rule25, rule26, rule27, rule28,
        rule29, rule30, rule31, rule32, rule33, rule34, rule35])
    diet_simulation = ctrl.ControlSystemSimulation(diet_ctrl)
    
    diet_simulation.input['bmi'] = i[0]
    diet_simulation.input['age'] = i[1]
    diet_simulation.input['pal'] = i[2]
    diet_simulation.compute()
    macronutrients = diet_simulation.output.values()
    
    return macronutrients