import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    DECREASE_QUANTITY,
    CLEAR_CART,
} from '../actions/cartActions';

const initialState = {
    items: [],
    totalQuantity: 0,
};

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART: {
            const item = action.payload;
            const exists = state.items.find((i) => i.id === item.id);
            const quantityToAdd = item.quantity || 1;

            let updatedItems;
            if (exists) {
                updatedItems = state.items.map((i) =>
                    i.id === item.id
                        ? {
                            ...i,
                            quantity: item.quantity || i.quantity + 1,
                        }
                        : i
                );
            }
            else {
                updatedItems = [...state.items, { ...item, quantity: quantityToAdd }];
            }

            return {
                ...state,
                items: updatedItems,
                totalQuantity: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
            };
        }

        case DECREASE_QUANTITY: {
            const updatedItems = state.items
                .map((item) =>
                    item.id === action.payload
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0);

            return {
                ...state,
                items: updatedItems,
                totalQuantity: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
            };
        }

        case REMOVE_FROM_CART: {
            const updatedItems = state.items.filter((i) => i.id !== action.payload);
            return {
                ...state,
                items: updatedItems,
                totalQuantity: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
            };
        }

        case CLEAR_CART:
            return initialState;

        default:
            return state;
    }
}
