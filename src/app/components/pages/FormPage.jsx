'use client'
import React from 'react';
import styled from 'styled-components';
import { Form, Button, Checkbox, Menu } from 'antd';
import Questions from '../../../data/questions';
  

const FormPage = () => {
  const categories = Questions.categories.map(q => ({ key: q.title, label: <span style={{ fontWeight: 'bold' }}>{q.title}</span> }));
  const [selectedCategory, setSelectedCategory] = React.useState(categories[0].key);

  const questions = Questions.categories.find(q => q.title === selectedCategory)?.questions || [];

  const handleMenuClick = (e) => {
    const selectedCategory = e.key;
    setSelectedCategory(selectedCategory);
  };

  const renderQuestions = (category) => {
    const categoryQuestions = Questions.categories.find(q => q.title === category)?.questions || [];
    return categoryQuestions.map((question, index) => (
      <StyledFormItem
        key={question.question}
        label={`${index + 1}. ${question.question}`}
        name={question.name}
      >
        <StyledAnswer
          options={question.options}
          style={{ display: 'flex', flexDirection: 'column' }}
        />
      </StyledFormItem>
    ));
  };


  return (
    <PageLayout>
      <Header>
        <img src="/assets/logoApp.png" alt="logo" width="60px" />
        <img src="https://www.pole-emc2.fr/app/uploads/2019/09/emc2-logo.png" alt="logo" width="60px" />
      </Header>
      <Main>
        <FormTitle>
          Data Maturity Assessment for EDIHH Customers
        </FormTitle>
        <FormContainer>
          <MenuContainer>
            <StyledMenu
              defaultSelectedKeys={['category1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              style={{ width: '100%', background: '#f0f2f5' }}
              items={categories}
              onClick={handleMenuClick}
            />
          </MenuContainer>
          <ScrollableForm>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              layout="vertical"
            >
              {selectedCategory === 'category1' && questions.map((question, index) => (
                <StyledFormItem
                  key={question.name}
                  label={`${index + 1}. ${question.label}`}
                  name={question.name}
                >
                  <StyledAnswer
                    options={question.options}
                    style={{ display: 'flex', flexDirection: 'column' }}
                  />
                </StyledFormItem>
              ))}
              {renderQuestions(selectedCategory)}
              {selectedCategory === categories[categories.length - 1].key && (
                <SubmitButton
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </SubmitButton>
              )}
            </Form>
          </ScrollableForm>
        </FormContainer>
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
    width: 20%;
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

export default FormPage;