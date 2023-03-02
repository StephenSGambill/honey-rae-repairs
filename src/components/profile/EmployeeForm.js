import { useEffect, useState } from "react"


export const EmployeeForm = () => {

    const [profile, updateProfile] = useState({
        specialty: "",
        rate: 0,
        userId: 0
    })
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])



    useEffect(() => {
        fetch(`http://localhost:8088/employees?userId=${honeyUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                const employeeObject = data[0]
                updateProfile(employeeObject)
            })
    },
        []
    )


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/employees/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("Employee profile successfully saved")
            })
           
    }

    return (

        <form className="profile">
            <h2 className="profile__title">Employee Profile</h2>

            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.specialty}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.specialty = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="rate">Hourly rate:</label>
                    <input type="number"
                        className="form-control"
                        value={profile.rate}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.rate = parseFloat(evt.target.value, 2)
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    )
}