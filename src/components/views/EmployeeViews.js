import { Outlet, Route, Routes } from "react-router-dom"
import { TicketContainer } from "../tickets/TicketContainer"
import { EmployeeList } from "../employees/EmployeeList"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { Profile } from "../profile/Profile"

export const EmployeeViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>
                {/* this is a parent element for two children */}
                <Route path="tickets" element={<TicketContainer />} />
                <Route path="employees" element={<EmployeeList />} />
                <Route path="employees/:employeeId" element={<EmployeeDetails />} />
                <Route path="profile" element={<Profile/>} />
                
                
                
            </Route>
        </Routes>
    )
}