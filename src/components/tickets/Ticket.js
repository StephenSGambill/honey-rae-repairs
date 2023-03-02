import { Link } from "react-router-dom"
import "./Tickets.css"

export const Ticket = ({ ticketObject, currentUser, employees, getAllTickets }) => {

    let assignedEmployee = null

    if (ticketObject.employeeTickets.length > 0) {
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }

    const userEmployee = employees.find(employee => employee.userId === currentUser.id)


    const buttonOrNoButton = () => {
        if (currentUser.staff) {
            return <button
                onClick={() => {
                    fetch(`http://localhost:8088/employeeTickets`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            employeeId: userEmployee.id,
                            serviceTicketId: ticketObject.id
                        })

                    })
                        .then(response => response.json())
                        .then(() => {
                            //re-renders tickets on page; passed in prop above to TicketList.js function
                            getAllTickets()
                        })
                }}

            >Claim</button>
        } else {
            return ""
        }
    }

    const canClose = () => {
        if (userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted === "") {
            return <button onClick={closeTicket} className="ticket__finish">Finish</button>
        } else {
            return ""
        }
    }

    const closeTicket = () => {
        const copy = {
            userId: ticketObject.userId,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date()
        }

        return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
            .then(response => response.json())
            .then(getAllTickets)
    }


    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button onClick={() => {
                return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        getAllTickets()
                    })

            }} className="ticket__delete">Delete</button>

        } else {
            return ""
        }
    }

    
    return <section className="ticket">
        <header>
            {
                currentUser.staff
                    ? <h3>Ticket #{ticketObject.id}</h3>
                    : <Link to={`/tickets/${ticketObject.id}/edit`}><h3>Ticket #{ticketObject.id}</h3></Link>
            }
        </header>
        <div className="descriptionBox">
            <section >{ticketObject.description}</section>
            <section>Emergency: {ticketObject.emergency ? "🧨" : "No"}</section>
        </div>

        <footer>
            {
                ticketObject.employeeTickets.length
                    //if the length is > 0, then a ticket is found and assigned, so display name
                    ? `Currently being worked on ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                    //if it is 0 length, then there is no assignment, show CLAIM button, and when clicked POST a new employeeTicket with proper data
                    : buttonOrNoButton()
            }

            {canClose()}
            {deleteButton()}

        </footer>
    </section>
}