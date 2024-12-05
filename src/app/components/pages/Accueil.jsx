'use client'
import React from 'react';
import styled from 'styled-components';
import { Form, Button, Checkbox, Menu } from 'antd';
import Questions from '../../../data/questions';
import Link from 'next/link';

  

const Accueil = () => {
  return (
    <PageLayout>
      <Header>
        <img src="/assets/logoApp.png" alt="logo" width="60px" />
        <img src="https://www.pole-emc2.fr/app/uploads/2019/09/emc2-logo.png" alt="logo" width="60px" />
      </Header>
      <Main>
        <AccueilContainer>
          <AccueilTitle >
            <h2>
              Bienvenue sur VisionPro
            </h2>
          </AccueilTitle>
          <AccueilTitle>
            <h2>
              Simplifiez vos enquêtes et obtenez des résultats précis!
            </h2>
          </AccueilTitle>
          <AccueilTitle>
            <FormTitle>
              <Link href="/categorie">Démarrer le questionnaire</Link>
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
    justify-content: center;
`;
const AccueilTitle = styled.div`
    padding:90px;
    text-align: center;
    border-radius: 2em;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 auto;
`;

const PageLayout = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    main {
        flex: 1;
    }
`;

const StyledFormItem = styled(Form.Item)`
    .ant-form-item-label > label {
        font-size: 1.2rem;
        font-weight: bold;
        color: #2b677b;
    }
`;

const StyledAnswer = styled(Checkbox.Group)`
    .ant-checkbox-wrapper {
        font-size: 1.2rem;
        padding: 0 2em;
    }
`;

const FormContainer = styled.div`
    display: flex;
    gap: 50px;
    height: 70vh;
`;

const MenuContainer = styled.div`
    width: 50%;
`;

const StyledMenu = styled(Menu)`
    width: 100%;
    height: 100%;
    border-radius: 1.25em;
`;

const ScrollableForm = styled.div`
    flex: 1;
    max-height: 80vh;
    overflow-y: auto;
`;
const SubmitButton = styled(Button)`
    position: fixed;
    bottom: 50px;
    right: 50px;
    z-index: 1000;
    background-color: #989b04;
    color: black;
    font-weight: bold;
    font-size: 1.2rem;
    border-radius: 1em;    
`;



export default Accueil;