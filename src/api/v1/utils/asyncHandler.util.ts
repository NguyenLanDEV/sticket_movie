import { NextFunction, Request, Response } from "express"

export function asyncHandlerHelper(fn: Function){
   return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch((err: any )=> next(err))
   }
}

