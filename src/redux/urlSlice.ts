import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUrl {
  _id: string;
  longUrl: string;
  shortUrl: string;
  clicks: number;
  qrCodeUrl: string;
}

const initialState = {
  singleUrl: {} as IUrl,
  allUrl: [] as IUrl[],
};

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    generateShortUrl: (state, action: PayloadAction<IUrl>) => {
      state.singleUrl = action.payload;
    },
    getAllUrl: (state, action: PayloadAction<IUrl[]>) => {
      state.allUrl = action.payload;
    },
  },
});

export const { generateShortUrl, getAllUrl } = urlSlice.actions;
export default urlSlice.reducer;
