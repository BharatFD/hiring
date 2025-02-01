import { PrismaClient } from "@prisma/client";

class PrismaSingleton {
    private static instance:PrismaClient;

    private constructor(){}
    
    public static getInstance(): PrismaClient {
        if(!PrismaSingleton.instance){
            PrismaSingleton.instance = new PrismaClient();
        }
        return PrismaSingleton.instance;
    }
}

export default PrismaSingleton;