import { Link } from "react-router-dom"
import { CustomerDetails } from "./CustomerDetails"




export const Customer = ({id, fullName, email}) => {
    return <section className="customer" >
       <Link to={`/customers/${id}`}>Name: {fullName}</Link>
        <div>Email: {email}</div>
    </section>
}