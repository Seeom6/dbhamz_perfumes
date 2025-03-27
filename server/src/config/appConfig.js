import express from "express";
import cookieParser from "cookie-parser";

import morgan from "morgan";
import cors from "cors"

const corsOption = {
    origin: ["http://localhost:5173",'https://dbhamz.com' ], // Allow only this origin
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies and credentials
  }

export const appConfig = (app)=>{

    app.use(express.json());
    app.use(express.urlencoded({extended : true}));
    app.use(cookieParser());
    app.use(morgan("dev"));
    app.use("*",cors(corsOption));
}