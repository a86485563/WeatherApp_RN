import React, { useReducer } from "react";

// create Reducer
const myLocationReducer = (state, action) => {
  switch (action.type) {
    case "add_location":
      return [
        ...state,
        {
          id:Math.floor(Math.random() * 100), // 0-100 的亂數
          location: action.payload.location,
        },
      ];

    case "delete_location":
      return state.filter((location) => location.id !== action.payload);

    default:
      return state;
  }
};

//匯出actions method 給外頭使用
const addLocation = (dispatch) => {
  return (location) => {
    dispatch({ type: "add_location", payload: { location } });
  };
};

const deleteLocation = (dispatch) => {
  return (id) => {
    // dispatch(action)
    dispatch({ type: "delete_location", payload: id });
  };
};

// create context
const createDataContext = (reducer, actions, initialState) => {
  console.log('in createDataContext');
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // 複製action 定義的method 給context管理
    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }
    console.log('boundActions',boundActions);

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};

export const { Context, Provider } = createDataContext(
  myLocationReducer,
  { addLocation, deleteLocation },
  [{ id: 1, location: "新北市" }]
);
