'use client'
import RadarChart from "../components/pages/Radar";
import GaugeChart from "../components/pages/Gauge";
import styled from 'styled-components';
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const rawData = searchParams.get("data") || "{}";
  interface ThemeData {
    ratio: string;
    subThemes: {
      [key: string]: {
        relativeProportion: string;
      };
    };
  }
  
  const data: { [key: string]: ThemeData } = JSON.parse(decodeURIComponent(rawData));

  const radarLabels = Object.keys(data);
  const radarData = Object.values(data).map((theme) => parseFloat(theme.ratio));

  const gaugeCharts = Object.entries(data).map(([themeTitle, themeData]) => ({
    title: themeTitle,
    themeRatio: parseFloat(themeData.ratio),
    subThemes: Object.entries(themeData.subThemes).map(([subTitle, subData]) => ({
      title: subTitle,
      ratio: parseFloat(subData.relativeProportion),
    }))
  }));

  return (
    <PageLayout>
      <Header>
        <img src="/assets/logoApp.png" alt="logo" width="60px" />
        <img src="https://www.pole-emc2.fr/app/uploads/2019/09/emc2-logo.png" alt="logo" width="60px" />
      </Header>
      <Main>
        <FormTitle>Data Maturity Assessment Results</FormTitle>
        <ChartContainer>
          <div>
            <RadarChart RadarLabels={radarLabels} RadarData={radarData} />
          </div>
          <div>
            <DetailedCharts>
              {gaugeCharts.map(({ title, themeRatio, subThemes }, idx) => (
                <GaugeContainer key={idx}>
                  <GaugeChart 
                    title={title} 
                    themeRatio={themeRatio} 
                    subThemes={subThemes} 
                  />
                </GaugeContainer>
              ))}
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
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  min-height: 0;
  min-width: 0;
`;
