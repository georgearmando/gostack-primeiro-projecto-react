/* eslint-disable camelcase */
import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import { Title, Form, Repositories, Error } from './styles';

// Quando o tipo de dados do useState é um Array ou um Objecto
// Criamos uma interface para indicar esse tipo de dados e nela passamos os atributos que vamos utilizar
interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if(storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    return [];
  });

  // O useEffect é usado disparar uma função sempre que uma variável mudar
  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories])

  async function handleAddRepositorry(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    // Previne o comportamento padrão que o formulário tem dentro do HTML
    // Que é redireccionar para uma outra página quando ele é submetido
    event.preventDefault();

    // Verifica se foi inserido um repositório
    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    // Tratamento de erro quando não encontra o repositório
    try {
      // Pegar os dados do repositório
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      // Adiciona o novo repositório na lista de repositórios existentes
      setRepositories([...repositories, repository]);

      // Limpa o input
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse repositóirio');
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepositorry}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repostório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link key={repository.full_name} to={`/repositories/${repository.full_name}`}>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
