import Button from "../button/Button";
import s from "./detail.module.css";

function DetailView({
  heading,
  controlsChildren,
  topChildren,
  anchorChildren,
  sortingChildren,
  listChildren,
  pagination,
}) {
  return (
    <>
      <h2 className={`${s.details} heading`}>{heading}</h2>
      <section className={`${s.details} ${s.controls}`}>
        {controlsChildren}
      </section>
      <section className={`${s.details} ${s.top}`}>{topChildren}</section>
      <section className={`${s.details} ${s.anchors}`}>
        {anchorChildren}
      </section>
      <section className={`${s.details} ${s.sorting}`}>
        {sortingChildren}
      </section>
      <section className={`${s.details} list`}>
        {listChildren.length ? listChildren : <p>There is no content</p>}
      </section>
      {pagination}
    </>
  );
}

export default DetailView;
