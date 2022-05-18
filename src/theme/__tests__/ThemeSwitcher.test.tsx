import React from 'react'
import {render, screen, fireEvent} from 'test-utils'
import { ThemeSwitcher } from '../ThemeSwitcher'

beforeEach(()=>{
    render(<ThemeSwitcher/>)
})

describe("ThemeSwitcherComponent",()=>{
    it('Component should be render',()=>{
        expect(screen.getByRole('button')).toBeInTheDocument()
    })
})