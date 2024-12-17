'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Form, Button, Checkbox, Menu, Input } from 'antd';
import Questions from '../../../data/questions.json';

const FormPage = () => {
  const Router = useRouter();
  const [form] = Form.useForm();

  // Menu Items formatés pour l'arborescence
  const menuItems = Questions.themes.map((theme) => ({
    key: theme.id,
    label: <span style={{ fontWeight: 'bold' }}>{theme.title}</span>,
    children: theme.sous_themes.map((subTheme) => ({
      key: `${theme.id}-${subTheme.id}`,
      label: subTheme.title,
    })),
  }));

  const [selectedSubTheme, setSelectedSubTheme] = React.useState(menuItems[0].children[0].key);
  const [openKeys, setOpenKeys] = React.useState([menuItems[0].key]);
  const [formValues, setFormValues] = React.useState({});

  // Gestion de l'ouverture exclusive du menu
  const handleMenuOpenChange = (keys) => {
    setOpenKeys(keys.length ? [keys.at(-1)] : []);
  };

  // Gestion du clic sur un sous-thème
  const handleMenuClick = (e) => {
    const currentValues = form.getFieldsValue();
    setFormValues((prev) => ({
      ...prev,
      [selectedSubTheme]: currentValues,
    }));
    setSelectedSubTheme(e.key);
    form.setFieldsValue(formValues[e.key] || {});
  };

  // Calcul du ratio de complétude
  const calculateCompletionRatios = (answers) => {
    const completionRatios = {};
  
    Questions.themes.forEach((theme) => {
      let totalThemeQuestions = 0;
      let answeredThemeQuestions = 0;
  
      // Initialiser la structure du thème
      completionRatios[theme.title] = {
        ratio: 0,
        subThemes: {},
      };
  
      theme.sous_themes.forEach((subTheme) => {
        let totalSubThemeQuestions = 0;
        let answeredSubThemeQuestions = 0;
  
        const subThemeKey = `${theme.id}-${subTheme.id}`;
        const subThemeAnswers = answers[subThemeKey] || {};
  
        subTheme.questions.forEach((_, idx) => {
          const questionKey = `q_${theme.id}_${subTheme.id}_${idx}`;
          totalSubThemeQuestions += 1;
  
          if (
            subThemeAnswers[questionKey] &&
            Array.isArray(subThemeAnswers[questionKey]) &&
            subThemeAnswers[questionKey].length > 0
          ) {
            answeredSubThemeQuestions += 1;
          }
        });
  
        // Calcul de la proportion du sous-thème
        const subThemeProportion = totalSubThemeQuestions > 0
          ? ((answeredSubThemeQuestions / totalSubThemeQuestions) * 100).toFixed(2)
          : 0;
  
        // Mise à jour des sous-thèmes
        completionRatios[theme.title].subThemes[subTheme.title] = {
          ratio: subThemeProportion
        };
  
        // Mise à jour des totaux du thème
        totalThemeQuestions += totalSubThemeQuestions;
        answeredThemeQuestions += answeredSubThemeQuestions;
      });
  
      // Calcul du ratio global du thème
      completionRatios[theme.title].ratio = totalThemeQuestions > 0
        ? ((answeredThemeQuestions / totalThemeQuestions) * 100).toFixed(2)
        : 0;
  
      // Calcul des ratios totaux des sous-thèmes
      const totalRatios = Object.values(completionRatios[theme.title].subThemes)
        .reduce((acc, curr) => acc + parseFloat(curr.ratio), 0);
  
      Object.keys(completionRatios[theme.title].subThemes).forEach((subTitle) => {
        const subData = completionRatios[theme.title].subThemes[subTitle];
        subData.ratio = totalRatios > 0
          ? ((subData.ratio / totalRatios) * 100).toFixed(2)
          : 0;
      });
    });
  
    return completionRatios;
  };
  
  
  // Gestion de la soumission
  const handleSubmit = (values) => {
    const allValues = { ...formValues, [selectedSubTheme]: values };
    console.log('All Values:', allValues);
    // Calcul des ratios
    const completionRatios = calculateCompletionRatios(allValues);

    console.log('User Answers:', allValues);
    console.log('Completion Ratios:', completionRatios);

    // Redirection avec les données
    Router.push(
      '/results?data=' + encodeURIComponent(JSON.stringify(completionRatios))
    );
  };

  React.useEffect(() => {
    form.setFieldsValue(formValues[selectedSubTheme] || {});
  }, [selectedSubTheme, form, formValues]);

  const renderQuestions = (themeId, subThemeId) => {
    const selectedTheme = Questions.themes.find((t) => t.id === themeId);
    const selectedSubTheme = selectedTheme?.sous_themes.find((st) => st.id === subThemeId);

    if (!selectedSubTheme) return null;

    return selectedSubTheme.questions.map((question, idx) => {
      const questionKey = `q_${themeId}_${subThemeId}_${idx}`;

      const checkboxOptions = question.options.map((option) => ({
        label: option,
        value: option,
      }));

      return (
        <React.Fragment key={questionKey}>
          <StyledFormItem
            label={`${idx + 1}. ${question.text}`}
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

  const currentThemeId = selectedSubTheme.split('-')[0];
  const currentSubThemeId = selectedSubTheme.split('-')[1];

  return (
    <PageLayout>
      <Header>
        <h1>VisionPro</h1>
        <img
          src="https://www.pole-emc2.fr/app/uploads/2019/09/emc2-logo.png"
          alt="logo"
          width="60px"
        />
      </Header>
      <Main>
        <FormTitle>Data Maturity Assessment</FormTitle>
        <FormContainer>
          <MenuContainer>
            <StyledMenu
              selectedKeys={[selectedSubTheme]}
              openKeys={openKeys}
              mode="inline"
              style={{ width: '100%', background: '#f0f2f5' }}
              items={menuItems}
              onClick={handleMenuClick}
              onOpenChange={handleMenuOpenChange}
            />
          </MenuContainer>
          <ScrollableForm>
            <Form
              form={form}
              name="basic"
              layout="vertical"
              onFinish={handleSubmit}
            >
              {renderQuestions(currentThemeId, currentSubThemeId)}
              {selectedSubTheme === menuItems.at(-1).children.at(-1).key && (
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

// === Styled Components ===

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
