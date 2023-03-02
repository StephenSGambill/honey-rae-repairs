import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Ticket } from "./Ticket"
import "./Tickets.css"


export const TicketList = ({ searchTermsState }) => {
    const [tickets, setTickets] = useState([])
    const [employees, setEmployees] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermsState.toLowerCase())
            })
                setFiltered(searchedTickets)
        },
        [ searchTermsState ]
    )

//The WHOLE PURPOSE of _useEffect_ is to observe the present state of something and do something every time it changes

    //fills a new ticketArray variable using fetch at the localhost database for serviceTickets
    //pulls permanant state into transient state for usablility
    //this changes tickets (local transient state) equal to all the tickets in the API database
    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
                .then(response => response.json())
                .then((ticketArray) => {
                    setTickets(ticketArray)
                })
                
            fetch(`http://localhost:8088/employees?_expand=user`)
                .then(response => response.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
        // When array is not empty, it is the target state variable
        
    )


    //checks whether logged in user is staff
    //if true, then set filtered to all the tickets
    useEffect(
        () => {
            if (honeyUserObject.staff) {
                //For employees
                setFiltered(tickets)
            }
    //if false (not a staff), then filter all tickets by user id and set filtered to those tickets
            else {
                //For customers
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [tickets]

    )

    //check to see if it in an emergency (default = false)
    //if it is, then fiter tickets into an array of emergency tickets and set filtered tickets to emergency tickets
    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            }
    //if not, then set filtered tickets to all tickets 
            else {
                setFiltered(tickets)
            }
        },
        [emergency]
    )
 

    //check to see if open (default = false)
    //if it is, then filter all tickets into filtered array
    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
                })
                setFiltered(openTicketArray)
            }
    //if not, then set my tickets to specific user using local storage (in browser from login)
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [openOnly]
    )

    // generate JSX to dispay on current page
    // abbreviated if/else statement to check if staff and display appropriate buttons
    //buttons display before list of tickets
    //if staff, then buttons use to view only emergencies or all
    //if not staff, then buttons to create a new ticket, show only user open tickets, and show all user's tickets
    return <>
        {
            honeyUserObject.staff
                ? <> 
                    <button onClick={() => { setEmergency(true) }} >Emergency Only</button>
                    <button onClick={() => { setEmergency(false) }} >Show all</button>
                </>
                : <>
                    <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                    <button onClick={() => updateOpenOnly(true)}>Open Tickets</button>
                    <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
                </>

        }

        <h2>List of Tickets</h2>

        <article className="tickets">
            {
                filteredTickets.map(
                    (ticket) => <Ticket employees={employees} isStaff={honeyUserObject.staff} ticketObject={ticket} key={ticket.id}/>
                )
            }
        </article>
    </>
}
