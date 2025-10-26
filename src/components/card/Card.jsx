import s from "./card.module.css";

function Card({ children, ...rest }) {
  return (
    <section className={s.card} {...rest}>
      {children}
    </section>
  );
}

export default Card;
