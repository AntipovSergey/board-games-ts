import { z } from 'zod';

const gameSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  player_count: z.number(),
  passed: z.boolean(),
});

export default gameSchema