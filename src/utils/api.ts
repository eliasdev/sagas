/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosRequestConfig } from 'axios';

export default async({...config }:AxiosRequestConfig)=>{
    // Return axios object
    return await axios({
        // Add configuration
        ...config,
        // Prepend base URL if relative URL has been provided
        // url:`http://localhost:4000${url}`,
        // Handle haeders
        
        // headers: {
            // Pass headers
            // ...headers,
            // Add authorization header
        // }
    })
}