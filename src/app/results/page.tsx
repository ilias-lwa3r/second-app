'use client'
import RadarChart from "../components/pages/Radar";
import GaugeChart from "../components/pages/Gauge";
import styled from 'styled-components';

export default function Home() {
    const myData = [50, 30, 50, 50, 0, 30];
  return (
    <PageLayout>
      <Header>
        <img src="/assets/logoApp.png" alt="logo" width="60px" />
        <img src="https://www.pole-emc2.fr/app/uploads/2019/09/emc2-logo.png" alt="logo" width="60px" />
      </Header>
      <Main>
        <FormTitle>
          Data Maturity Assessment for EDIH Customers
        </FormTitle>
        <ChartContainer>
          <div>
            <RadarChart RadarData = {myData} /> 
          </div>
          <div>
            <DetailedCharts>
              <GaugeContainer>
                <GaugeChart GaugeData = {[50,50]} /> 
              </GaugeContainer>
              <GaugeContainer>
                <GaugeChart GaugeData = {[30,70]} />
              </GaugeContainer>
              <GaugeContainer>
                <GaugeChart GaugeData = {[20,80]} /> 
              </GaugeContainer>
              <GaugeContainer>
                <GaugeChart GaugeData = {[70,30]} /> 
              </GaugeContainer>
              <GaugeContainer>
                <GaugeChart GaugeData = {[50,50]} /> 
              </GaugeContainer>
              <GaugeContainer>
                <GaugeChart GaugeData = {[40,60]} /> 
              </GaugeContainer>
            </DetailedCharts>
          </div>
        </ChartContainer>
        
        
        

    </Main>
    <Footer>
        <p>Vision App by Fez - Ilias - Chahim - Brenda</p>
    </Footer>

    </PageLayout>
  );
}

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

const GaugeContainer = styled.div`
    margin: 5px;
`;


const ChartContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 0;  
    min-width: 0;

`;


const DetailedCharts = styled.div`
    display: grid;
    grid-template-columns:  1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    min-height: 0;  
    min-width: 0;


    
`;