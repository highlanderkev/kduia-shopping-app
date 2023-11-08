import React, { createContext, useReducer } from 'react';

export const ACTION_TYPE = {
    DONE: 'DONE',
    ADD_QUANTITY: 'ADD_QUANTITY',
    RED_QUANTITY: 'RED_QUANTITY',
    DELETE_ITEM: 'DELETE_ITEM',
    CHG_LOCATION: 'CHG_LOCATION'
}

export const AppReducer = (state, action) => {
    let new_expenses = [];
    switch (action.type) {
        case ACTION_TYPE.ADD_QUANTITY:
            // let updatedQty = false;
            state.expenses.map((expense) => {
                if(expense.name === action.payload.name) {
                    expense.quantity = expense.quantity + action.payload.quantity;
                    // updatedQty = true;
                }
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type = ACTION_TYPE.DONE;
            return {
                ...state,
            };
    
        case ACTION_TYPE.RED_QUANTITY:
            state.expenses.map((expense)=>{
                if(expense.name === action.payload.name) {
                    expense.quantity = expense.quantity - action.payload.quantity;
                }
                expense.quantity = expense.quantity < 0 ? 0: expense.quantity;
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type = ACTION_TYPE.DONE;
            return {
                ...state,
            };

        case ACTION_TYPE.DELETE_ITEM:
            state.expenses.map((expense)=>{
                if(expense.name === action.payload.name) {
                    expense.quantity = 0;
                }
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type = ACTION_TYPE.DONE;
            return {
                ...state,
            };

        case ACTION_TYPE.CHG_LOCATION:
            action.type = ACTION_TYPE.DONE;
            state.Location = action.payload;
            return {
                ...state
            }

        default:
            return state;
    }
}


const initialState = {
    expenses: [
        { id: "Shirt", name: 'Shirt', quantity: 0, unitprice: 500 },
        { id: "Jeans", name: 'Jeans', quantity: 0, unitprice: 300 },
        { id: "Dress", name: 'Dress', quantity: 0, unitprice: 400 },
        { id: "Dinner set", name: 'Dinner set', quantity: 0, unitprice: 600 },
        { id: "Bags", name: 'Bags', quantity: 0, unitprice: 200 },
    ],
    Location: '£'
}

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const totalExpenses = state.expenses.reduce((total, item) => {
        return (total = total + (item.unitprice*item.quantity));
    }, 0);
    state.CartValue = totalExpenses;
    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                CartValue: state.CartValue,
                dispatch,
                Location: state.Location
            }}
            >
                {props.children}
            </AppContext.Provider>
    )
}