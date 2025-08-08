import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import ReservationClient from "./ReservationsClient";

import getCurrentuser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";

const ReservationPage=async()=>{
  const currentUser=await getCurrentuser();

  if(!currentUser){
    return (
        <ClientOnly>
            <EmptyState
            title="unauthorized"
            subtitle="Please Login"
            />
        </ClientOnly>
    );
  }
  const reservations =await getReservations({
    authorId: currentUser.id
  });
  console.log("Fetched reservations:", reservations);
console.log("author ID:", currentUser.id);


if(reservations.length===0){
    return(
        <ClientOnly>
            <EmptyState
            title="No reservation found"
            subtitle="Looks like you have no reservations on your properties"
            />
        </ClientOnly>
    )
 }
   return (
    <ClientOnly>
        <ReservationClient
        reservations={reservations}
        currentUser={currentUser}
        />
    </ClientOnly>
   )
 
  
};






export default ReservationPage;