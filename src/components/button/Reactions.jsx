import { useDispatch, useSelector } from "react-redux";
import {
  deleteReaction,
  getAllReactions,
  sendReaction,
  toggleReactionLocal,
} from "../../features/state/reactionSlice";
import { useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";

import b from "./button.module.css";
import Button from "./Button";

function Reactions({ purpose, id, status }) {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const target = useSelector((state) => state.reactions[purpose][id]);
  const counts = target?.counts || { likes: 0, dislikes: 0 };
  const userReaction = target?.userReactions[user?.id];
  const handleReaction = (type) => {
    if (!user) return;
    dispatch(toggleReactionLocal({ purpose, id, type, userId: user.id }));
    if (userReaction === type) {
      dispatch(deleteReaction({ purpose, id }));
    } else {
      dispatch(sendReaction({ purpose, id, type }));
    }
  };

  useEffect(() => {
    if (id) dispatch(getAllReactions({ purpose, id }));
  }, [dispatch, purpose, id]);

  return (
    <>
      <Button
        disabled={status === 0}
        onClick={() => handleReaction(1)}
        className={userReaction === 1 ? b.active : ""}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#242424"
        >
          <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" />
        </svg>
        {counts.likes}
      </Button>
      <Button
        disabled={status === 0}
        onClick={() => handleReaction(0)}
        className={userReaction === 0 ? b.active : ""}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#242424"
        >
          <path d="M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z" />
        </svg>
        {counts.dislikes}
      </Button>
    </>
  );
}

export default Reactions;
