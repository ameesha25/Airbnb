// import prisma from "@/app/libs/prismadb";

// export interface IListingParams{
//     userId?:string;
//     guestCount?:number;
//     roomCount?:number;
//     bathroomCount?:string;
//     startDate?:string;
//     endDate?:string;
//     locationValue?:string;
//     category?:string;
// }

// export default async function getListings(
//     params : IListingParams
// ){
    
//     try{

//         const { 
//             userId,
//             roomCount,
//             guestCount,
//             bathroomCount,
//             locationValue,
//             startDate,
//             endDate,
//             category
//          } = params;

//         const query: Record<string, unknown> = {}; 
        

//         if(userId){
//             query.userId=userId;
//        }
//        if(category){
//         query.category=category;
//        }
//        if(roomCount){
//         query.roomCount={
//             gte:+roomCount
//         }
//        }

//        if(guestCount){
//         query.guestCount={
//             gte:+guestCount
//         }
//        }

//        if(bathroomCount){
//         query.bathroomCount={
//             gte:+bathroomCount
//         }
//        }


//        if(locationValue){
//         query.locationValue=locationValue;
//        }

//        if(startDate && endDate){
//         query.NOT={
//             reservations:{
//                 some:{
//                     OR:[{
//                         endDate:{gte: startDate},
//                         startDate:{ lte:startDate}
//                     },
//                     {
//                         startDate: {lte: endDate},
//                         endDate:{gte: endDate}
//                     }
//                 ]
//                 }
//             }
//         }
//        }



//     const listings=await prisma.listing.findMany({
//             where:query,
//             orderBy:{
//                 createdAt:'desc'
//             }
//         });

//         const safeListings = listings.map((listing)=>({
//             ...listing,
//             createdAt:listing.createdAt.toISOString(),

//         }));

//         return safeListings;

//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             throw new Error(error.message);
//         }
//         throw new Error("An unknown error occurred");
//     }
// }
import prisma from "@/app/libs/prismadb";

export interface IListingParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getListings(
    params: IListingParams
) {
    try {
        const {
            userId,
            roomCount,
            guestCount,
            bathroomCount,
            locationValue,
            startDate,
            endDate,
            category
        } = params;

        // CORRECTED: Changed 'let' to 'const' and kept 'any' to match your code's intent
        // while satisfying the linter. A more specific type could be Record<string, any>.
        const query: any = {};

        if (userId) {
            query.userId = userId;
        }
        if (category) {
            query.category = category;
        }
        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }
        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }
        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }
        if (locationValue) {
            query.locationValue = locationValue;
        }
        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            }
                        ]
                    }
                }
            }
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;

    } catch (error: unknown) { // CORRECTED: Changed 'any' to 'unknown' for safer error handling
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred");
    }
}