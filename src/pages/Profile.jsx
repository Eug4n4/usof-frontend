import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import DetailView from "../components/details/DetailView";
import Avatar from "../components/avatar/Avatar";
import getUserAvatar from "../features/avatars";
import Form from "../components/form/Form";
import TextInput from "../components/input/TextInput";
import Button from "../components/button/Button";
import PaginationContainer from "../components/pagination/PaginationContainer";

import Sorting from "../components/sorting/Sorting";
import Filter from "../components/filter/Filter";
import AvatarUpload from "../components/avatar/AvatarUpload";
import ProfileForm from "../components/form/ProfileForm";
import { postSortingOptions } from "../features/sorting.options";
import s from "../components/button/button.module.css";
import d from "../components/details/detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { usePagination } from "../features/state/pagination";
import {
  currentPage,
  getPosts,
  pageSize,
  query,
} from "../features/state/profileSlice";
import { actions, getFavorites } from "../features/state/favoriteSlice";
import PostCard from "../components/card/PostCard";
import { INITIAL_PAGE_SIZE } from "../features/constants";
import OwnPostCard from "../components/card/OwnPostCard";
import formatDate from "../features/formatDate";
import UserService from "../api/services/UserService";

function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ownPosts = useSelector((state) => state.profile.ownPosts);
  const favorites = useSelector((state) => state.favorite.favorites);

  const [activeButton, setActiveButton] = useState("post");
  const [disableForms, setDisableForms] = useState(true);
  const postPagination = usePagination({
    resource: "profile",
    fetchThunk: getPosts,
    actions: { currentPage, pageSize, query },
  });

  const favoritePagination = usePagination({
    resource: "favorite",
    fetchThunk: getFavorites,
    actions: {
      currentPage: actions.currentPage,
      pageSize: actions.pageSize,
      query: actions.query,
    },
  });
  const favoriteButtonKey = "favorite";
  const postButtonKey = "post";

  useEffect(() => {
    if (user?.id) {
      UserService.getById(user.id).then((response) => setUser(response.data));
    }
  }, []);
  useEffect(() => {
    if (!user) {
      navigate("/signin", { replace: true });
    }
  }, [user]);

  useEffect(() => {
    dispatch(currentPage(1));
    dispatch(actions.currentPage(1));
    dispatch(pageSize(INITIAL_PAGE_SIZE));
    dispatch(actions.pageSize(INITIAL_PAGE_SIZE));
    dispatch(getPosts());
    dispatch(getFavorites());
  }, [dispatch]);

  function renderList() {
    if (activeButton === postButtonKey) {
      return (
        <>
          {ownPosts.map((post) => (
            <OwnPostCard
              key={post.id}
              id={post.id}
              author={post.author}
              photo={post.photo}
              categories={post.categories}
              content={post.content}
              dislikes={post.dislikes}
              likes={post.likes}
              publishDate={formatDate(new Date(post.publish_date))}
              title={post.title}
            />
          ))}
        </>
      );
    }
    return (
      <>
        {favorites.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            author={post.author}
            photo={post.photo}
            categories={post.categories}
            content={post.content}
            dislikes={post.dislikes}
            likes={post.likes}
            publishDate={formatDate(new Date(post.publish_date))}
            title={post.title}
          />
        ))}
      </>
    );
  }

  return (
    <>
      {user ? (
        <>
          <h2 className={`${d.details} heading`}>Profile page</h2>
          <>
            {disableForms ? (
              <Button onClick={() => setDisableForms(!disableForms)}>
                Edit
              </Button>
            ) : (
              <Button onClick={() => setDisableForms(!disableForms)}>
                Cancel
              </Button>
            )}
          </>
          <section className={`${d.details} ${d.top} ${d.profile}`}>
            <div className="top left" style={{ alignSelf: "center" }}>
              <Avatar
                src={getUserAvatar(user.photo)}
                width={128}
                height={128}
              />
              <AvatarUpload isHidden={disableForms} />
            </div>
            <div className="top right">
              <ProfileForm
                isHidden={disableForms}
                fullName={user.full_name}
                login={user.login}
                role={user.role}
                rating={user.rating}
              />
            </div>
          </section>
          <section className={`${d.details} ${d.anchors}`}>
            <Button
              key={postButtonKey}
              className={activeButton === postButtonKey ? s.active : ""}
              onClick={() => setActiveButton(postButtonKey)}
            >
              Your Posts
            </Button>
            <Button
              key={favoriteButtonKey}
              className={activeButton === favoriteButtonKey ? s.active : ""}
              onClick={() => setActiveButton(favoriteButtonKey)}
            >
              Favorites
            </Button>
          </section>
          {activeButton === postButtonKey ? (
            <Sorting
              filter={
                <Filter
                  getter={getPosts}
                  pageChanger={currentPage}
                  pageSizer={pageSize}
                  queryChanger={query}
                  query={postPagination.query}
                />
              }
              sortingOptions={postSortingOptions}
              defaultSorting={"most-liked"}
              getter={getPosts}
              pageChanger={currentPage}
              pageSizer={pageSize}
              queryChanger={query}
            />
          ) : (
            <Sorting
              filter={
                <Filter
                  getter={getFavorites}
                  pageChanger={actions.currentPage}
                  pageSizer={actions.pageSize}
                  queryChanger={actions.query}
                  query={favoritePagination.query}
                />
              }
              sortingOptions={postSortingOptions}
              defaultSorting={"most-liked"}
              getter={getFavorites}
              pageChanger={actions.currentPage}
              pageSizer={actions.pageSize}
              queryChanger={actions.query}
            />
          )}
          <section className={`${d.details} list`}>{renderList()}</section>
          {activeButton === postButtonKey ? (
            <PaginationContainer purpose={postPagination} />
          ) : (
            <PaginationContainer purpose={favoritePagination} />
          )}
        </>
      ) : null}
    </>
  );
}
export default Profile;
