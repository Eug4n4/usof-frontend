import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LikeService from "../../api/services/LikeService";



export const getAllReactions = createAsyncThunk(
    "reactions/all",
    async ({ purpose, id }, { rejectWithValue }) => {
        try {
            const res = await LikeService.getReactions(purpose, id);
            return { purpose, id, data: res.data };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const deleteReaction = createAsyncThunk(
    "reactions/delete",
    async ({ purpose, id }, { rejectWithValue }) => {
        try {
            const result = await LikeService.deleteReaction(purpose, id);
            return { purpose, id, data: result.data }
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const sendReaction = createAsyncThunk(
    "reactions/sendReaction",
    async ({ purpose, id, type }, { rejectWithValue }) => {
        try {
            const res = await LikeService.toggleReaction(purpose, id, type);
            return { purpose, id, data: res.data };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const reactionSlice = createSlice({
    name: "reactions",
    initialState: {
        posts: {},
        comments: {},
    },
    reducers: {
        toggleReactionLocal(state, action) {
            const { purpose, id, type, userId } = action.payload;
            const target = state[purpose][id];
            if (!target) return;

            const userReaction = target.userReactions[userId];
            if (userReaction === type) {
                console.log("user reaction equal type")
                target.counts[type === 1 ? "likes" : "dislikes"]--;
                delete target.userReactions[userId];
            } else {
                if (userReaction !== undefined) {
                    target.counts[userReaction === 1 ? "likes" : "dislikes"]--;
                }
                target.counts[type === 1 ? "likes" : "dislikes"]++;
                target.userReactions[userId] = type;
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(getAllReactions.fulfilled, (state, action) => {
            let { purpose, id, data } = action.payload;
            if (!Array.isArray(data)) {
                data = [data]
            }
            const counts = { likes: 0, dislikes: 0 };
            const userReactions = {};

            data.forEach(r => {
                if (r.type === 1) counts.likes++;
                else counts.dislikes++;
                userReactions[r.author] = r.type;
            });

            state[purpose][id] = { counts, userReactions };
        });
    },
});

export const { toggleReactionLocal } = reactionSlice.actions;
export default reactionSlice.reducer;
