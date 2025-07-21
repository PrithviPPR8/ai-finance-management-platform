import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ 
    id: "Wealth", 
    name: "Wealth", 
    retryFunction: async (attempt: any) => ({
        delay: Math.pow(2, attempt) * 1000,  //Exponential Backoff
        maxAttempts: 2
    })

});