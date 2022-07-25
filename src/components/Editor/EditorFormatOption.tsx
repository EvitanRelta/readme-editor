import { Box, IconButton, styled, Tooltip } from '@mui/material'
import { Editor as CoreEditor } from '@tiptap/core'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { FormatOption } from './EditorToolbar'

const StyledTooltipText = styled(Box)({
    textAlign: 'center',
})

const StyledTooltipHotkeyText = styled(Box)({
    fontStyle: 'italic',
    fontSize: 9,
})

const StyledIconButton = styled(IconButton)({
    transition: 'none',
    '&:hover': {
        borderRadius: 1,
    },
    marginTop: -1,
    borderRadius: 1,
})

interface Props {
    option: FormatOption
}

export const EditorFormatOption = ({ option }: Props) => {
    const editor = useAppSelector((state) => state.data.editor)
    const [isActive, setIsActive] = useState(false)
    const [bgColor, setBgColor] = useState<string | undefined>(undefined)
    const attributeName = typeof option === 'object' ? option.attributeName : ''

    //Changes icon color if it's active, unless its excluded from activation (non-toggle-able actions)
    useEffect(() => {
        isActive ? setBgColor('#3178d2') : setBgColor(undefined)
    }, [isActive])

    useEffect(() => {
        if (!editor) return

        const getAttributeActive = (editor: CoreEditor) => {
            return editor.isActive(attributeName)
        }

        editor.on('transaction', ({ editor }) => {
            setIsActive(getAttributeActive(editor))
        })
    }, [editor])

    if (typeof option !== 'object') {
        const FormatOptionComponent = option
        return <FormatOptionComponent editor={editor} />
    }
    const { name, toolbarFunction, icon: FormatOptionIcon } = option

    const tooltipTitle = (
        <StyledTooltipText>
            {name}
            <StyledTooltipHotkeyText
                sx={{ fontStyle: 'italic', fontSize: 9 }}
            ></StyledTooltipHotkeyText>
        </StyledTooltipText>
    )

    return (
        <Tooltip title={tooltipTitle} disableInteractive arrow>
            <StyledIconButton sx={{ color: bgColor }} onClick={toolbarFunction(editor)}>
                <FormatOptionIcon />
            </StyledIconButton>
        </Tooltip>
    )
}
