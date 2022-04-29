import React from 'react'
import {screen,render } from '@testing-library/react'

import App from '../App'

describe('App component',()=>{
    it('Сomponent should be rendered',()=>{
        render(<App/>)
        const text = screen.getByText(/app/i)
        expect(text).toBeInTheDocument()
    })
   
})