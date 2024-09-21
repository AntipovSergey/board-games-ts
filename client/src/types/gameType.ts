import type { z } from 'zod';
import type gameSchema from '../utils/validation';

export type GameType = z.infer<typeof gameSchema>;

export type GamePostFormType = Omit<GameType, 'id'>;

export type GameCheckBoxType = Pick<GameType, 'passed'>;
