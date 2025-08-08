import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import PropertiesClient from "./PropertiesClient";

import getCurrentuser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";

const PropertiesPage=async()=>{
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
    const listings =await getListings({
        userId: currentUser.id
    });

    if(listings.length===0){
        return(
            <ClientOnly>
                <EmptyState
                title="No Properties Found"
                subtitle="Looks like you have no properties"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <PropertiesClient
            listings={listings}
            currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default PropertiesPage;