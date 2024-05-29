import { useState } from "react";
import "./Results.css";

interface Recommendations {
  Calories: number;
  CarbohydrateContent: number;
  CholesterolContent: number;
  CookTime: string;
  FatContent: number;
  FiberContent: number;
  Name: string;
  PrepTime: string;
  ProteinContent: number;
  RecipeIngredientParts: string[];
  RecipeInstructions: string[];
  SaturatedFatContent: number;
  SodiumContent: number;
  SugarContent: number;
  TotalTime: string;
}

interface Props {
  response: {
    output: Recommendations[]
    img_urls: string[]
  }
}

const Card = (props: Props) => {
  const [isToggled, setIsToggled] = useState(false)

  const handleToggle = () => {
    setIsToggled(!isToggled)
    console.log("toggle", isToggled);
    console.log(props.response);
  }

  const listItems = props.response.output.map((m, i) => {
    return (
      <div className="card" key={i}>
        <div className="card-img">
          <img src={props.response.img_urls[i]}></img>
        </div>
        <div className="meal-name">{m.Name}</div>
        <div className={!isToggled ? "hidden cal-sub" : "cal-sub"}>
          {m.Calories}
        </div>
        <table className={isToggled ? "hidden" : ""}>
          <thead>
            <tr>
              <th>Names</th>
              <th>Values</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Calories</td>
              <td>{m.Calories}</td>
            </tr>
            <tr>
              <td>Carbohydrate</td>
              <td>{m.CarbohydrateContent}</td>
            </tr>
            <tr>
              <td>Cholesterol</td>
              <td>{m.CholesterolContent}</td>
            </tr>
            <tr>
              <td>Fat</td>
              <td>{m.FatContent}</td>
            </tr>
            <tr>
              <td>Fiber</td>
              <td>{m.FiberContent}</td>
            </tr>
            <tr>
              <td>Protein</td>
              <td>{m.ProteinContent}</td>
            </tr>
            <tr>
              <td>Cholesterol</td>
              <td>{m.CholesterolContent}</td>
            </tr>
            <tr>
              <td>Saturated Fat</td>
              <td>{m.SaturatedFatContent}</td>
            </tr>
            <tr>
              <td>Sodium</td>
              <td>{m.SodiumContent}</td>
            </tr>
            <tr>
              <td>Sugar</td>
              <td>{m.SugarContent}</td>
            </tr>
            <tr>
              <td>Preparation Time</td>
              <td>{m.PrepTime}</td>
            </tr>
            <tr>
              <td>Cooking Time</td>
              <td>{m.CookTime}</td>
            </tr>
            <tr>
              <td>Total Time</td>
              <td>{m.TotalTime}</td>
            </tr>
            <tr>
              <td>Ingredients:</td>
              <td>{m.RecipeIngredientParts.join(", ")}</td>
            </tr>
            <tr>
              <td>Instructions:</td>
              <td>{m.RecipeInstructions}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  })

  return (
    <div className="results">
      <div className="results-header">
        <h1>Recommended Meals</h1>
        <button
          type="button"
          onClick={handleToggle}
        >
          Show Ingredients and Recipes
        </button>
      </div>

      <div className="grid-container">
        {listItems}
      </div>
    </div>
  )
}

export default Card