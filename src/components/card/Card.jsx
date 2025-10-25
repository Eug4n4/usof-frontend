function Card({ children, ...rest }) {
  return (
    <section className="card" {...rest}>
      {children}
    </section>
  );
}

export default Card;
