import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
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
export const addToFavourites = createAsyncThunk(
  "favourites/addToFavourites",
  async (productId: string) => {
    const docRef = await addDoc(collection(db, "favourites"), {
      pID: productId,
      date: new Date().toISOString(),
    });
    return {
      id: docRef.id,
      pID: productId,
      date: new Date().toISOString(),
    };
  }
);
export const removeFromFavourites = createAsyncThunk(
  "favourites/removeFromFavourites",
  async (id: string) => {
    await deleteDoc(doc(db, "favourites", id));
    return id;
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
    builder.addCase(
      addToFavourites.fulfilled,
      (state, action: PayloadAction<Favourite>) => {
        state.favourites.push(action.payload);
      }
    );
    builder.addCase(
      removeFromFavourites.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.favourites = state.favourites.filter(
          (favourite) => favourite.id !== action.payload
        );
      }
    );
  },
});

export default favouritesSlice.reducer;
