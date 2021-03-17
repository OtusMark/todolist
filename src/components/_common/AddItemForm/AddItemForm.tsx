import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddBox} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";
import {TextFieldProps} from "@material-ui/core/TextField/TextField";
import styled from "styled-components";
import { TextFieldStyled } from "../TextFieldStyled";

// Component
export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {

    // Local state
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    // Local functions
    const addItemHandler = () => {
        const itemTitle = title.trim()
        if (itemTitle) {
            addItem(itemTitle);
            setTitle('')
        } else {
            setError("Title is required!")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItemHandler()
    }

    return (
        <ComponentWrapper>
            <TextFieldStyled
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
                variant={'outlined'}
                disabled={disabled}
                fullWidth
            />
            <IconButtonStyled onClick={addItemHandler} disabled={disabled}>
                <AddBox/>
            </IconButtonStyled>
        </ComponentWrapper>
    )
})

const ComponentWrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  width: 100%;
`

const IconButtonStyled = styled(IconButton)<any>`
  margin-left: 10px;
  color: ${({theme}) => theme.color.main};
`

// Types
export type AddItemFormPropsType = TextFieldProps & {
    addItem: (title: string) => void
    disabled?: boolean
}