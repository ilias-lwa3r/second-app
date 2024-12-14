'use client'
import React from 'react';
import { useRouter } from 'next/compat/router';
import styled from 'styled-components';
import { Form, Button, Checkbox, Menu, Input } from 'antd';
import Questions from '../../../data/questions';

// TODO: Use context for tmp database for the user answers
const FormPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const categories = Questions.categories.map((q, i) => ({
    key: `${q.title}-${i}`,
    label: <span style={{ fontWeight: 'bold' }}>{q.title}</span>
  }));

  const [selectedCategory, setSelectedCategory] = React.useState(categories[0].key);
  const [formValues, setFormValues] = React.useState({});

  const handleMenuClick = (e) => {
    const currentValues = form.getFieldsValue();
    setFormValues(prev => ({ ...prev, [selectedCategory]: currentValues }));
    setSelectedCategory(e.key);
    form.setFieldsValue(formValues[e.key] || {});
  };

  const handleSubmit = (values) => {
    const allValues = { ...formValues, [selectedCategory]: values };
    console.log('User Answers:', allValues);
    // Now allValues will have arrays of marks for the checked options.
    router.push('/results');
  };

  React.useEffect(() => {
    form.setFieldsValue(formValues[selectedCategory] || {});
  }, [selectedCategory, form, formValues]);

  const renderQuestions = (categoryKey) => {
    const parts = categoryKey.split('-');
    parts.pop(); // Remove the last part (the index)
    const categoryTitle = parts.join('-');

    const categoryQuestions = Questions.categories.find(q => q.title === categoryTitle)?.questions || [];
    return categoryQuestions.map((question, index) => {
      const questionKey = `q_${categoryTitle}_${index}`;

      // Convert options to {label, value} format, where value is the mark
      const checkboxOptions = question.options.map(o => ({
        label: o.text,
        value: o.mark
      })).concat({ label: 'Autres', value: 'Autres' });

      return (
        <React.Fragment key={questionKey}>
          <StyledFormItem
            label={`${index + 1}. ${question.question}`}
            name={questionKey}
          >
            <Checkbox.Group
              options={checkboxOptions}
              style={{ display: 'flex', flexDirection: 'column' }}
            />
          </StyledFormItem>
          <Form.Item name={`${questionKey}_comment`}>
            <Comments placeholder="Commentaires" />
          </Form.Item>
        </React.Fragment>
      );
    });
  };

  return (
    <PageLayout>
      <Header>
        <h1>VisionPro</h1>
        <img src="https://www.pole-emc2.fr/app/uploads/2019/09/emc2-logo.png" alt="logo" width="60px" />
      </Header>
      <Main>
        <FormTitle>
          Data Maturity Assessment for EDIHH Customers
        </FormTitle>
        <FormContainer>
          <MenuContainer>
            <StyledMenu
              selectedKeys={[selectedCategory]}
              mode="inline"
              style={{ width: '100%', background: '#f0f2f5' }}
              items={categories}
              onClick={handleMenuClick}
            />
          </MenuContainer>
          <ScrollableForm>
            <Form
              form={form}
              name="basic"
              layout="vertical"
              onFinish={handleSubmit}
            >
              {renderQuestions(selectedCategory)}
              {selectedCategory === categories[categories.length - 1].key && (
                <SubmitButton type="primary" htmlType="submit">
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

const Comments = styled(Input)`
    margin-top: 10px;
    margin-left: 2.7em;
    width: 50%;
`;

export default FormPage;
