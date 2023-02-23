import { useState, useEffect } from "react"
import "./EmployeeList.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
         fetch(`http://localhost:8088/users?isStaff=true`)
            .then(response => response.json())
            .then((employeeArray)=> {
                setEmployees(employeeArray)
            })
        },
        []
    )
        
    return <article className="employees">
    {
        
        employees.map(employee => {
            return <section className="employee" key={`employee--${employee.id}`}>
                <div>Name: {employee.fullName}</div>
                <div>Email: {employee.email}</div>
            </section>
        })
    }
    </article>
}