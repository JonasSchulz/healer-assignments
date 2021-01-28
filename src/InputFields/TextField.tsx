import React, { useState } from "react";
import {TextField} from '@material-ui/core'

export const TextInput = () => {
    const [value, setValue] = useState<string>('')

    return (
        <TextField value={value} onChange={event => setValue(event.target.value)} label="Standard" />
    );
};