import type { AxiosInstance, AxiosResponse } from 'axios';
import type { GameCheckBoxType, GamePostFormType, GameType } from '../types/gameType';
import gameSchema from '../utils/validation';
import axiosInstance from './axiosInstance';

class GameService {
  constructor(private readonly client: AxiosInstance) {}

  async getGames(): Promise<GameType[]> {
    const { data } = await this.client<GameType[]>('/games');

    return gameSchema.array().parse(data);
  }

  async getOneGame(id: GameType['id']): Promise<GameType> {
    const { data } = await this.client<GameType>(`/games/${id}`);

    return gameSchema.parse(data);
  }

  async deleteGame(id: GameType['id']): Promise<AxiosResponse> {
    return this.client.delete(`/games/${id}`);
  }

  async addGame(formData: GamePostFormType): Promise<GameType> {
    const { data } = await this.client.post<GameType>('/games', formData);
    return gameSchema.parse(data);
  }

  async editGame(formData: GamePostFormType, id: GameType['id']): Promise<GameType> {
    const { data } = await this.client.patch<GameType>(`/games/${id}`, formData);
    return gameSchema.parse(data);
  }

  async editGameCheckBox(formData: GameCheckBoxType, id: GameType['id']): Promise<GameType> {
    const { data } = await this.client.patch<GameType>(`/games/${id}`, formData);
    return gameSchema.parse(data);
  }
}

export default new GameService(axiosInstance);
