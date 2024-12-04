'use client'
import React from 'react';
import styled from 'styled-components';

const FormPage = () => {
    return (
        <div>
            <Header>
                <p>LogoApp</p>
                <img src="https://www.pole-emc2.fr/app/uploads/2019/09/emc2-logo.png" alt="logo" width="100px"/>
            </Header>
            <main>
                <h1>Form Page</h1>
            </main><footer>
                <p>Footer</p>
            </footer>
        </div >
    );
};


const Header = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #;
    color: #333;
`;


export default FormPage;

