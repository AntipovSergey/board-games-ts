import type { ChangeEvent, FormEvent } from 'react';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import type { GameType } from '../../../types/gameType';
import './OneGameCard.css'; // Подключаем стили
import { useAppDispatch } from '../../../redux/hooks';
import {
  deleteOneGamesThunk,
  patchOneGamesThunk,
  patchOneGamesThunkCheckBox,
} from '../../../redux/games/gamesThunk';

type GameCardType = {
  game: GameType;
};

function OneGameCard({ game }: GameCardType): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const deleteHandler = (id: GameType['id']): void => {
    void dispatch(deleteOneGamesThunk(Number(id)));
    navigate('/');
  };

  const editHandler = (id: GameType['id'], e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const gameData = new FormData(e.currentTarget);

    const formData = {
      title: gameData.get('title') as string,
      image: gameData.get('image') as string,
      description: gameData.get('description') as string,
      player_count: Number(gameData.get('player_count')),
      passed: gameData.get('passed') === 'true',
    };

    void dispatch(patchOneGamesThunk({ formData, id }));
    setShow(false);
  };

  const editCheckBoxHandler = (id: GameType['id'], e: ChangeEvent<HTMLInputElement>): void => {
    const isChecked = e.target.checked; // Получаем состояние чекбокса (true или false)

    const formData = {
      passed: isChecked, // Используем состояние чекбокса
    };

    void dispatch(patchOneGamesThunkCheckBox({ formData, id }));
    setShow(false);
  };

  return (
    <Card className="game-card">
      <Card.Img
        variant="top"
        src={`http://localhost:3000/public${game?.image}`}
        className="game-card-img"
      />
      <Card.Body className="game-card-body">
        <div>
          <Card.Title>{game?.title}</Card.Title>
          <Card.Text>{game?.description}</Card.Text>
          <Card.Text>Player counter: {game?.player_count}</Card.Text>
          <Form>
            <Form.Check
              type="checkbox"
              id="custom-checkbox"
              label="Passed"
              name="passed"
              defaultChecked={game?.passed} // Устанавливаем значение по умолчанию
              onChange={(e) => editCheckBoxHandler(game?.id, e)}
            />
          </Form>
        </div>
        <div>
          {' '}
          <Button variant="primary" onClick={() => setShow(true)}>
            Edit
          </Button>
          {show && (
            <Form onSubmit={(e) => editHandler(game?.id, e)}>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={game?.title}
                  name="title"
                  placeholder="Enter title"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  defaultValue={game?.description}
                  placeholder="Enter description"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  defaultValue={game?.image}
                  placeholder="Enter image"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicNumber">
                <Form.Label>Player counter</Form.Label>
                <Form.Control
                  type="number"
                  name="player_count"
                  defaultValue={game?.player_count}
                  placeholder="Enter score"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicSelect">
                <Form.Label>Passed</Form.Label>
                <Form.Select name="passed" defaultValue={game?.passed ? 'true' : 'false'}>
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
          )}
          <Button variant="danger" onClick={() => deleteHandler(game?.id)}>
            Delete
          </Button>
        </div>

        {/* <Button variant="primary" onClick={() => navigate(`/oneGame/${game.id}`)}>
          Go somewhere
        </Button> */}
      </Card.Body>
    </Card>
  );
}

export default OneGameCard;
