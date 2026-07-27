export interface Book {
    BookId: number;
    UserId: number;
    Read: boolean;
    Title: string;
    Author: string
}

export interface AddBookRequest {
    title: string;
    author: string;
    read: boolean;}