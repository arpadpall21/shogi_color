import { createSlice, configureStore } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'pieceMove',
    initialState: {
        currentActivePlayer: 1,
        moves: 1
    },
    reducers: { incrementMoves: state => {
        state.moves++
        state.currentActivePlayer = state.moves % 2 === 0 ? 2 : 1
    }}
})

export const { incrementMoves } = slice.actions
export const store = configureStore({ reducer: slice.reducer })
