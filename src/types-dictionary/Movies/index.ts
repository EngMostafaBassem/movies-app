import { Genre } from "./genre"

export type Movie={
    _id:string,
    title:string,
    genre:Genre
    numberInStock:number,
    dailyRentalRate:number,
    publishDate?:string,
    liked?:boolean 
}