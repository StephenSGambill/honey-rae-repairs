import { TicketSearch } from "./TicketSearch"
import { TicketList } from "./TicketList"
import { useState } from "react"

//this is a parent component with two children, to create a prop so that the two children can share state
export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    //first example of a prop, using TicketContainer as parent and TicketSearch/TicketList as sibling children
    
    return <>
        {/*Steve said this is really an equivalent of key:value pair  */}
        <TicketSearch setterFunction={setSearchTerms}/>
        <TicketList searchTermsState={searchTerms} />
        </>
}