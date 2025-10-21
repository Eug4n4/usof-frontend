import s from "./detail.module.css";

function DetailView({
  heading,
  topChildren,
  anchorChildren,
  sortingChildren,
  listChildren,
  pagination,
}) {
  return (
    <>
      <h2 className={`${s.details} heading`}>{heading}</h2>
      <section className={`${s.details} ${s.top}`}>{topChildren}</section>
      <section className={`${s.details} ${s.anchors}`}>
        {anchorChildren}
      </section>
      <section className={`${s.details} ${s.sorting}`}>
        {sortingChildren}
      </section>
      <section className={`${s.details} list`}>{listChildren}</section>
      {pagination}
    </>
  );
}

export default DetailView;
