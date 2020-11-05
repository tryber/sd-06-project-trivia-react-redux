import React from 'react';
import FeedBack from '../pages/FeedBack';
import FeedHeader from '../components/FeedHeader';
import initialState from './mockData';
import { renderWithRouterAndStore } from './testConfig';

describe('A tela de feedback deve conter  o placar, o nome, a imagem do jogador ', () => {
  test('o component feedback é renderizado no path correto', () => {
    const { container } = renderWithRouterAndStore(<FeedBack />, '/feedback', {});
    expect(container).toBeDefined();
  });

  test('uma imagem  com data-testid header-profile-picture', () => {
    const { queryByTestId } = renderWithRouterAndStore(<FeedBack />);
    const imageElement = queryByTestId('header-profile-picture');
    expect(imageElement).toBeInTheDocument();
  });

  test('um texto com o data-testid header-player-name', () => {
    const { queryByTestId } = renderWithRouterAndStore(<FeedHeader />,
      '/feedback', initialState);
    const nameElement = queryByTestId('header-player-name');
    expect(nameElement).toBeInTheDocument();
  });

  test('um numero com o data-testid: header-score', () => {
    const { queryByTestId } = renderWithRouterAndStore(<FeedHeader />,
      '/feedback', initialState);
    const scoreElement = queryByTestId('header-score');
    expect(scoreElement).toBeInTheDocument();
  });
  test('o estado do redux passado como props atualiza o componente', () => {
    const { queryByTestId } = renderWithRouterAndStore(<FeedHeader />,
      '/feedback', initialState);
    const name = queryByTestId('header-player-name');
    expect(name.textContent).toBe(initialState.login.player.user);
  });
});
