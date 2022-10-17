import react, {
  useRef,
  useImperativeHandle,
  useReducer,
  useEffect,
} from "react";

import { validate } from "../../../util/validators";

import "./Input.scss";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "FOCUS":
      return {
        ...state,
        isFocus: true,
      };
    case "TOUCH":
      return {
        ...state,
        isFocus: false,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = react.forwardRef((props, ref) => {
  const inputRef = useRef();
  const [inputState, dispatchInputAction] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isFocus: false,
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid, isFocus } = inputState;
  useEffect(() => {
    onInput(id, value, inputRef?.current?.value, isValid, isFocus);
  }, [id, value, isValid, inputRef?.current?.value, onInput, isFocus]);

  const changeHandler = (event) => {
    dispatchInputAction({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatchInputAction({
      type: "TOUCH",
    });
  };
  const focusHandler = () => {
    dispatchInputAction({
      type: "FOCUS",
    });
  };

  const activate = () => {
    inputRef.current.focus();
  };

  // establish connection with the outside world components
  useImperativeHandle(ref, () => {
    return { focus: activate };
  });

  let inputElement;
  switch (props.element) {
    case "input":
      inputElement = (
        <input
          ref={inputRef}
          id={props.id}
          type={props.type}
          className={`${
            inputState.isFocus || inputState.value ? "hasText" : ""
          }`}
          placeholder={props.placeholder}
          value={inputState.value}
          onChange={changeHandler}
          onBlur={touchHandler}
          onFocus={focusHandler}
          step={props.step}
        />
      );
      break;
    case "flex-input":
      inputElement = (
        <span
          ref={inputRef}
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          value={inputState.value}
          onChange={changeHandler}
          onBlur={touchHandler}
          step={props.step}
          contentEditable
        ></span>
      );
      break;
    default:
      inputElement = (
        <textarea
          ref={inputRef}
          id={props.id}
          className={`${
            inputState.isFocus || inputState.value ? "hasText" : ""
          }`}
          placeholder={props.placeholder}
          rows={props.rows || 10}
          cols={props.cols || 10}
          onChange={changeHandler}
          onBlur={touchHandler}
          onFocus={focusHandler}
          value={inputState.value}
        >
          {props.children}
        </textarea>
      );
  }
  return (
    <div className="input-container">
      <div
        className={`input ${
          !inputState.isValid && inputState.isTouched && "invalid"
        }`}
      >
        {inputElement}
        <label htmlFor={props.id}>{props.label}</label>
      </div>
      {!inputState.isValid && inputState.isTouched && (
        <div
          className={`error-message ${props.errorClass}`}
          style={props.errorStyle}
        >
          {props.errorText}
        </div>
      )}
    </div>
  );
});

export default Input;
