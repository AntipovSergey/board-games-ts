import { createAsyncThunk } from '@reduxjs/toolkit';
import gamesService from '../../services/gamesService';
import type { GameCheckBoxType, GamePostFormType, GameType } from '../../types/gameType';

export const getGamesThunk = createAsyncThunk('/games/getGames', async () => {
  const data = await gamesService.getGames();
  return data;
});

export const getOneGamesThunk = createAsyncThunk(
  '/games/getOneGame',
  async (id: GameType['id']) => {
    const data = await gamesService.getOneGame(id);
    return data;
  },
);

export const deleteOneGamesThunk = createAsyncThunk(
  '/games/deleteOneGame',
  async (id: GameType['id']) => {
    await gamesService.deleteGame(id);
    return id;
  },
);

export const addOneGamesThunk = createAsyncThunk(
  '/games/addOneGame',
  async (formData: GamePostFormType) => {
    const data = await gamesService.addGame(formData);
    return data;
  },
);

export const patchOneGamesThunk = createAsyncThunk(
  '/games/patchOneGame',
  async ({ formData, id }: { formData: GamePostFormType; id: GameType['id'] }) => {
    const data = await gamesService.editGame(formData, id);
    return data;
  },
);

export const patchOneGamesThunkCheckBox = createAsyncThunk(
  '/games/patchOneGameCheckBox',
  async ({ formData, id }: { formData: GameCheckBoxType; id: GameType['id'] }) => {
    const data = await gamesService.editGameCheckBox(formData, id);
    return data;
  },
);
