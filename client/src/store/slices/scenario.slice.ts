import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Filters = {
  search?: string;
  status?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
  from?: string;
  to?: string;
};

const initialState: Filters = { page: 1, limit: 20 };

const slice = createSlice({
  name: 'scenario',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Partial<Filters>>) {
      Object.assign(state, action.payload);
    },
    resetFilters() { return { page: 1, limit: 20 }; }
  }
});

export const { setFilter, resetFilters } = slice.actions;
export default slice.reducer;

// EXPECTATION: Wire this slice to FiltersBar; sync to URL query params.

