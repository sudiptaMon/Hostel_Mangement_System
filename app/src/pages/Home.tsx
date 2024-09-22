import Navigation from "../components/Navigation";
import Details from "../components/Details";
import Services from "../components/Services";
import Footer from "../components/Footer";
import { userType, context } from "../App";
import { useContext } from "react";
type homeProp = {
  user: userType | null
}
function Home({ user }: homeProp) {
  let myContext = useContext(context);
  return (
    <div className="bg-[#dadef9] min-h-screen">
      <Navigation />
      <Details userDetails={user} />
      <div className="container mx-auto my-8 px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 bg-white p-6 rounded-lg shadow-lg">
          {myContext.isAdmin &&
            <Services service="New Entry" description="Add new user details." for="userentry" role={user?.role} />
          }
          <Services service="Gatepass" description="Apply your gate pass here." for="gatepass" role={user?.role} />
          <Services service="Mess Manu" description="What is the manu of today?" for="manu" role={user?.role} />
          <Services service="Fees" description="Details of your fees payments and due payments." for="fees" role={user?.role} />
          <Services service="Complaints" description="Register your complaints here." for="complaints" role={user?.role} />
          <Services service="Fine" description="What is the fine of today?" for="fine" role={user?.role} />

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
