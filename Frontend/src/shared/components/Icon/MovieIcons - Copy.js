import { Fragment } from "react";
import "./MovieIcons.scss";

export const ThumbUp = (props) => {
  return (
    <ion-icon
      class="icon thumbup"
      name="thumbs-up-outline"
      style={{ width: props.width, height: props.height }}
    ></ion-icon>
  );
};
export const ThumbDown = (props) => {
  return (
    <ion-icon
      class="icon thumbdown"
      name="thumbs-down-outline"
      style={{ width: props.width, height: props.height }}
    ></ion-icon>
  );
};
export const Add = (props) => {
  return (
    <ion-icon
      class="icon add"
      name="add-sharp"
      style={{ width: props.width, height: props.height }}
    ></ion-icon>
  );
};
export const Play = (props) => {
  return (
    <ion-icon
      class="icon play"
      name="play"
      style={{ width: props.width, height: props.height }}
    ></ion-icon>
  );
};

export const Info = (props) => {
  return (
    <ion-icon
      class="icon information"
      name="information-circle-outline"
      style={{ width: props.width, height: props.height }}
    ></ion-icon>
  );
};
export const DropDown = (props) => {
  return (
    <ion-icon
      class="icon dropdown"
      name="chevron-down"
      style={{ width: props.width, height: props.height }}
    ></ion-icon>
  );
};

export const ForwardArrow = (props) => {
  return (
    <ion-icon
      class={`icon forward-arrow ${props.className}`}
      name="chevron-forward-outline"
      style={{ width: props.width, height: props.height }}
      onClick={props.onClick}
    ></ion-icon>
  );
};

export const BackwardArrow = (props) => {
  return (
    <ion-icon
      class={`icon backward-arrow ${props.className}`}
      name="chevron-back-outline"
      style={{
        width: props.width,
        height: props.height,
        display: props.display,
      }}
      onClick={props.onClick}
    ></ion-icon>
  );
};

export const ArrowReturn = (props) => {
  return (
    <ion-icon
      class={`icon arrow-return ${props.className}`}
      name="arrow-back"
      style={{
        width: props.width,
        height: props.height,
        display: props.display,
      }}
      onClick={props.onClick}
    ></ion-icon>
  );
};

export const Search = (props) => {
  return (
    <ion-icon
      name="search"
      class={`icon search ${props.className}`}
      style={{
        width: props.width,
        height: props.height,
        display: props.display,
      }}
      onClick={props.onClick}
    ></ion-icon>
  );
};

export const Notification = (props) => {
  return (
    <ion-icon
      name="notifications"
      class={`icon notification ${props.className}`}
      style={{
        width: props.width,
        height: props.height,
        display: props.display,
      }}
      onClick={props.onClick}
    ></ion-icon>
  );
};

export const ArrowDown = (props) => {
  return (
    <ion-icon
      name="caret-down"
      class={`icon arrow-down ${props.className}`}
      style={{
        width: props.width,
        height: props.height,
        display: props.display,
      }}
      onClick={props.onClick}
    ></ion-icon>
  );
};
