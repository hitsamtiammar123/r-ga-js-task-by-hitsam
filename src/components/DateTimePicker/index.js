import React from 'react';
import { TextField } from '@mui/material';
import { LocalizationProvider, DateTimePicker as DateTimePickerMui } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export default function DateTimePicker({
  value, onChange
}){
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePickerMui
        renderInput={(props) => <TextField style={{ backgroundColor: 'white' }} color="primary" {...props}/>}
        label="Date Time"
        value={value}
        onChange={typeof onChange === 'function' ? onChange : () => {} }
      />
    </LocalizationProvider>
  )
}
