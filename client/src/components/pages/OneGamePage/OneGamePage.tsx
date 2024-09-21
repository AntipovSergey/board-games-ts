import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getOneGamesThunk } from '../../../redux/games/gamesThunk';
import OneGameCard from '../../ui/OneGameCard/OneGameCard';
import type { GameType } from '../../../types/gameType';

export default function OneGamePage(): JSX.Element {
  const { gameId } = useParams<{ gameId: string }>();
  const game = useAppSelector((store) => store.games.oneGame);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getOneGamesThunk(Number(gameId)));
  }, [game]);

  return (
    <Container>
      <OneGameCard game={game as GameType} />
    </Container>
  );
}
