import React, { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';

import { Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const {repos} = useContext(GithubContext);
    //=======================
    // data for pie and doghnut charts
    //=======================

    let languages = repos.reduce((acc, item) => {
          let {language, stargazers_count} = item;
          
          if(!language) return acc;

          if(acc[language]){
              acc[language] = {...acc[language], value : acc[language].value + 1, stars : stargazers_count + acc[language].stars }
          }
          else {
              acc[language] = {label : language, value : 1, stars : stargazers_count}
          } 
          return acc;
    }, {})

// data moulded according to the requirements of FusionCharts;

const mostUsed = Object.values(languages).sort((a, b) => {
  return b.value - a.value
}).slice(0, 5);

const mostStars = Object.values(languages).map((lang) => {
      return {...lang, value : lang.stars};
}).slice(0, 5);

    //=======================
    // data for bar2d and column2d charts
    //=======================

const {stars, forks} = repos.reduce((acc, item) => {
      const {stargazers_count, name, forks} = item;
      // stars data object
      acc.stars[stargazers_count] = {label : name, value : stargazers_count};
      // forks data object
      acc.forks[stargazers_count] = {label : name, value : forks};
      return acc;
    },
     {
      stars : {},
      forks : {}
    });

// data moulded according to the requirements of FusionCharts;

const columnData = Object.values(stars).slice(-5).reverse();
const barData = Object.values(forks).slice(-5).reverse();

  return (
    <section className = "section">
    <Wrapper className = "section-center">
      <Pie3D data = {mostUsed}/>
      <Column3D data = {columnData}></Column3D>
      <Doughnut2D data = {mostStars}/>
      <Bar3D data = {barData}></Bar3D>
    </Wrapper>
    </section>
  )
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
