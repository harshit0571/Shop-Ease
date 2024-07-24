import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebaseConfig";

interface Favourite {
  pID: string;
  id: string;
}

interface FavouritesState {
  favourites: Favourite[];
}

export const fetchFavourites = createAsyncThunk(
  "favourites/fetchFavourites",
  async () => {
    const favouritesCollection = collection(db, "favourites");
    const favouritesSnapshot = await getDocs(favouritesCollection);
    const favouritesList = favouritesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Favourite[];
    return favouritesList;
  }
);

const initialState: FavouritesState = {
  favourites: [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchFavourites.fulfilled,
      (state, action: PayloadAction<Favourite[]>) => {
        state.favourites = action.payload;
      }
    );
  },
});

export default favouritesSlice.reducer;
