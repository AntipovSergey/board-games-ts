import { createSlice } from '@reduxjs/toolkit';
import type { GameType } from '../../types/gameType';
import {
  addOneGamesThunk,
  deleteOneGamesThunk,
  getGamesThunk,
  getOneGamesThunk,
  patchOneGamesThunk,
  patchOneGamesThunkCheckBox,
} from './gamesThunk';

type GameState = {
  games: GameType[];
  oneGame: GameType | null;
};

const initialState: GameState = {
  games: [],
  oneGame: null,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGamesThunk.fulfilled, (state, action) => {
        state.games = [...action.payload];
      })
      .addCase(getGamesThunk.rejected, (state) => {
        state.games = [];
      })
      .addCase(getOneGamesThunk.fulfilled, (state, action) => {
        state.oneGame = action.payload;
      })
      .addCase(getOneGamesThunk.rejected, (state) => {
        state.oneGame = null;
      })
      .addCase(deleteOneGamesThunk.fulfilled, (state, action) => {
        state.games = state.games.filter((game) => game.id !== action.payload);
      })
      .addCase(deleteOneGamesThunk.rejected, (_, action) => {
        console.error('Ошибка удаления игры:', action.error);
      })
      .addCase(addOneGamesThunk.fulfilled, (state, action) => {
        state.games = [action.payload, ...state.games];
      })
      .addCase(addOneGamesThunk.rejected, (_, action) => {
        console.error('Ошибка добавления игры:', action.error);
      })
      .addCase(patchOneGamesThunk.fulfilled, (state, action) => {
        state.oneGame = action.payload;
      })
      .addCase(patchOneGamesThunk.rejected, (_, action) => {
        console.error('Ошибка обновления игры:', action.error);
      })
      .addCase(patchOneGamesThunkCheckBox.fulfilled, (state, action) => {
        state.oneGame = action.payload;
      })
      .addCase(patchOneGamesThunkCheckBox.rejected, (_, action) => {
        console.error('Ошибка обновления игры:', action.error);
      });
  },
});

export default gamesSlice.reducer;
