/* eslint-disable react/prop-types */
import { useState } from "react";

const Results = (props) => {
  const [isToggled, setIsToggled] = useState(true)

  const handleToggle = () => {
    setIsToggled(!isToggled)
  }

  const listItems = props.response.output.map((m, i) => {
    return (
      <div className="card" key={i}>
        <div className="card-img">
          <img src={props.response.img_urls[i]}></img>
        </div>
        <div className="card-desc">
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
              <td>{m.RecipeIngredientParts.join("; ")}</td>
            </tr>
            <tr>
              <td>Instructions:</td>
              <td>{m.RecipeInstructions}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    )
  })

  return (
    <div className="results">
      <div className="results-header">
        <h1>Results</h1>
        <p>
          Your BMI is <span className="bold">{props.response.bmi.toFixed(1)}</span>
        </p>

        <h2>Recommended Meals</h2>
        <hr className="mb-10 opacity-5 mx-32"></hr>

        <button
          className="recommend"
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

export default Results