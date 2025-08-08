import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentuser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";
import TripsClient from "./TripsClient";

const TripsPage=async()=>{
    const currentUser= await getCurrentuser();

    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState
                title="Unauthorized"
                subtitle="Please login"
                />
            </ClientOnly>      
        )
    }
    const reservations =await getReservations({
        userId: currentUser.id
    });

    if(reservations.length===0){
        return(
            <ClientOnly>
                <EmptyState
                title="No Trips Found"
                subtitle="Looks like you have not reserved any trips"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <TripsClient
            reservations={reservations}
            currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default TripsPage;