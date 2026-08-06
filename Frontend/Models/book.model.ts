export interface Book {
    bookId: number;
    userId: number;
    read: boolean;
    title: string;
    author: string
}

export interface AddBookRequest {
    Title: string;
    Author: string;
    Read: boolean;}

export interface UpdateBookReq{
  Id: number,
  Title: string,
  Author: string,
  Read: boolean;
}