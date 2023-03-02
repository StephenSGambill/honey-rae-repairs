import { Link } from "react-router-dom"



export const Employee = ({id, fullName, email}) => {
    return <section className="employee" >
       <Link to={`/employees/${id}`}>Name: {fullName}</Link>
        <div>Email: {email}</div>
    </section>
}