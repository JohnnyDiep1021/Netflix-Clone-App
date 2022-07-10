import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    // update the input and overall form validity
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        // set the new validity based on the validity of the current updated input
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
          // store the validity of the input not being updated
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};
export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatchFormAction] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  // same function will be re-used whenever the whole JSX component re-render
  const inputHandler = useCallback((id, value, isValid) => {
    // console.log(value);
    dispatchFormAction({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  // in useCallback, DON"T FORGET to add an array of depency coz without it, React will execute it after every render. useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed will
  const setFormData = useCallback((inputData, formValidity) => {
    dispatchFormAction({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);
  return [formState, inputHandler, setFormData];
};
