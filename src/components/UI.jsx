import React, { useEffect } from 'react'
import { useStore } from '../stores/global'
import { RgbColorPicker } from 'react-colorful'
import { HexColorPicker } from 'react-colorful'


const UI = () => {

    const color = useStore(state => state.color)
    const selectedMaterialKey = useStore(state => state.selectedMaterialKey)
    const setColor = useStore(state => state.setColor)

    return (
        <div style={{
            height: "100%",
            widows: "100%",
            display: "flex",
            gap: "1em",
            alignItems: "center",
            flexDirection: 'column'
        }}>
            <HexColorPicker style={{
                width: "300px",
                height: "100%",
                cursor: 'none'
            }} color={color} onChange={(color) => setColor(color)} />
            <div
                style={{
                    fontSize: "5rem",
                    fontFamily: 'satoshi'
                }}
            >{selectedMaterialKey ? selectedMaterialKey === "mesh" ? "body" : selectedMaterialKey : ""}</div>

        </div>
    )
}

export default UI