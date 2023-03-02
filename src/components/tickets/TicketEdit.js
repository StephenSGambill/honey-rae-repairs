import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState
 } from "react"

export const TicketEdit = () => {
    const [ticket, updateTicket] = useState({
        description: "",
        emergency: false,
    })
    const { ticketId } = useParams()
    const navigate = useNavigate()
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets?&id=${ticketId}`)
            .then((response) => response.json())
            .then((data) =>{
                const singleTicket = data[0]
                updateTicket(singleTicket)
            })
            
        }, []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        return fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"

            },
            //change string to JSON object
            body: JSON.stringify(ticket)
        })
            .then(response => response.json())
            .then(() => {
                //go to (route) ticket portion to page
                navigate("/tickets")
            })
        }



    return (
        <form className="ticketForm">
            <h2 
            className="ticketForm__title">Edit Service Ticket #{ticket.id}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">
                        Description:</label>
                        <input 
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={ticket.description}
                        onChange={
                            (evt) => {
                                const copy={...ticket}
                                copy.description = evt.target.value
                                updateTicket(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox" checked={ticket.emergency}
                        value={ticket.emergency}
                        onChange={
                            (evt) => {
                                const copy = {...ticket}
                                copy.emergency = evt.target.checked
                                updateTicket(copy)
                            }
                        } />
                </div>
            </fieldset>

            <button 
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
                Submit Revised Ticket
            </button>
            </form>
        
    )
    }
