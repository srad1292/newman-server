import { Router } from "express";

export default interface RouteController {
    router: Router;

    initializeRoutes(): void;
}