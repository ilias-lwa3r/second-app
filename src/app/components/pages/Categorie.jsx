'use client'
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

  

const Categorie = () => {
  return (
    <PageLayout>
      <Header>
        <img src="/assets/logoApp.png" alt="logo" width="60px" />
        <img src="https://www.pole-emc2.fr/app/uploads/2019/09/emc2-logo.png" alt="logo" width="60px" />
      </Header>
      <Main>
        <AccueilContainer>
          <AccueilTitle >
          <FormTitle>
              <Link href="/questionnaire">Data Maturity Assessment Tool</Link>
            </FormTitle>
          </AccueilTitle>
          <AccueilTitle>
          <FormTitle>
              <Link href="/questionnaire">Data Maturity Assessment for EDIH Customers</Link>
            </FormTitle>
          </AccueilTitle>
          <AccueilTitle>
            <FormTitle>
              <Link href="/questionnaire">Transformation Ecoresponsable</Link>
            </FormTitle>
          </AccueilTitle>
          
        </AccueilContainer>
       
        
       
      </Main>
      <Footer>
        <p>Vision App by Fez - Ilias - Chahim - Brenda</p>
      </Footer>
    </PageLayout>
  );
};

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #2b677b;
    color: #fff;
`;

const Footer = styled.footer`
    background-color: #2b677b;
    color: white;
    text-align: center;
    padding: 5px;
`;

const Main = styled.main`
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
`;

const FormTitle = styled.h2`
    text-align: center;
    background-color: #989b04;
    padding: 2px 50px;
    border-radius: 2em;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 auto;
`;

const AccueilContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const AccueilTitle = styled.div`
    padding:70px;
`;

const PageLayout = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    main {
        flex: 1;
    }
`;


export default Categorie;