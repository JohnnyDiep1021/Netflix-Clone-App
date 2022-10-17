export const NAME_MINLENGTH = 2;
export const NAME_MAXLENGTH = 64;
export const BIO_MAXLENGTH = 256;
export const USERNAME_MINLENGTH = 6;
export const USERNAME_MAXLENGTH = 36;
export const EMAIL_MINLENGTH = 3;
export const EMAIL_MAXLENGTH = 60;
export const ANIMATION_STYLE = {
  slide: {
    enter: "modalOpenInit",
    enterActive: "slideShow",
    exit: "modalCloseInit",
    exitActive: "slideHide",
  },
  popup: {
    enter: "modalOpenInit",
    enterActive: "modalAppear",
    exit: "modalCloseInit",
    exitActive: "modalFade",
  },
  movie: {
    enter: "modalOpenInit",
    enterActive: "movieShow",
    exit: "modalCloseInit",
    exitActive: "movieHide",
  },
};
export const ANIMATION_TIMEOUT = {
  popupAniTiming: {
    enter: 300,
    exit: 300,
  },
  slideAniTiming: {
    enter: 450,
    exit: 450,
  },
  movieAniTiming: {
    enter: 350,
    exit: 350,
  },
};
