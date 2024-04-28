import { createAsyncThunk } from "@reduxjs/toolkit";
import { makeApiRequest } from "./makeApiRequest";
import { CreateOneButtonAlert } from "../components/OneButtonAlert/OneButtonAlert";

export const fetchUsersService: any = createAsyncThunk(
    "user",
    async (
      payload: any,
      {rejectWithValue},
    ) => {
      try {
        
        const res = await makeApiRequest('GET', 'https://pastebin.com/raw/1BZ6xznU');

        // console.log({OO: res.users});
        
        return {
          data: res.users,
        };
      } catch (error) {      
        if (
          // @ts-ignore
          error?.response &&
          // @ts-ignore
          error?.response?.data?.message
        ) {
          //@ts-ignore
          CreateOneButtonAlert('Something went wrong', error?.response?.data?.message);
          return rejectWithValue(
            // @ts-ignore
            error?.response?.data?.message,
          );
        } else {
          // @ts-ignore
           CreateOneButtonAlert('Something went wrong', error?.message);
           //@ts-ignore
          return rejectWithValue(error?.message);
        }
      }
    },
  );