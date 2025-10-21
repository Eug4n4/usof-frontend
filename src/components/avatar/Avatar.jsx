import s from "./avatar.module.css";
function Avatar({ ...props }) {
  return <img className={s.avatar} alt="avatar" {...props} />;
}

export default Avatar;
