import { useEffect, useState } from "react";

import Results from "../components/Results";

const SelfAssessment = () => {
  // Defines what fields form has
  const [formData, setFormData] = useState({
    weight: 50,
    height: 151,
    age: 23,
    gender: 1,
    currentCondition: "",
    activityLevel: 1,
    foodAllergies: "",
  });
  const [res, setRes] = useState({
    output: [],
    img_url: []
  })
  const [isToggle, setIsToggle] = useState(false)
  const [bmi, setBMI] = useState(0)

  useEffect(() => {
    setBMI(
      formData.weight/((formData.height/100)*(formData.height/100))
    )
  }, [formData])

  useEffect(() => {
    showResults()
  })

  function showResults() {
    const section = <Results response={{
      output: res.output,
      img_urls: res.img_url,
      bmi: bmi,
    }} />

    if (isToggle) {
      return section
    }
  }

  // Handle input field changes and apply change to formdata
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  async function sendRequest() {
    console.log({
      bmi: bmi.toFixed(1),
      age: formData.age,
      pal: Number(formData.activityLevel)-1 
    });

    try {
      const requestBody = {
        nutrition_input: [
          bmi.toFixed(1),
          formData.age,
          Number(formData.activityLevel)-1
        ],
        params: {
          n_neighbors: 6,
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
  const handleSubmit = (e) => {
    // prevents page from refreshing
    e.preventDefault();

    if (formData.weight > 0 && formData.height > 0 &&
      formData.gender > 0 && formData.age > 0 &&
      formData.activityLevel > 0
    ) {
      // check formdata in console
      console.log('Form data submitted:', formData);

      // Send request
      sendRequest()
      setIsToggle(true)
    } else {
      alert("Please fill all required fields")
    }
  };

  return (<>
    <div className='input'>
      <div className='input-text'>
        <h1>Input your information</h1>
        <p>Know how much calories you need to maintain your weight.</p>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="weight">Weight(kg)</label>
            <input type="number" step="any" id="weight" name="weight" min="0" placeholder="kg"
              value={formData.weight}
              onChange={(e) => handleChange(e)}
            />

            <label htmlFor="height">Height(cm)</label>
            <input type="number" step="any" id="height" name="height" min="0" placeholder="cm"
              value={formData.height}
              onChange={(e) => handleChange(e)}
            />

            {/* <label htmlFor="gender">Gender:</label>
              <fieldset
              >
                <div>
                  <input type="radio" id="male" name="gender" value="male"
                    checked={formData.gender === "male"}
                    onChange={(e) => handleChange(e)}
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div>
                  <input type="radio" id="female" name="gender" value="female"
                    checked={formData.gender === "female"}
                    onChange={(e) => handleChange(e)}
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </fieldset> */}

            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender"
              value={formData.gender}
              onChange={(e) => handleChange(e)}
            >
              <option value="0">Select an option</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>

            <label htmlFor="age">Age</label>
            <input type="number" id="age" name="age" min="0"
              value={formData.age}
              onChange={(e) => handleChange(e)}
            />

            <label htmlFor="activityLevel">Activity Level</label>
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
            </select>

            <label htmlFor="currentCondition">Food Allergies</label>
            <input type="text" id="currentCondition" name="currentCondition"
              value={formData.currentCondition}
              onChange={(e) => handleChange(e)}
            />

            {/* <label htmlFor="currentCondition">Current Condition</label>
            <select id="currentCondition" name="currentCondition"
              value={formData.currentCondition}
              onChange={(e) => handleChange(e)}
            >
              <option value="0">Select an option</option>
              <option value="1">Healthy</option>
              <option value="2">Cold</option>
              <option value="3">Fever</option>
              <option value="4">Pregnant</option>
              <option value="5">Chronic Illness</option>
            </select> */}

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
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>

    {showResults()}
  </>);
};

export default SelfAssessment;