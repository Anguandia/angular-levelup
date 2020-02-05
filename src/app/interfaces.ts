export interface Stock {
    id?: string;
    name: string;
    quantity: number;
    unitPrice: string;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ErrorResponse {
    message: string;
}
