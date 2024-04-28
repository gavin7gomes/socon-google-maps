import { createSlice } from '@reduxjs/toolkit';
import { fetchUsersService } from '../services';

interface User {
  id: number;
  name: string;
  pfp: string;
  location: {
    latitude: number;
    longitude: number;
    city: string
  }
}

const initialState: { users: User[] } = {
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setUsers: (state, action) => {
    //   state.users = action.payload;
    // },
  },
  extraReducers: (builder: any) => {
    builder.addCase(
      fetchUsersService.pending,
      (state: any) => {
        state.loading = true;
        state.error = null;
      },
    );
    builder.addCase(
      fetchUsersService.fulfilled,
      (state: any, action: any) => {
        state.loading = false;
        state.success = true;
        state.users = action.payload;
      },
    );
    builder.addCase(
      fetchUsersService.rejected,
      (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
  },
});

export const { } = userSlice.actions;
export default userSlice.reducer;