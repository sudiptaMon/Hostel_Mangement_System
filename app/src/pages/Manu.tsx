import ManueTable from "../components/ManueTable"
import Navigation from "../components/Navigation"

export default function Manu(){
    return(
        <>
        <Navigation/>
        <div className="container">
            <ManueTable/>
            <ManueTable/>
        </div>
        </>
    )
}