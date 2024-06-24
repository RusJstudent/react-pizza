export type ICartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    paramId: string;
}

export interface ICartState {
    items: {
        [key: string]: {
            item: ICartItem
            count: number;
        }
    };
    totalCount: number;
    totalPrice: number;
}