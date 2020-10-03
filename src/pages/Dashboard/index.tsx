import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form>
        <input placeholder="Digite o nome do repostório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
            src="https://avatars2.githubusercontent.com/u/31625125?s=460&u=20fc3b69943d2fee00bc0c90a0266deb37ba0f68&v=4"
            alt="George Armando"
          />
          <div>
            <strong>georgearmando/gostack-gobarber</strong>
            <p>Aplicação criada no bootcamp da Rocketseat</p>
          </div>

          <FiChevronRight size={20} />
        </a>

        <a href="teste">
          <img
            src="https://avatars2.githubusercontent.com/u/31625125?s=460&u=20fc3b69943d2fee00bc0c90a0266deb37ba0f68&v=4"
            alt="George Armando"
          />
          <div>
            <strong>georgearmando/gostack-gobarber</strong>
            <p>Aplicação criada no bootcamp da Rocketseat</p>
          </div>

          <FiChevronRight size={20} />
        </a>

        <a href="teste">
          <img
            src="https://avatars2.githubusercontent.com/u/31625125?s=460&u=20fc3b69943d2fee00bc0c90a0266deb37ba0f68&v=4"
            alt="George Armando"
          />
          <div>
            <strong>georgearmando/gostack-gobarber</strong>
            <p>Aplicação criada no bootcamp da Rocketseat</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
