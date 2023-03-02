import { useState, useEffect } from "react"
import { Customer } from "./Customer"
import "./CustomerList.css"


export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
         fetch(`http://localhost:8088/users?isStaff=false`)
            .then(response => response.json())
            .then((customersArray)=> {
                setCustomers(customersArray)
            })
        },
        []
    )
        
    return <article className="customers">
        {
        customers.map(customer => 
        <Customer 
        key={`customer--${customer.id}`}
        id={customer.id} 
        fullName={customer.fullName} 
        email={customer.email} />)
    }
    </article>
}