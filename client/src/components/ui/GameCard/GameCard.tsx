import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './GameCard.css'; // Подключаем стили
import { useNavigate } from 'react-router-dom';
import type { GameType } from '../../../types/gameType';

type GameCardType = {
  game: GameType;
};

function GameCard({ game }: GameCardType): JSX.Element {
  const navigate = useNavigate();
  return (
    <Card className="game-card">
      <Card.Img
        variant="top"
        src={`http://localhost:3000/public${game.image}`}
        className="game-card-img"
      />
      <Card.Body className="game-card-body">
        <div>
          <Card.Title>{game.title}</Card.Title>
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Description</Accordion.Header>
              <Accordion.Body>{game.description}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <Button variant="primary" onClick={() => navigate(`/oneGame/${game.id}`)}>
          Go somewhere
        </Button>
      </Card.Body>
    </Card>
  );
}

export default GameCard;
