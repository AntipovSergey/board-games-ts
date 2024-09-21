import React, { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addOneGamesThunk, getGamesThunk } from '../../../redux/games/gamesThunk';
import GameCard from '../../ui/GameCard/GameCard';
import './MainPage.css';

export default function MainPage(): JSX.Element {
  const games = useAppSelector((store) => store.games.games);
  const dispatch = useAppDispatch();
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    void dispatch(getGamesThunk());
  }, [dispatch]);

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const gameData = {
      title: formData.get('title') as string,
      image: formData.get('image') as string,
      description: formData.get('description') as string,
      player_count: Number(formData.get('player_count')),
      passed: formData.get('passed') === 'true',
    };

    void dispatch(addOneGamesThunk(gameData));
    setShow(false);
  };

  return (
    <Container>
      <Row>
        {!show && <Button onClick={() => setShow(true)}>Show Add Form</Button>}
        {show && (
          <Container>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" placeholder="Enter title" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" placeholder="Enter description" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" name="image" placeholder="Enter image" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicNumber">
                <Form.Label>Player counter</Form.Label>
                <Form.Control type="number" name="player_count" placeholder="Enter score" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicSelect">
                <Form.Label>Passed</Form.Label>
                <Form.Select name="passed" defaultValue="">
                  <option value="" disabled>
                    Select a passed option
                  </option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Select>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        )}
      </Row>
      <Row className="game-row">
        {games.map((game) => (
          <Col key={game.id} xs={12} sm={6} md={4} lg={3} className="game-col">
            <GameCard game={game} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
