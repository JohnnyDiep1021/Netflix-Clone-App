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
export const DropDown = (props) => {
  return (
    <ion-icon
      class="icon dropdown"
      name="chevron-down"
      style={{ width: props.width, height: props.height }}
    ></ion-icon>
  );
};
