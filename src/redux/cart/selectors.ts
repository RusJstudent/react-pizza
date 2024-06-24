import { RootState } from "../store";

export const selectItemsCountById = (id: string) => {
    return (state: RootState) => {
        return Object.values(state.cart.items).reduce((acc, items) => {
            if (items.item.id === id) {
                return acc + items.count;
            }

            return acc;
        }, 0);
    }
};

export const selectCart = (state: RootState) => state.cart;