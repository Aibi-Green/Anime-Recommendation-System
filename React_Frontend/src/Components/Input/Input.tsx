import "./Input.css";
import { useEffect, useState } from "react";
import Results from '../Results/Results'

const Input = () => {
  // Defines what fields form has
  const [formData, setFormData] = useState({
    weight: 0,
    height: 0,
    age: 0,
    gender: "",
    currentCondition: 0,
    activityLevel: 0,
    foodAllergies: "",
  });
  const [res, setRes] = useState({
    output: [],
    img_url: []
  })
  const [bmr, setBMR] = useState(0)
  const [calorie, setCalorie] = useState(0)
  const [actWeights] = useState([1.375, 1.55, 1.725, 1.9])

  useEffect(() => {
    if (formData.gender == "male") {
      setBMR((
        (10 * formData.weight) +
        (6.25 * formData.height) -
        (5 * formData.age)) + 5)
    } else {
      setBMR((
        (10 * formData.weight) +
        (6.25 * formData.height) -
        (5 * formData.age)) - 161)
    }
  }, [formData])

  useEffect(() => {
    setCalorie(bmr * actWeights[formData.activityLevel])
  }, [formData, bmr, actWeights])

  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Handle input field changes and apply change to formdata
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> |
    React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  async function sendRequest() {
    try {
      const requestBody = {
        nutrition_input: [
          calorie,
          getRandomNumber(25, 80),
          getRandomNumber(0, 13),
          getRandomNumber(25, 100),
          getRandomNumber(150, 1000),
          getRandomNumber(25, 200),
          getRandomNumber(20, 40),
          getRandomNumber(10, 30),
          getRandomNumber(25, 200)
        ],
        params: {
          n_neighbors: 5,
          return_distance: "False"
        }
      }

      const response = await fetch("http://localhost:8081/predict/", {
        method: 'POST',
        headers: {
          'Content-Type': `application/json`,
        },
        body: JSON.stringify(requestBody)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const res = await response.json()

      console.log(res);
      setRes(res)

    } catch (e) {
      console.log("Failed to retrieve data.\n", e);
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // prevents page from refreshing
    e.preventDefault();

    if (formData.weight > 0 && formData.height > 0 &&
      formData.gender.length > 0 && formData.age > 0 &&
      formData.activityLevel > 0
    ) {
      // check formdata in console
      console.log('Form data submitted:', formData);

      // Send request
      sendRequest()
    } else {
      alert("Please fill all required fields")
    }
  };

  return (<>
    <div className='input'>
      <div className='input-text'>
        <h1>Input</h1>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</p>
        <p>
          weight: {formData.weight} <br />
          height: {formData.height} <br />
          gender: {formData.gender || "-"} <br />
          age: {formData.age} <br />
          activityLevel: {formData.activityLevel} <br />
          currentCondition: {formData.currentCondition} <br />
          BMR: {bmr} <br />
          calorie: {calorie} <br />
        </p>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='formLeft'>
            <label htmlFor="weight">Weight:</label>
            <input type="number" step="any" id="weight" name="weight" min="0" placeholder="kg"
              value={formData.weight}
              onChange={(e) => handleChange(e)}
            /><br />

            <label htmlFor="height">Height:</label>
            <input type="number" step="any" id="height" name="height" min="0" placeholder="cm"
              value={formData.height}
              onChange={(e) => handleChange(e)}
            /><br />

            <label htmlFor="gender">Gender:</label>
            <fieldset
            >
              <input type="radio" id="male" name="gender" value="male"
                checked={formData.gender === "male"}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="male">Male</label>
              <input type="radio" id="female" name="gender" value="female"
                checked={formData.gender === "female"}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="female">Female</label>
            </fieldset><br />
          </div>

          <div className='formRight'>
            <label htmlFor="age">Age:</label>
            <input type="number" id="age" name="age" min="0"
              value={formData.age}
              onChange={(e) => handleChange(e)}
            /><br />

            <label htmlFor="activityLevel">Activity Level:</label>
            <select id="activityLevel" name="activityLevel"
              value={formData.activityLevel}
              onChange={(e) => handleChange(e)}
            >
              <option value="0">Select an option</option>
              <option value="1">Little or No exercise</option>
              <option value="2">Light Exercise/sports 1-3 days/week</option>
              <option value="3">Moderate exercise/sports 3-5 days/week</option>
              <option value="4">Hard exercise/sports 6-7 days a week</option>
              <option value="5">Very hard exercise/sports & physical job or 2x training</option>
            </select><br />

            <label htmlFor="currentCondition">Current Condition:</label>
            <select id="currentCondition" name="currentCondition"
              value={formData.currentCondition}
              onChange={(e) => handleChange(e)}
            >
              <option value="0">Select an option</option>
              <option value="1">asdas</option>
              <option value="2">asdasd</option>
              <option value="3">asdasd</option>
            </select><br />

            {/* <label htmlFor="allergies">Allergies:</label>
            <select id="allergies" name="foodAllergies"
              // value={formData.foodAllergies}
              // onChange={(e) => handleChange(e)}
            >
              <option value="0">Select an option</option>
              <option value="1">None</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select><br /> */}
          </div>
          <button type="submit">Generate submit</button>
        </form>
      </div>
    </div>
    {/* <Results recommendations={recs} calorie={Math.ceil(calorie)} bmr={Math.ceil(bmr)} /> */}
    <Results response={{output: res.output, img_urls: res.img_url}} />

  </>);
}

export default Input;
