import "./Icons.scss";

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
      name="notifications-outline"
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

export const Settings = (props) => {
  return (
    <ion-icon
      name="settings-sharp"
      class={`icon setting ${props.className}`}
      style={{
        width: props.width,
        height: props.height,
        display: props.display,
      }}
      onClick={props.onClick}
    ></ion-icon>
  );
};

export const Globe = (props) => {
  return (
    <ion-icon
      name="globe-outline"
      class={`icon globe ${props.className}`}
      style={{
        width: props.width,
        height: props.height,
        display: props.display,
      }}
      onClick={props.onClick}
    ></ion-icon>
  );
};

export const Home = (props) => {
  return (
    <ion-icon
      name="home"
      class={`icon home ${props.className}`}
      style={{
        width: props.width,
        height: props.height,
        display: props.display,
      }}
      onClick={props.onClick}
    ></ion-icon>
  );
};

export const Analytics = (props) => {
  return (
    <ion-icon
      name="bar-chart"
      class={`icon home ${props.className}`}
      style={{
        width: props.width,
        height: props.height,
        display: props.display,
      }}
      onClick={props.onClick}
    ></ion-icon>
  );
};

export const Sale = (props) => {
  return (
    <ion-icon
      name="analytics"
      class={`icon home ${props.className}`}
      style={{
        width: props.width,
        height: props.height,
        display: props.display,
      }}
      onClick={props.onClick}
    ></ion-icon>
  );
};

export const User = (props) => {
  return (
    <ion-icon
      name="person-sharp"
      class={`icon home ${props.className}`}
      style={{
        width: props.width,
        height: props.height,
        display: props.display,
      }}
      onClick={props.onClick}
    ></ion-icon>
  );
};

export const Product = (props) => {
  return (
    <ion-icon
      name="storefront-sharp"
      class={`icon home ${props.className}`}
      style={{
        width: props.width,
        height: props.height,
        display: props.display,
      }}
      onClick={props.onClick}
    ></ion-icon>
  );
};

export const Transaction = (props) => {
  return (
    <ion-icon
      name="card-sharp"
      class={`icon home ${props.className}`}
      style={{
        width: props.width,
        height: props.height,
        display: props.display,
      }}
      onClick={props.onClick}
    ></ion-icon>
  );
};

export const Email = (props) => {
  return (
    <ion-icon
      name="mail-sharp"
      class={`icon home ${props.className}`}
      style={{
        width: props.width,
        height: props.height,
        display: props.display,
      }}
      onClick={props.onClick}
    ></ion-icon>
  );
};

export const Report = (props) => {
  return (
    <ion-icon
      name="clipboard-sharp"
      class={`icon home ${props.className}`}
      style={{
        width: props.width,
        height: props.height,
        display: props.display,
      }}
      onClick={props.onClick}
    ></ion-icon>
  );
};

export const Feedback = (props) => {
  return (
    <ion-icon
      name="chatbox-ellipses-sharp"
      class={`icon home ${props.className}`}
      style={{
        width: props.width,
        height: props.height,
        display: props.display,
      }}
      onClick={props.onClick}
    ></ion-icon>
  );
};
export const Manage = (props) => {
  return (
    <ion-icon
      name="people-sharp"
      class={`icon home ${props.className}`}
      style={{
        width: props.width,
        height: props.height,
        display: props.display,
      }}
      onClick={props.onClick}
    ></ion-icon>
  );
};

export const Message = (props) => {
  return (
    <ion-icon
      name="chatbubbles-sharp"
      class={`icon home ${props.className}`}
      style={{
        width: props.width,
        height: props.height,
        display: props.display,
      }}
      onClick={props.onClick}
    ></ion-icon>
  );
};

export const ArrowDownward = (props) => {
  return (
    <ion-icon
      name="arrow-down-outline"
      class={`icon home ${props.className}`}
      style={{
        width: props.width,
        height: props.height,
        display: props.display,
      }}
      onClick={props.onClick}
    ></ion-icon>
  );
};

export const ArrowUpwnward = (props) => {
  return (
    <ion-icon
      name="arrow-up-outline"
      class={`icon home ${props.className}`}
      style={{
        width: props.width,
        height: props.height,
        display: props.display,
      }}
      onClick={props.onClick}
    ></ion-icon>
  );
};
